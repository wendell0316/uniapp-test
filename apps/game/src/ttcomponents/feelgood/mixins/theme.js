/**
 * @fileoverview 一个mixin，用于根据问卷主题，确定 theme Class 并用在template中
 */
import { EnumTheme } from '../node_m/feelgood.js';
import { GlobalStore } from '../common/store';
export var themeData = {
  theme: EnumTheme.Aweme,
  themeClass: ''
};
export var determineThemeClass = function determineThemeClass() {
  var taskConfig = GlobalStore.TaskConfig;

  if (taskConfig) {
    var theme = taskConfig.common_config.theme; // @ts-ignore

    this.setData({
      theme
    });
    var themeClass = '';

    switch (theme) {
      case EnumTheme.People:
        themeClass = 'theme-people';
        break;

      case EnumTheme.TikTok:
        themeClass = 'theme-tiktok';

      default:
        break;
    } // @ts-ignore


    this.setData({
      themeClass
    });
  }
};