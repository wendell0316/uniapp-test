function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EnumFormItemType, EnumTheme } from '../node_m/feelgood.js';
import { GlobalStore } from '../common/store';
import { commonProperties } from './commonProperties';
import { themeData, determineThemeClass } from '../mixins/theme';
Component({
  data: _objectSpread({
    hideTitle: false
  }, themeData),
  properties: _objectSpread({
    config: {
      type: Object,
      value: {
        id: '',
        type: EnumFormItemType.Rating,
        title: '默认标题',
        required: false,
        hide_title: false
      }
    },
    errorHint: {
      type: String,
      value: ''
    },
    showErrorHint: {
      type: Boolean,
      value: false
    }
  }, commonProperties),
  methods: {
    determineHideTitle() {
      if (this.properties.config.hide_title) {
        this.setData({
          hideTitle: true
        });
      }

      if (GlobalStore.TaskConfig && GlobalStore.TaskConfig.common_config.theme === EnumTheme.People && this.properties.sequence === 1) {
        this.setData({
          hideTitle: true
        });
      }
    },

    determineThemeClass
  },

  attached() {
    this.determineHideTitle();
    this.determineThemeClass();
  }

});