function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { EnumChannel } from '../node_m/feelgood.js';
import logger from '../common/logger';
import { GlobalStore } from '../common/store';
import Apis from './api';
import { mRequest } from './mRequest';

/**
 * 将request url 拼上根据channel选择的域名
 * @param path 不带域名的path 如 /athena/survey/platform/task/submit/
 * @returns 拼接了域名的完整请求路径
 */
var withBaseUrl = path => {
  if (GlobalStore.Channel === EnumChannel.SG) {
    return 'https://xx.com' + path;
  } else {
    return 'https://xxx' + path;
  }
};
/* 获取任务配置 */


export function fetchTaskConfig(_x) {
  return _fetchTaskConfig.apply(this, arguments);
}

function _fetchTaskConfig() {
  _fetchTaskConfig = _asyncToGenerator(function* (taskId) {
    if (!taskId) {
      logger.error('fetchTaskConfig with invalid taskId');
      return;
    }

    var res = yield mRequest({
      url: withBaseUrl(Apis.taskConfig),
      method: 'POST',
      params: {
        language: GlobalStore.EnvInfo.language
      },
      body: _objectSpread(_objectSpread({
        task_id: taskId
      }, GlobalStore.EnvInfo), {}, {
        user: _objectSpread({}, GlobalStore.UserInfo)
      })
    });

    if (!res) {
      logger.error('Failed to get task config', res || {});
      return;
    }

    if (res.survey_task) {
      res.survey_task.is_submitted = res.is_submitted || false;
      res.survey_task.can_submit = res.can_submit || false;
      GlobalStore.TaskConfig = res.survey_task;
    }

    return res.survey_task;
  });
  return _fetchTaskConfig.apply(this, arguments);
}

export function submitTask(_x2) {
  return _submitTask.apply(this, arguments);
}

function _submitTask() {
  _submitTask = _asyncToGenerator(function* (formData) {
    var res = yield mRequest({
      url: withBaseUrl(Apis.submitTask),
      body: _objectSpread(_objectSpread({}, formData), {}, {
        user: _objectSpread({}, GlobalStore.UserInfo)
      }, GlobalStore.EnvInfo),
      method: 'POST'
    });
    return res;
  });
  return _submitTask.apply(this, arguments);
}

export function submitDoNotShowAgain() {
  return _submitDoNotShowAgain.apply(this, arguments);
}
/**
 * 上报调研展示
 * @param type
 * @returns
 */

function _submitDoNotShowAgain() {
  _submitDoNotShowAgain = _asyncToGenerator(function* () {
    var res = yield mRequest({
      url: withBaseUrl(Apis.submitTask),
      method: 'POST',
      body: _objectSpread(_objectSpread(_objectSpread({
        user: _objectSpread({}, GlobalStore.UserInfo)
      }, GlobalStore.EnvInfo), GlobalStore.TaskConfig), {}, {
        do_not_show_again: true,
        shown_questions: [],
        time_cost: 0
      })
    });
    return res;
  });
  return _submitDoNotShowAgain.apply(this, arguments);
}

export function reportTaskShowOrClose(_x3, _x4) {
  return _reportTaskShowOrClose.apply(this, arguments);
}

function _reportTaskShowOrClose() {
  _reportTaskShowOrClose = _asyncToGenerator(function* (type, taskConfig) {
    var {
      task_id,
      task_version,
      report_id
    } = taskConfig;
    var res = yield mRequest({
      url: withBaseUrl(Apis.taskShow),
      method: 'POST',
      body: _objectSpread(_objectSpread({
        type,
        task_id,
        task_version,
        report_id,
        cnt: 1
      }, GlobalStore.EnvInfo), {}, {
        user: _objectSpread({}, GlobalStore.UserInfo)
      })
    });
    return res;
  });
  return _reportTaskShowOrClose.apply(this, arguments);
}

export function reportCustomEvent(_x5) {
  return _reportCustomEvent.apply(this, arguments);
}

function _reportCustomEvent() {
  _reportCustomEvent = _asyncToGenerator(function* (eventName) {
    var res = yield mRequest({
      url: withBaseUrl(Apis.reportBehavior),
      method: 'POST',
      body: _objectSpread(_objectSpread({}, GlobalStore.EnvInfo), {}, {
        user: _objectSpread({}, GlobalStore.UserInfo),
        events: [{
          cnt: 1,
          type: eventName,
          is_custom: 1
        }]
      })
    });

    if (res && Array.isArray(res.task_list) && res.task_list.length > 0 && res.task_settings) {
      var taskId = res.task_list[0];
      var taskSetting = res.task_settings[taskId];
      GlobalStore.TaskConfig = taskSetting.survey_task;
    }

    return res;
  });
  return _reportCustomEvent.apply(this, arguments);
}