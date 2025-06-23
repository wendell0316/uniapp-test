import { GlobalStore } from '../common/store';
import { themeData, determineThemeClass } from '../mixins/theme';
import { EnumTheme, EnumInputRule, EnumInputRuleRegex } from '../node_m/feelgood.js';
import { commonProperties } from '../question-template/commonProperties';
import { isInLynxRuntime, isInLarkRuntime, isAndriod } from './../common/env';
import { EnumFeelGoodGlobalEvent, FeelGoodGlobalEventEmitter, EnumFormEvent } from './../events/index';

function ownKeys(object, enumerableOnly) {
  let keys = Object.keys(object); if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    } keys.push.apply(keys, symbols);
  } return keys;
}

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  } return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  } return obj;
}
Component({
  data: _objectSpread(_objectSpread({
    initInputHeight: 18,
    maxInputHeight: 54,
    isLarkAndroid: isInLarkRuntime && isAndriod,
  }, themeData), {}, {
    placeholderStyle: '',
    labels: GlobalStore.Labels,
    errorHint: '',
    showErrorHint: false,
    value: '',
    isInLynxRuntime,
    initValue: '',
  }),
  properties: _objectSpread({
    config: {
      type: Object,
      value: {},
      observer: function observer(newVal, oldVal) {
        if (newVal.id === oldVal.id) return;
        let {
          default_lines = 3,
        } = newVal;
        let isTikTok = GlobalStore.TaskConfig && GlobalStore.TaskConfig.common_config.theme === EnumTheme.TikTok;
        let InputLineHeight = isTikTok ? 18 : 21;
        let initInputHeight = default_lines * InputLineHeight; // tt皮肤有输入框自动增高的功能

        let maxInputHeight = isTikTok ? 3 * InputLineHeight : initInputHeight;
        this.setData({
          initInputHeight,
          maxInputHeight,
        });
        this.forceRerenderLynxTextArea();
      },
    },
  }, commonProperties),
  methods: {
    onInput(_ref) {
      let {
        detail: {
          value,
        },
      } = _ref;
      let {
        config: {
          id,
          type,
        },
      } = this.properties;
      this.setData({
        value,
      });
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: value,
      });
    },

    onFocus(_ref2) {
      let {
        detail: {
          value,
          height,
        },
      } = _ref2;
      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.KeyboardShow, {
        keyboardHeight: height,
      });
      this.triggerEvent(EnumFormEvent.ScrollToQuestion, {
        questionId: this.properties.config.id,
      });
    },

    onBlur() {
      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.KeyboardHide);
      this.triggerEvent('blur', this.properties.config.id);

      if (isInLynxRuntime && SystemInfo.platform === 'iOS') {
        // iOS Scroll view不能自动复原的bug
        this.triggerEvent(EnumFormEvent.ScrollToQuestion, {
          questionId: this.properties.config.id,
        });
      }

      this.validate();
    },

    validate() {
      let {
        value,
      } = this.data;
      let {
        input_rule,
        required,
      } = this.data.config;

      if (required && !value) {
        this.setData({
          showErrorHint: true,
          errorHint: GlobalStore.Labels.required_field_hint,
        });
        return;
      }

      if (value) {
        if (input_rule === EnumInputRule.Email && !EnumInputRuleRegex.Email.test(value)) {
          this.setData({
            showErrorHint: true,
            errorHint: GlobalStore.Labels.err_msg_email,
          });
          return;
        } else if (input_rule === EnumInputRule.Phone && !EnumInputRuleRegex.Phone.test(value)) {
          this.setData({
            showErrorHint: true,
            errorHint: GlobalStore.Labels.err_msg_phone,
          });
          return;
        }
      }

      this.setData({
        showErrorHint: false,
      });
    },

    determineThemeClass,

    setPlaceholderStyle() {
      let taskConfig = GlobalStore.TaskConfig;

      if (taskConfig) {
        let theme = taskConfig.common_config.theme;

        switch (theme) {
          case EnumTheme.People:
            this.setData({
              placeholderStyle: 'font-size: 16px; line-height: 22px; color: #8f959e',
            });
            break;

          default:
            this.setData({
              placeholderStyle: 'font-size: 15px; line-height: 18px; color: rgba(22, 24, 35, 0.34);',
            });
            break;
        }
      }
    },
    forceRerenderLynxTextArea() {
      this.setData({
        initValue: '  ',
      });
      setTimeout(() => {
        this.setData({
          initValue: '',
        });
      }, 50);
    },
  },

  created() {
    if (GlobalStore.TaskConfig) {
      if (GlobalStore.TaskConfig.common_config.theme === EnumTheme.TikTok) {
        this.setData({
          initInputHeight: 18,
          maxInputHeight: 3 * 18,
        });
        this.forceRerenderLynxTextArea();
      } else {
        this.setData({
          initInputHeight: 21,
          maxInputHeight: 3 * 21,
        });
        this.forceRerenderLynxTextArea();
      }
    }
  },

  attached() {
    this.setData({
      labels: GlobalStore.Labels,
    });
    this.determineThemeClass();
    this.setPlaceholderStyle();
    FeelGoodGlobalEventEmitter.addListener(EnumFeelGoodGlobalEvent.CMD_Question_Validate, this.validate);
  },

  detached() {
    FeelGoodGlobalEventEmitter.removeListener(EnumFeelGoodGlobalEvent.CMD_Question_Validate, this.validate);
  },

});
