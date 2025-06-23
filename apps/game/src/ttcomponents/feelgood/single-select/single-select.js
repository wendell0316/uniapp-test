function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EnumFormEvent } from './../events/index';
import { shufflePinalbleArray } from '../node_m/feelgood.js';
import { commonProperties } from '../question-template/commonProperties';
import { EnumSelectBoxIcon, EnumSelectBoxShape } from '../selectbox/enum';
Component({
  data: {
    options: [],
    boxStyle: {
      shape: EnumSelectBoxShape.Circle,
      icon: EnumSelectBoxIcon.Circle
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
          optionConfig,
          extra: ''
        }));
        this.setData({
          options
        }); // 预填逻辑

        var prefillOption = optionsConfig.filter(optionConfig => optionConfig.is_default_value)[0];

        if (prefillOption) {
          this.onSelectOption(prefillOption);
        }
      }
    }
  }, commonProperties),
  methods: {
    onSelectOption(evt) {
      // @ts-ignore
      var selectedOption = evt.detail || evt;
      var {
        options
      } = this.data;
      var {
        config: {
          id,
          type
        }
      } = this.properties;
      var newoptions = options.map(_ref => {
        var {
          optionConfig,
          extra
        } = _ref;

        if (optionConfig.id === selectedOption.id) {
          return {
            optionConfig,
            selected: true,
            extra
          };
        } else {
          return {
            optionConfig,
            selected: false,
            extra
          };
        }
      });
      this.setData({
        options: newoptions
      });
      var valToSubmit = {
        id: selectedOption.id,
        content: selectedOption.content
      };
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: valToSubmit
      });
    },

    onExtraChange(evt) {
      // @ts-ignore
      var {
        extra,
        optionId
      } = evt.detail || evt;
      var selectedOption = this.data.options.find(option => option.selected);
      if (!selectedOption) return;
      selectedOption.extra = extra;
      var {
        config: {
          id,
          type
        }
      } = this.properties;
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: {
          id: optionId,
          extra,
          content: selectedOption.optionConfig.content
        }
      });
    },

    onScrollToQuestion(evt) {
      var payload = evt.detail || evt;
      this.triggerEvent(EnumFormEvent.ScrollToQuestion, payload);
    }

  }
});