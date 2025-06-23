function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { EnumCloseWay } from './../common/enum';
import { EnumFeelGoodDialogHook } from './../events/index';
import { buildStorageKeyWithToken, buildEventNameWithTaskId } from './../common/utils';
import { GlobalStore } from '../common/store';
import { EnumChannel } from '../node_m/feelgood.js';
import { fetchTaskConfig, reportCustomEvent } from '../service/index';
import { EnumFeelGoodGlobalEvent, FeelGoodGlobalEventEmitter } from '../events/index';
import { open, removeStorageItem, subscribeEvent, on as X_on, unsubscribeEvent, globalConfig } from '../node_m/x.empty.js';
import { isInLynxRuntime } from './../common/env';
import { buildDialogSchema } from '../common/utils';
import logger from '../common/logger';
import { setStorageItemWithAutoBoxing, getStorageItemWithAutoUnboxing } from '../service/mRequest';
/**
 * （lynx only）从storage中取值，判断有无打开的 Dialog
 * @param token FeelGood token
 * @returns boolean 表示有无打开的Dialog
 */

var isThereAnyDialogOpen = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (token) {
    var GlobalStoreInStorage = yield getStorageItemWithAutoUnboxing({
      key: buildStorageKeyWithToken(token)
    });

    if (GlobalStoreInStorage && GlobalStoreInStorage.TaskConfig) {
      return true;
    }

    return false;
  });

  return function isThereAnyDialogOpen(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var FeelGoodApi = {
  /**
   *
   * @param FeelGoodOption 包括 token, language, userInfo等
   */
  init(_ref2) {
    var {
      token,
      language,
      userInfo,
      channel = EnumChannel.CN
    } = _ref2;
    GlobalStore.EnvInfo.token = token;
    GlobalStore.EnvInfo.language = language;
    GlobalStore.UserInfo = _objectSpread(_objectSpread({}, GlobalStore.UserInfo), userInfo);
    GlobalStore.Channel = channel;

    if (isInLynxRuntime) {
      removeStorageItem({
        key: buildStorageKeyWithToken(token)
      });
    }
  },

  /**
   * 设置语言
   * @param language
   */
  setLanguage(language) {
    GlobalStore.EnvInfo.language = language;
  },

  /**
   * 主动设置用户标识，若包含user_name则会覆盖自动获取的 nickname
   * @param userInfo 用户标识
   */
  setUserInfo(userInfo) {
    GlobalStore.UserInfo = _objectSpread(_objectSpread({}, GlobalStore.UserInfo), userInfo);
  },

  /**
   * 触发某个事件，若频控通过，则展示与该事件关联的表单；若频控不通过，则不展示
   * @param eventName 在FeelGood平台配置的事件名
   */
  triggerEvent(eventName) {
    var _arguments = arguments;
    return _asyncToGenerator(function* () {
      var {
        page
      } = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {
        page: ''
      };

      if (isInLynxRuntime) {
        var anyOpenDialog = yield isThereAnyDialogOpen(GlobalStore.EnvInfo.token);

        if (anyOpenDialog) {
          return;
        }
      }

      var res = yield reportCustomEvent(eventName);

      if (!res || !Array.isArray(res.task_list) || res.task_list.length < 1) {
        return;
      }

      var [taskId] = res.task_list;
      var taskSetting = res.task_settings[taskId];

      if (taskSetting) {
        var {
          language_config,
          common_config: {
            label_setting
          }
        } = taskSetting.survey_task;
        GlobalStore.Labels = _objectSpread(_objectSpread({}, language_config), label_setting);
      }

      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Show, {
        taskConfig: taskSetting.survey_task,
        page
      });
      return taskSetting.survey_task;
    })();
  },

  /**
   * 展示某个调研，不受频控限制
   * @param taskId 调研任务Id
   */
  triggerTask(taskId) {
    var _arguments2 = arguments;
    return _asyncToGenerator(function* () {
      var {
        page
      } = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {
        page: ''
      };

      if (isInLynxRuntime) {
        var anyOpenDialog = yield isThereAnyDialogOpen(GlobalStore.EnvInfo.token);

        if (anyOpenDialog) {
          return;
        }
      }

      var taskConfig = yield fetchTaskConfig(taskId);

      if (taskConfig) {
        var {
          language_config,
          common_config: {
            label_setting
          }
        } = taskConfig;
        GlobalStore.Labels = _objectSpread(_objectSpread({}, language_config), label_setting);
      }

      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Show, {
        taskConfig,
        page
      });
      return taskConfig;
    })();
  },

  /**
   * 关闭所有调研弹窗
   */
  closeAllDialog() {
    FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, {
      tap: EnumCloseWay.None
    });
  },

  /**
   * 从 Storage 中恢复 GlobalStore
   * @param token
   * @returns 返回Promise\<boolean\> 表示有无获取成功
   */
  restoreFromStorage(token) {
    return _asyncToGenerator(function* () {
      var GlobalStoreInStorage = yield getStorageItemWithAutoUnboxing({
        key: buildStorageKeyWithToken(token)
      });

      if (!GlobalStoreInStorage) {
        return false;
      } else {
        var {
          EnvInfo,
          UserInfo,
          Labels,
          TaskConfig: _TaskConfig,
          Channel
        } = GlobalStoreInStorage;
        GlobalStore.EnvInfo = _objectSpread({}, EnvInfo);
        GlobalStore.Labels = _objectSpread({}, Labels);
        GlobalStore.UserInfo = _objectSpread({}, UserInfo);
        GlobalStore.Channel = Channel;

        if (_TaskConfig) {
          GlobalStore.TaskConfig = _objectSpread({}, _TaskConfig);
        }

        return true;
      }
    })();
  },

  /**
   * 打开FeelGood弹窗, 如果已经有弹窗，则不会打开新的弹窗
   * @param token FeelGood token
   * @param taskConfig 非必须，如果传了，就将打开这个Task
   * @param hooks
   */
  openDialogCard(_ref3) {
    return _asyncToGenerator(function* () {
      var {
        token,
        taskConfig,
        lynxCompInstance,
        hooks = {}
      } = _ref3;

      if (!token || !taskConfig) {
        return;
      }

      globalConfig({
        context: lynxCompInstance
      });
      var anyOpenDialog = yield isThereAnyDialogOpen(GlobalStore.EnvInfo.token);

      if (anyOpenDialog) {
        return;
      }

      Object.entries(hooks).map(_ref4 => {
        var [eventName, handler] = _ref4;

        if (![EnumFeelGoodDialogHook.Closed, EnumFeelGoodDialogHook.Shown, EnumFeelGoodDialogHook.Submitted].includes(eventName)) {
          return;
        }

        if (!(handler instanceof Function)) {
          return;
        }

        var dialogIsolatedEventName = buildEventNameWithTaskId(eventName, taskConfig.task_id);
        subscribeEvent({
          eventName: dialogIsolatedEventName,
          timestamp: Date.now()
        });
        X_on(dialogIsolatedEventName, /*#__PURE__*/_asyncToGenerator(function* () {
          unsubscribeEvent({
            eventName: dialogIsolatedEventName
          });
          handler();
        }));
      });

      if (taskConfig) {
        GlobalStore.TaskConfig = taskConfig;
      }

      yield setStorageItemWithAutoBoxing({
        key: buildStorageKeyWithToken(token),
        value: GlobalStore
      });
      var schema = buildDialogSchema(token, GlobalStore.Channel);

      try {
        yield open({
          schema,
          replace: false,
          useSysBrowser: false
        });
      } catch (error) {
        logger.error("open schema: ".concat(schema, " error"), error);
      }
    })();
  }

};

if (isInLynxRuntime) {} else {
  var {
    system,
    platform,
    version,
    appName,
    SDKVersion
  } = tt.getSystemInfoSync();
  GlobalStore.UserInfo = _objectSpread(_objectSpread({}, GlobalStore.UserInfo), {}, {
    os_name: platform,
    os_version: system,
    app_version: version,
    app_name: appName,
    sdk_version: SDKVersion
  });
}

export { EnumChannel as FeelGoodEnumChannel };