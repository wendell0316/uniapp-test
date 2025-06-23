function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var EnumFeelGoodDialogHook;

(function (EnumFeelGoodDialogHook) {
  EnumFeelGoodDialogHook["Shown"] = "shown";
  EnumFeelGoodDialogHook["Closed"] = "closed";
  EnumFeelGoodDialogHook["Submitted"] = "submitted";
})(EnumFeelGoodDialogHook || (EnumFeelGoodDialogHook = {}));

export var EnumFeelGoodGlobalEvent;

(function (EnumFeelGoodGlobalEvent) {
  EnumFeelGoodGlobalEvent["Dialog_Closed"] = "FG_Dialog_Closed";
  EnumFeelGoodGlobalEvent["CMD_Dialog_Close"] = "FG_CMD_Dialog_Close";
  EnumFeelGoodGlobalEvent["KeyboardShow"] = "FG_KeyboardShow";
  EnumFeelGoodGlobalEvent["KeyboardHide"] = "FG_KeyboardHide";
  EnumFeelGoodGlobalEvent["CMD_Dialog_Show"] = "FG_CMD_Dialog_Show";
  EnumFeelGoodGlobalEvent["CMD_Question_Validate"] = "FG_CMD_Question_Validate";
})(EnumFeelGoodGlobalEvent || (EnumFeelGoodGlobalEvent = {}));

export var EnumFormEvent;

(function (EnumFormEvent) {
  EnumFormEvent["Form_SingleQuestionValueChange"] = "ValueChange";
  EnumFormEvent["ScrollToQuestion"] = "ScrollToQuestion";
})(EnumFormEvent || (EnumFormEvent = {}));

export var EnumLynxGlobalEvent;

(function (EnumLynxGlobalEvent) {
  EnumLynxGlobalEvent["KeyboardStatusChanged"] = "keyboardstatuschanged";
  EnumLynxGlobalEvent["onWindowResize"] = "onWindowResize";
})(EnumLynxGlobalEvent || (EnumLynxGlobalEvent = {}));

class LynxLikeEventbus {
  constructor() {
    _defineProperty(this, "events", {});
  }

  addListener(event, listener) {
    var handlers = this.events[event];

    if (Array.isArray(handlers)) {
      handlers.push(listener);
    } else {
      this.events[event] = [listener];
    }
  }

  trigger(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var handlers = this.events[event];

    if (Array.isArray(handlers)) {
      handlers.forEach(listener => {
        listener(...args);
      });
    }
  }

  removeListener(event, listener) {
    var handlers = this.events[event];

    if (Array.isArray(handlers)) {
      this.events[event] = handlers.filter(handle => handle !== listener);
    }
  }

  toggle() {}

  removeAllListeners(evtName) {
    this.events[evtName] = null;
  }

}

export var FeelGoodGlobalEventEmitter = new LynxLikeEventbus();