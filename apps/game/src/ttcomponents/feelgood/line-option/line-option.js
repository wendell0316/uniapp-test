function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isInLynxRuntime, isInLarkRuntime, isAndriod } from './../common/env';
import { EnumFormEvent } from './../events/index';
import { EnumFormItemType, EnumTheme } from '../node_m/feelgood.js';
import { EnumFeelGoodGlobalEvent, FeelGoodGlobalEventEmitter } from '../events/index';
import { EnumSelectBoxIcon, EnumSelectBoxShape } from '../selectbox/enum';
import { GlobalStore } from '../common/store';
import { themeData, determineThemeClass } from '../mixins/theme';
Component({
  properties: {
    questionId: {
      type: String,
      value: ''
    },
    selected: {
      type: Boolean,
      value: false
    },
    config: {
      type: Object,
      value: {}
    },
    boxStyle: {
      type: Object,
      value: {
        shape: EnumSelectBoxShape.Square,
        icon: EnumSelectBoxIcon.Tick
      }
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: _objectSpread(_objectSpread({
    extraShortAnswerConfig: {},
    padding: 0,
    isLarkAndroid: isInLarkRuntime && isAndriod,
    labels: GlobalStore.Labels
  }, themeData), {}, {
    useIndentExtra: true
  }),
  methods: {
    onTap() {
      this.triggerEvent('TapOption', this.properties.config);
    },

    onExtraChange(payload) {
      // @ts-ignore
      var shortVal = payload.detail || payload;
      this.triggerEvent('ExtraChange', {
        extra: shortVal.val,
        optionId: this.properties.config.id
      });
    },

    onBlur() {
      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.KeyboardHide);

      if (isInLynxRuntime && SystemInfo.platform === 'iOS') {
        // iOS Scroll view不能自动复原的bug
        this.triggerEvent(EnumFormEvent.ScrollToQuestion, {
          questionId: this.properties.config.id
        });
      }
    },

    onFocus(_ref) {
      var {
        detail: {
          height
        }
      } = _ref;
      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.KeyboardShow, {
        keyboardHeight: height
      });
      this.triggerEvent(EnumFormEvent.ScrollToQuestion, {
        questionId: this.properties.questionId
      });
    },

    determineThemeClass
  },

  attached() {
    this.determineThemeClass();

    if (this.data.theme === EnumTheme.TikTok) {
      this.setData({
        useIndentExtra: false
      });
    }
  },

  created() {
    var {
      id: optionId,
      key: optionKey,
      extra_required
    } = this.properties.config;
    this.setData({
      extraShortAnswerConfig: {
        type: EnumFormItemType.ShortAnswer,
        id: optionId || optionKey + 'short',
        required: extra_required ? 1 : 0,
        default_lines: 1,
        hide_title: true
      }
    });

    if (isInLynxRuntime) {
      this.setData({
        padding: 8
      });
    }
  }

});