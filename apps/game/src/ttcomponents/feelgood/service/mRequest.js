function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getStorageItem, setStorageItem } from '../node_m/x.empty.js';
import logger from '../common/logger';
import { crossRquest, EnumBridgeCode } from './crossPlarform';
/* 后端接口返回的状态码枚举 */

var EnumApiCode;
/**
 * 封装 x.request 包含错误处理，日志上报之类的功能
 * @param param0
 * @returns
 */

(function (EnumApiCode) {
  EnumApiCode[EnumApiCode["Success"] = 0] = "Success";
})(EnumApiCode || (EnumApiCode = {}));

export function mRequest(_x) {
  return _mRequest.apply(this, arguments);
}
/**
 * (lynx only)取出存在 Storage 的值， 如果出错返回null
 * @param key
 * @returns null 或者 setItem存的值
 */

function _mRequest() {
  _mRequest = _asyncToGenerator(function* (_ref) {
    var {
      url,
      method,
      params = {},
      body = {}
    } = _ref;

    if (!url || typeof url !== 'string') {
      logger.error("Invalid url: ".concat(url));
      return null;
    }

    var res = yield crossRquest({
      url,
      method,
      header: {
        'Content-Type': 'application/json',
        'x-feelgood-api-version': 'v2'
      },
      params: _objectSpread({}, params),
      body: _objectSpread({}, body)
    });
    var {
      code: bridgeCode,
      data: bridgeData = {
        response: {}
      }
    } = res;

    if (bridgeCode === EnumBridgeCode.Success) {
      var {
        response: {
          code,
          data,
          msg
        }
      } = bridgeData;

      if (code === EnumApiCode.Success) {
        return data;
      } else {
        logger.error('buzi request code error', {
          code,
          data,
          msg
        });
        return null;
      }
    } else {
      logger.error('x.request code error', res);
      return null;
    }
  });
  return _mRequest.apply(this, arguments);
}

export var getStorageItemWithAutoUnboxing = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      key
    } = _ref2;
    var res = yield getStorageItem({
      key
    });
    var {
      code,
      data = {
        data: null
      }
    } = res;

    if (code === EnumBridgeCode.Success) {
      return data.data;
    } else {
      logger.error('x.getStorageItem code error', res);
      return null;
    }
  });

  return function getStorageItemWithAutoUnboxing(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * (lynx only)存到 Storage
 * @param key
 * @param value
 * @returns null 或者 setItem存的值
 */

export var setStorageItemWithAutoBoxing = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (_ref4) {
    var {
      key,
      value
    } = _ref4;
    var res = yield setStorageItem({
      key,
      data: value
    });
    var {
      code
    } = res;

    if (code === EnumBridgeCode.Success) {
      return true;
    } else {
      logger.error('x.setStorageItem code error', res);
      return false;
    }
  });

  return function setStorageItemWithAutoBoxing(_x3) {
    return _ref5.apply(this, arguments);
  };
}();