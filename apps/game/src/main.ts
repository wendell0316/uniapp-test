import pinia from '@pkg/stores';
import { createSSRApp } from 'vue';
import { FeelGoodApi } from '@/ttcomponents/feelgood/index/index';
import App from './App.vue';

function initTools() {
  // 配置 FeelGoodApi
  FeelGoodApi.init({
    token: '13af201c2379142ad98f80b4ad9f249c51a4a038',
    language: 'zh_CN',
    userInfo: {},
  });
}

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}

initTools();
