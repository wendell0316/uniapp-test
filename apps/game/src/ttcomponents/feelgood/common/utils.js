import { EnumChannel } from '../node_m/feelgood.js';

/**
 * 生成 FeelGood lynx 弹窗
 * @param token FeelGood token
 * @returns dialog schema
 */
export var buildDialogSchema = function buildDialogSchema(token) {
  var channel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EnumChannel.CN;

  if (channel === EnumChannel.CN) {
    return "aweme://lynxview_popup/?channel=feelgood_ad_survey&bundle=pages/dialog-task-card/template.js&use_bdx=1&dynamic=1&hide_nav_bar=1&allowClosed=0&mask_color=00000000&show_loading=1&show_error=1&FG_token=".concat(token);
  } else {
    return "aweme://lynxview_popup/?channel=feelgood_lynx&bundle=pages/dialog-task-card/template.js&use_bdx=1&dynamic=1&hide_nav_bar=1&allowClosed=0&mask_color=00000000&show_loading=1&show_error=1&FG_token=".concat(token);
  }
};
/**
 * 生成平台级隔离的 FeelGood Storage Key
 * @param token FeelGood token
 * @returns storage key
 */

export var buildStorageKeyWithToken = token => {
  return "FG_".concat(token, "_store");
};
/**
 * 生成带FeelGood taskId的FeelGoodDialog Hooks 事件名, 用于在总线上区分是哪个弹窗的事件
 * @param evtName
 * @param taskId
 * @returns 带FeelGood taskId的FeelGoodDialog Hooks 事件名
 */

export var buildEventNameWithTaskId = (evtName, taskId) => {
  return "FG_Event_".concat(evtName, "_Task_").concat(taskId);
};