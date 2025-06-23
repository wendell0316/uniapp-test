function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* babel-plugin-inline-import '../icon/tick.aweme.png' */
var IconTick = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEnSURBVHgB3ZjtDYIwEIbfERzBERzBEdxANtAN6AayAWygGzACIzACI5xXPhJMVHql5apP0j+Ee3nScL2kQIIQ0Z5Xzaujgbt9hhRhscNMdE6XnPS4sy19pkYqOMj2u4wUcJTtgTYSWeYBTYSyuk3nIXuAFv8sS9qyO16NQDZbCrNT5ogIhJa90Os4bHmdEYjQstmXwhwBEMpe14atkub6ktwxLoEueEkHlx1DuxjSUWTHYCMIdpLm926CTAMJNHRwK/hAuZCXC7IMfKBh+kg6uVSTnX1MelaWtkZFdoV0M9bkgpoCoeHQSiDgespYKsRCKK0rG0G6wlaQ7Jx+R4OtWSHdNyU08JDWk/WQ1pedcJBuKcE7MPMzshMsdqLhStRih0exxW/wBLWcxkFu2iFCAAAAAElFTkSuQmCC";
import { EnumSelectBoxIcon, EnumSelectBoxShape } from './enum';
import { themeData, determineThemeClass } from '../mixins/theme';
Component({
  properties: {
    selected: {
      type: Boolean,
      value: false
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
  data: _objectSpread({
    icon: IconTick
  }, themeData),
  methods: {
    determineThemeClass
  },

  attached() {
    this.determineThemeClass();
  }

});