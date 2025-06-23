#!/bin/bash

# exit immediately if pipeline/list/(compound command) returns non-zero status
# reference https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin
set -e

mkdir output

pnpm i

# scm 注入的环境变量
echo "CUSTOM_CHANNEL: ${CUSTOM_CHANNEL}"
echo "CUSTOM_APPID: ${CUSTOM_APPID}"
echo "CUSTOM_SECRET: ${CUSTOM_SECRET}"
echo "CUSTOM_IS_PREVIEW: ${CUSTOM_IS_PREVIEW}"


# npm install tt-ide-cli -g
pnpm tma set-app-config "${CUSTOM_APPID}" --token "${CUSTOM_SECRET}"
pnpm build:game

# 构建产物路径
app_path="./apps/game/dist/build/mp-toutiao"
# 纯数字构建版本号，以 . split 1.0.0.10，取最后一个
version=`expr "$BUILD_VERSION" | cut -d "." -f 4`
# 上传版本号，显示在小程序开放平台
upload_version="4.0.${version}"
# 构建描述，显示在小程序开放平台
description="[$BUILD_TYPE 包] (by ${BUILD_USER}) [Bits触发] [${BUILD_REPO_BRANCH}分支] [SCM版本：${BUILD_VERSION}] [构建日期：${BUILD_PUB_DATE}]"
# 二维码输出路径
output_dir="output/qrcode.${BUILD_VERSION}.png"
# 读取环境变量 channel id，默认为 4
channel="${CUSTOM_CHANNEL:-4}"
# 读取环境变量 is_preview，默认为 true
is_preview="${CUSTOM_IS_PREVIEW:-1}"

# 移动assets目录下的图片文件到output目录
if [ -d "${app_path}/assets" ]; then
    mv "${app_path}/assets" output/
fi

if [ "${is_preview}" = "1" ]; then # 判断 CUSTOM_IS_PREVIEW ，执行预览命令
    echo "CUSTOM_IS_PREVIEW is active"
    pnpm tma preview "${app_path}" --qrcode-output "${output_dir}"

elif [ "$BUILD_TYPE" = "online" ]; then # 判断 BUILD_TYPE ，仅在线上环境才审核
    echo "BUILD_TYPE is online"
    pnpm tma upload "${app_path}" -c "${description}" --qrcode-output "${output_dir}" -v "${upload_version}"
    audit_result=$(pnpm tma audit --host douyin,douyin_lite,huoshan --auto-publish false "${CUSTOM_APPID}" 2>&1)
    echo "audit result: ${audit_result}"
    # 检查 tma audit 命令是否成功执行
    if echo "$result" | grep -q "Error"; then
        echo "An error was detected in the audit output"
        exit 1
    fi

else # 默认情况，upload 生成二维码
    echo "BUILD_TYPE is not online and CUSTOM_IS_PREVIEW is not active"
    pnpm tma upload "${app_path}" -c "${description}" --channel "${channel}" --qrcode-output "${output_dir}" -v "${upload_version}"
fi

if [ ! -f "${output_dir}" ]; then
    echo "Error: File ${output_dir} does not exist."
    exit 1
fi