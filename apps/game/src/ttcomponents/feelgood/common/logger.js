/**
 * 日志模块，给调试、排查问题提供更多信息
 */
export var EnumLoggerLevel;

(function (EnumLoggerLevel) {
  EnumLoggerLevel["None"] = "";
  EnumLoggerLevel["Default"] = "default";
  EnumLoggerLevel["Debug"] = "debug";
})(EnumLoggerLevel || (EnumLoggerLevel = {}));

var EnumLoggerType;

(function (EnumLoggerType) {
  EnumLoggerType["ERROR"] = "error";
  EnumLoggerType["WARN"] = "warn";
  EnumLoggerType["INFO"] = "info";
  EnumLoggerType["DEBUG"] = "debug";
})(EnumLoggerType || (EnumLoggerType = {}));

var logStyleMapping = {
  [EnumLoggerType.ERROR]: 'color: red',
  [EnumLoggerType.WARN]: 'color: orange',
  DEFAULT: ''
}; // TODO: 默认值改回 None

var level = EnumLoggerLevel.Debug; // 报错信息函数

var logger = function logger() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'info';
  return function (msg) {
    var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ([EnumLoggerLevel.Default, EnumLoggerLevel.Debug].indexOf(level) === -1) {
      return;
    }

    var method = type; // 控制是否打印debug日志

    if (type === EnumLoggerType.DEBUG) {
      if (level !== EnumLoggerLevel.Debug) {
        return;
      } // 修正method, 否则打印不出debug日志


      method = EnumLoggerType.INFO;
    }

    console[method]("%c[".concat(type, "]").concat(msg), logStyleMapping[type] || logStyleMapping.DEFAULT, payload);
  };
};

export default {
  enable: level => {
    level = level || '';
  },
  error: logger(EnumLoggerType.ERROR),
  warn: logger(EnumLoggerType.WARN),
  info: logger(EnumLoggerType.INFO),
  debug: logger(EnumLoggerType.DEBUG)
};