function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EnumFormEvent } from './../events/index';
import { commonProperties } from '../question-template/commonProperties';
import { themeData, determineThemeClass } from '../mixins/theme';
Component({
  data: _objectSpread({
    options: [],
    selectedOption: null
  }, themeData),
  properties: _objectSpread({
    config: {
      type: Object,
      value: {},
      observer: function observer(newVal, oldVal) {
        if (newVal.id === oldVal.id) return;
        var optionsConfig = newVal.options || [];
        var options = optionsConfig.map(optionConfig => ({
          selected: false,
          optionConfig
        }));
        this.setData({
          options
        });
      }
    }
  }, commonProperties),
  methods: {
    onSelectOption(evt) {
      // @ts-ignore
      var selectedOption = evt.detail || evt;
      this.setData({
        selectedOption
      });
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
          optionConfig
        } = _ref;

        if (optionConfig.id === selectedOption.id) {
          return {
            optionConfig,
            selected: true
          };
        } else {
          return {
            optionConfig,
            selected: false
          };
        }
      });
      this.setData({
        options: newoptions
      });
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: {
          rate: selectedOption.rate,
          content: selectedOption.content
        }
      });
    },

    determineThemeClass
  },

  attached() {
    this.determineThemeClass();
  }

});