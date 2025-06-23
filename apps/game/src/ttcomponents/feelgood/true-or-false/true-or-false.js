function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isInLynxRuntime } from './../common/env';
import { EnumFormEvent } from './../events/index';
import { commonProperties } from '../question-template/commonProperties';
Component({
  data: {
    hasTrueSelected: false,
    hasFalseSelected: false,
    isLynxRuntime: false
  },
  properties: _objectSpread({
    config: {
      type: Object,
      value: {}
    }
  }, commonProperties),
  methods: {
    selectOption(isTrue) {
      var [trueOption, falseOption] = this.properties.config.options;
      var selectedOption = isTrue ? trueOption : falseOption;
      var {
        id,
        type
      } = this.properties.config;
      var {
        content
      } = selectedOption;
      this.triggerEvent(EnumFormEvent.Form_SingleQuestionValueChange, {
        id,
        type,
        val: {
          id: isTrue ? '1' : '0',
          content
        }
      });
    },

    onSelectTrue() {
      this.selectOption(true);
      this.setData({
        hasTrueSelected: true,
        hasFalseSelected: false
      });
    },

    onSelectFalse() {
      this.selectOption(false);
      this.setData({
        hasTrueSelected: false,
        hasFalseSelected: true
      });
    }

  },

  created() {
    if (isInLynxRuntime) {
      this.setData({
        isLynxRuntime: true
      });
    }
  }

});