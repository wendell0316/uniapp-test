function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EnumFormEvent } from './../events/index';
import { EnumExclusiveType, shufflePinalbleArray } from '../node_m/feelgood.js';
import { commonProperties } from '../question-template/commonProperties';
import { EnumSelectBoxIcon, EnumSelectBoxShape } from '../selectbox/enum';
Component({
  data: {
    options: [],
    boxStyle: {
      shape: EnumSelectBoxShape.Square,
      icon: EnumSelectBoxIcon.Tick
    }
  },
  properties: _objectSpread({
    config: {
      type: Object,
      value: {},
      observer: function observer(newVal, oldVal) {
        if (newVal.id === oldVal.id) return;
        var optionsConfig = newVal.options || []; // shuffle

        var shuffleOptions = newVal.random ? shufflePinalbleArray(optionsConfig) : optionsConfig; // dbmodel to viewmodel

        var options = shuffleOptions.map(optionConfig => ({
          selected: false,
          disabled: false,
          extra: '',
          optionConfig
        }));
        this.setData({
          options
        }); // 预填逻辑

        var prefillOption = optionsConfig.filter(optionConfig => optionConfig.is_default_value)[0];

        if (prefillOption) {
          this.onToggleOption(prefillOption);
        }
      }
    }
  }, commonProperties),
  methods: {
    onToggleOption(evt) {
      // @ts-ignore
      var toggleOption = evt.detail || evt;
      var {
        options
      } = this.data;
      var originOption = options.find(_ref => {
        var {
          optionConfig
        } = _ref;
        return optionConfig.id === toggleOption.id;
      });

      if (!originOption) {
        return;
      }

      var {
        disabled
      } = originOption;

      if (disabled) {
        return;
      }

      var isExclusive = (optionKey, selectingOption) => {
        if (!optionKey) return false;
        var {
          exclusive_with_keys = [],
          exclusive = EnumExclusiveType.None
        } = selectingOption;

        switch (exclusive) {
          case EnumExclusiveType.All:
            return true;

          case EnumExclusiveType.Selected:
            return exclusive_with_keys.includes(optionKey);

          case EnumExclusiveType.None:
          default:
            return false;
        }
      }; // 互斥逻辑


      var optionsAfterExclusive = options.map(_ref2 => {
        var {
          optionConfig,
          disabled,
          extra,
          selected
        } = _ref2;
        var {
          key
        } = optionConfig;

        if (optionConfig.id === toggleOption.id) {
          return {
            optionConfig,
            disabled,
            selected: !selected,
            extra
          };
        } else {
          return {
            optionConfig,
            selected: isExclusive(key, toggleOption) ? false : selected,
            disabled,
            extra
          };
        }
      });
      var selectedCount = optionsAfterExclusive.reduce((sum, _ref3) => {
        var {
          selected
        } = _ref3;

        if (selected) {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0);
      var overLimit = false;
      var {
        config: {
          id,
          type,
          max_select_limit
        }
      } = this.properties;

      if (typeof max_select_limit === 'number' && max_select_limit > 0) {
        overLimit = selectedCount === max_select_limit;
      }

      var limitedOptions = optionsAfterExclusive.map(_ref4 => {
        var {
          optionConfig,
          extra,
          selected
        } = _ref4;

        if (!selected && overLimit) {
          return {
            optionConfig,
            disabled: true,
            selected,
            extra
          };
        } else {
          return {
            optionConfig,
            selected,
            disabled: false,
            extra
          };
        }
      });
      this.setData({
        options: limitedOptions
      });
      var selectedOptions = limitedOptions.filter(tag => tag.selected).map(_ref5 => {
        var {
          optionConfig,
          extra
        } = _ref5;
        return {
          id: optionConfig.id,
          content: optionConfig.content,
          extra
        };
      });
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: selectedOptions
      });
    },

    onExtraChange(evt) {
      //@ts-ignore
      var {
        extra,
        optionId
      } = evt.detail || evt;
      var {
        options
      } = this.data;
      var targetOption = options.find(_ref6 => {
        var {
          optionConfig
        } = _ref6;
        return optionConfig.id === optionId;
      });

      if (targetOption) {
        targetOption.extra = extra;
      }

      var valToSubmit = options.filter(tag => tag.selected).map(_ref7 => {
        var {
          optionConfig,
          extra
        } = _ref7;
        return {
          id: optionConfig.id,
          content: optionConfig.content,
          extra
        };
      });
      var {
        config: {
          id,
          type
        }
      } = this.properties;
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: valToSubmit
      });
    },

    onScrollToQuestion(evt) {
      var payload = evt.detail || evt;
      this.triggerEvent(EnumFormEvent.ScrollToQuestion, payload);
    }

  }
});