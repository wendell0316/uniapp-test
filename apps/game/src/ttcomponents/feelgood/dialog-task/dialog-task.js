function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { EnumThankyouWay } from './../common/enum';
import { EnumFeelGoodGlobalEvent, FeelGoodGlobalEventEmitter } from '../events/index';
import { GlobalStore } from '../common/store';
Component({
  properties: {
    page: {
      type: String,
      value: ''
    },
    hasBottomTab: {
      type: Boolean,
      value: false
    },
    thankyouConfig: {
      type: Object,
      value: {
        way: EnumThankyouWay.Panel,
        duration: 1000
      }
    }
  },
  data: {
    /* 后端下发的任务配置 */
    taskConfig: null
  },

  ready() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var {} = _this;
      var FlgdGlobalEventEmitter = FeelGoodGlobalEventEmitter;
      FlgdGlobalEventEmitter.addListener(EnumFeelGoodGlobalEvent.CMD_Dialog_Show, _ref => {
        var {
          taskConfig,
          page = ''
        } = _ref;

        if (page === _this.properties.page) {
          _this.setData({
            taskConfig
          });
        }
      });
    })();
  },

  methods: {
    onDialogClosed(evt) {
      // @ts-ignore
      var closeWayPayload = evt.detail || evt;
      this.triggerEvent('closed', _objectSpread(_objectSpread({}, closeWayPayload), {}, {
        formValue: GlobalStore.FormValue
      }));
      this.setData({
        taskConfig: null
      });
    }

  }
});