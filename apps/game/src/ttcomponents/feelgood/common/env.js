import { EnumPlatFormInMiniApp, EnumPlatFormInLynx } from './enum';
export var isInLynxRuntime = typeof lynx !== 'undefined';
export var isInLarkRuntime = (() => {
  if (isInLynxRuntime) return false;
  var {
    appName
  } = tt.getSystemInfoSync();
  return appName === 'Feishu';
})();
export var isAndriod = (() => {
  if (isInLynxRuntime) {
    return SystemInfo.platform === EnumPlatFormInLynx.Android;
  } else {
    var {
      platform
    } = tt.getSystemInfoSync();
    return platform === EnumPlatFormInMiniApp.Android;
  }
})();