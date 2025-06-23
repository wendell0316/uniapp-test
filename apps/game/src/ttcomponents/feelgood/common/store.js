import { EnumChannel, EnumClientEnv, EnumPlatformEnv, EnumSurveyType } from '../node_m/feelgood.js';
/**
 * 全局store
 */

export var GlobalStore = {
  UserInfo: {
    user_id: '',
    user_name: '',
    web_id: '',
    app_id: ''
  },
  EnvInfo: {
    token: '',
    survey_type: EnumSurveyType.Embedded,
    client_env: EnumClientEnv.NativeWebview,
    device: EnumPlatformEnv.Mobile,
    language: 'zh_CN',
    sdk_version: "@ad/feelgood-mini-sdk v0.0.10",
    url: ''
  },
  TaskConfig: {},
  Labels: {
    do_not_show_again: '不再显示',
    please_enter: '请输入',
    submit_success: '提交成功',
    submit_btn: '提交'
  },
  FormValue: {},
  Channel: EnumChannel.CN
};