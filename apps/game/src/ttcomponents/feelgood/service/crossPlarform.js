function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { isInLynxRuntime } from './../common/env';
import { request, showToast } from '../node_m/x.empty.js';
export var EnumBridgeCode;

(function (EnumBridgeCode) {
  EnumBridgeCode[EnumBridgeCode["Success"] = 1] = "Success";
})(EnumBridgeCode || (EnumBridgeCode = {}));

/**
 * 封装 tt.request和 x.request 根据环境不同选择调用其中一个
 * @param options
 */
export function crossRquest(_x) {
  return _crossRquest.apply(this, arguments);
}

function _crossRquest() {
  _crossRquest = _asyncToGenerator(function* (_ref) {
    var {
      url,
      method,
      body,
      params,
      header
    } = _ref;

    if (!isInLynxRuntime) {
      return new Promise((resolve, reject) => {
        tt.request({
          url,
          method,
          header,
          data: _objectSpread(_objectSpread({}, params), body),
          success: _ref3 => {
            var {
              statusCode,
              header,
              data
            } = _ref3;

            if (statusCode === 200) {
              resolve({
                code: EnumBridgeCode.Success,
                data: {
                  httpCode: statusCode,
                  header,
                  response: data
                }
              });
            } else {
              reject({
                statusCode,
                header
              });
            }
          },
          fail: _ref4 => {
            var {
              errMsg
            } = _ref4;
            reject(errMsg);
          }
        });
      });
    } else {
      return request({
        url,
        method,
        body,
        params,
        header
      });
    }
  });
  return _crossRquest.apply(this, arguments);
}

function crossPlatformShowToast(_ref2) {
  var {
    message,
    type,
    duration
  } = _ref2;

  if (!isInLynxRuntime) {
    tt.showToast({
      title: message,
      icon: type,
      duration
    });
  } else {
    showToast({
      message,
      type,
      duration
    });
  }
}

export { crossPlatformShowToast as showToast };