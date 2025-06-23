import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import Components from '@uni-helper/vite-plugin-uni-components';
import viewport from 'postcss-px-to-viewport-8-plugin';
import { defineConfig, loadEnv } from 'vite';
import { configureAssetsCdnPlugin } from '../../plugins/assets';

function toKebabCase(componentName: string): string {
  // 使用正则表达式匹配组件名中的大写字母
  return componentName.replace(/([A-Z])/g, (match, p1) => {
    // 将匹配到的大写字母替换为小写字母，并在前面添加连字符 `-`
    return `-${p1.toLowerCase()}`;
  // 如果组件名的第一个字母是大写字母，则将其转换为小写字母
  }).replace(/^-/, '');
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const skipSourceMap = process.env.BUILD_TYPE === 'offline'
  && process.env.CUSTOM_SKIP_OFFLINE_SOURCE_MAP;

  return {
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': resolve(__dirname, 'src'),
        '@legacy': resolve(__dirname, '../../packages/legacy-pages/src'),
      },
      dedupe: [
        '@byted-star/axios-extensions',
        '@byted-star/shared-utils',
        '@slardar/minisdk',
        '@dp/tea-sdk-common',
        'axios',
        'vue',
      ],
    },
    css: {
      postcss: {
        plugins: [
          /**
             * 将 px 单位转换为视图单位(vw, vh, vmin, vmax)的 PostCSS 插件
             * @see https://github.com/lkxian888/postcss-px-to-viewport-8-plugin#readme
             */
          viewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: file => {
              const baseWidth = 375;
              let num = baseWidth;
              if (file.includes('legacy-pages')) {
                num = baseWidth * 2;
              }
              return num;
            },
            unitPrecision: 6, // 转换后的精度，即小数点位数
            selectorBlackList: ['uni-'], // 指定不转换为视窗单位的类名
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          }),
        ],
      },
    },
    plugins: [
      Components({
        resolvers: [
          {
            type: 'component',
            resolve: (name) => {
              const iconMatch = name.match(/^XtIcon([A-Za-z]*)/);
              const componentMatch = name.match(/^Xt([A-Za-z]*)/);
              if (iconMatch) {
                const componentName = iconMatch[1];
                return {
                  name,
                  from: `@pkg/icon/src/${toKebabCase(componentName)}/index.vue`,
                };
              }
              if (componentMatch) {
                const componentName = componentMatch[1];
                return {
                  name,
                  from: `@pkg/ui/src/${toKebabCase(componentName)}/index.vue`,
                };
              }
            },
          },
        ],
      }),
      uni(),
      configureAssetsCdnPlugin(env.VITE_PUBLIC_PATH),
    ],
    build: {
      sourcemap: !skipSourceMap,
      watch: process.env.NODE_ENV === 'production' ? undefined : {
        // 监听 packages 目录下的文件更改
        chokidar: {
          followSymlinks: false,
          ignored: ['!**/node_modules/@pkg/**'],
        },
      },
    },
  };
});
