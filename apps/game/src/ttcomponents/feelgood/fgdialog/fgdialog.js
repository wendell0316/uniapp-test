function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EnumCloseWay, EnumThankyouWay } from './../common/enum';
import { isInLynxRuntime, isInLarkRuntime, isAndriod } from './../common/env';
import { EnumFeelGoodDialogHook, EnumFeelGoodGlobalEvent, EnumLynxGlobalEvent } from '../events/index';
import { EnumTaskReportEvent, EnumTheme, EnumAfterSubmitType } from '../node_m/feelgood.js';

/* babel-plugin-inline-import '../icon/x.png' */
var IconXAweme = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGkSURBVHgBvdg9UsJAFAfwt7xKiDPCDEip0FhyBG8idpSUdo6llbWVcAO9gVfwAOlRiligYxffhsQBzCb78V7+M5l87cdvWGB3FoAyGI5u+6fjZHuMHqChlPWr9IVSar5bMAVYrFfxNQhmMBw/0Wm6/zS9U1qnFJwcVpBElWOyTj9bpkqKKvS3FZvB5MHouHtE3V9COWrSjnpn35vkBRrA0Kg84tcmee1EvXO6n4Agqg5DWa7f4xnqK0I9S6JsMB+rOHuPxRMplAtmDySBcsX8A3GifDClIA6UL8YICkGFYCpBPqhQTN5mfaijBZ2uTO/1NJM3NIUAjDXIBlUTK4wOgmXqho8D4wTyRDlhnEGOKGeMTgv8kloUqC1TFudPyOKnncV37nMC2WJCUNYgV4wvygpk8w9MxxswrBJqQbbTAdcqATkwxQ0HCrkwXCjkxHCgkBsTikIJTAgKpTC+KJTE+KAw3/2YgRDGBdWJusq4+8GJ2U3lyrNq90MCo5O3uTS9N+1+iGCKmIbvb/ej3el16f6Cjh/6Pt0TZg7C0ajDfmn34+YX2F9mFuKIPPEAAAAASUVORK5CYII=";

/* babel-plugin-inline-import '../icon/x.people.png' */
var IconXPeople = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALnSURBVHgB7dq9btNQFMDxc+1EArGYDakD7hsEEBJISBXkASgbWwOiqIIBU2CO2xUC6UCL1AaVJwBGhhKxwICU9g2SpVI3IhGGtokv91ShipCbHNv3XIN0/6M/4v7i+uvGADabzWaz2WyGEtQFgyDwevvueynAdw6dW+vrz3cgp4IghN5BrypBPhIgVzZWXy5R13UpCx1hDwpN9fVcUd+QB668fal07VOr9XUPDDfEhgAyVH/LabXPZi5evgqt79++UNZ3KAv93HfragOlkUmeLEbN+flnJTDYCLY6Mlm5RfX+wydzlM8ggQWI8zGTjaJPwB43AFokcF/270gpOzGzjKAnYdX05cbr2jsgRD5pVRYC3xVOUwjhx8zuikPnOseJjIBdUietEIiRwZhptG4slgiMmUJzYLHEYIwbzYXFUoExLjQnFksNxnSjubFYJjCmC20Ci2UGY1nRprCYFjCWFm0Si2kDY0nRprGYVjBGReeBxbSDMQpaFuWsaSzGAsYmoMfEh8XYwFhyNC8WYwVjdDQ/FmMHY4guOM622pwXu4AUrzbWXiyCgUgDAFkrOIW5E7GYkBUcRAjDELhjB9978LSKA24TFjurRk4+7+7+ugDMsf1LT77OxvZDXbJuTE2d2eHa2yx7eBJWAtTVGFk7Ztbxnv5vwJQ7qMZq7fFARuUx6C0utFZwkttF/5zXzgOt7RhOc2+MmM5ed1pdp7fUdXo6ZiU8psvqmN7WBdcCzvIgYBqdGazjqcckOhNY5yOeKXRqMMfzrAl0KjDnwzs3OjHYxEgFJzoR2OSwDBc6wSsP5segONAkcF4DbphuNOnWEl8gyQOLIYJ4G0r6UZ56Lz0bP9nMsAwB7cni4Cbls0jgKIpW4OipbjQz2D+NQ0uQnX4U6X3l4e7CYsVxxNvhJpZNYkf765j2FbY9iKLy5pt6h7J+ilce3FJjrfYBcmyI9h1wZqJT0cfNer0LNpvNZrPZbP9avwHg8sHOUJewowAAAABJRU5ErkJggg==";
import { FeelGoodGlobalEventEmitter } from '../events/index';
import { reportTaskShowOrClose } from '../service/index';
import { buildEventNameWithTaskId } from '../common/utils';
import { publishEvent } from '../node_m/x.empty.js';
import { showToast } from '../service/crossPlarform';
import { GlobalStore } from '../common/store';
import { themeData, determineThemeClass } from '../mixins/theme';
/**
 * 附在dialog下面的白色尾巴，用于解决弹窗弹起动画和键盘弹起动画不一致的间隙问题
 */

var TailHeight = 300;
Component({
  properties: {
    taskConfig: {
      type: Object,
      value: {}
    },
    hasBottomTab: {
      type: Boolean,
      value: false
    },
    thankyouConfig: {
      type: Object,
      value: {
        way: EnumThankyouWay.Panel,
        duration: 1000
      }
    }
  },
  data: _objectSpread(_objectSpread({
    /**
     * 全屏卡片高度，只会在初始化时设置一次
     */
    fullViewportHeight: 700,
    bottom: -TailHeight,
    maxHeight: 0,
    IconX: IconXAweme,
    showDialog: true,
    slide: 'slidein',
    TailHeight,
    safeAreaInsetBottom: 0,
    showThankyouPanel: false,
    useFixedHeader: false,
    fixedTitle: ' '
  }, themeData), {}, {
    headerHeight: 0
  }),

  created() {
    if (isInLynxRuntime) {
      this.GlobalEventEmitter.addListener(EnumLynxGlobalEvent.KeyboardStatusChanged, this.onKeyBoardShowOrHide);
      this.GlobalEventEmitter.addListener(EnumLynxGlobalEvent.onWindowResize, this.onWindowResize);
    }

    FeelGoodGlobalEventEmitter.addListener(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, this.closeDialog);
    FeelGoodGlobalEventEmitter.addListener(EnumFeelGoodGlobalEvent.KeyboardShow, this.riseDialog);
    FeelGoodGlobalEventEmitter.addListener(EnumFeelGoodGlobalEvent.KeyboardHide, this.dropDialog);
  },

  detached() {
    if (isInLynxRuntime) {
      this.GlobalEventEmitter.removeListener(EnumLynxGlobalEvent.KeyboardStatusChanged, this.onKeyBoardShowOrHide);
      this.GlobalEventEmitter.removeListener(EnumLynxGlobalEvent.onWindowResize, this.onWindowResize);
    }

    FeelGoodGlobalEventEmitter.removeListener(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, this.closeDialog);
    FeelGoodGlobalEventEmitter.removeListener(EnumFeelGoodGlobalEvent.KeyboardShow, this.riseDialog);
    FeelGoodGlobalEventEmitter.removeListener(EnumFeelGoodGlobalEvent.KeyboardHide, this.dropDialog);
  },

  attached() {
    this.onDialogShow();
    var compIns = this;

    if (isInLynxRuntime) {
      // 因为 fixed = parent 为 root 的 absolute， 所以要在根元素上找
      if (!this.getNodeRefFromRoot) {
        return;
      }

      var {
        pixelRatio,
        pixelHeight
      } = SystemInfo;
      var fullViewportHeight = pixelHeight / pixelRatio;
      compIns.setData({
        fullViewportHeight
      });
      compIns.setData({
        maxHeight: fullViewportHeight * 0.73 + TailHeight
      });
    } else {
      var {
        screenHeight,
        windowHeight,
        safeArea
      } = tt.getSystemInfoSync();

      if (isInLarkRuntime && isAndriod) {
        // lark 安卓 safeArea有bug
        compIns.setData({
          safeAreaInsetBottom: 0
        });
      } else {
        compIns.setData({
          safeAreaInsetBottom: screenHeight - safeArea.bottom
        });
      }

      compIns.setData({
        fullViewportHeight: windowHeight
      });
      compIns.setData({
        maxHeight: windowHeight * 0.73 + TailHeight
      });
    }

    var {
      common_config: {
        theme
      } = {}
    } = this.properties.taskConfig;

    switch (theme) {
      case EnumTheme.People:
        this.useFisrtTitleAsFixedHeader();
        this.setData({
          IconX: IconXPeople
        });
        break;

      default:
        break;
    }

    this.determineThemeClass();
  },

  methods: {
    /**
     * iOS 键盘弹起时容器不会被键盘顶起，仍是全屏容器；通过 dialog 修改 bottom 提升一个键盘的高度
     */
    onKeyBoardShowOrHide(e, oldKeyboardHeight, realkeyboardHeight) {
      var {
        fullViewportHeight
      } = this.data;
      var keyboardHeight = realkeyboardHeight || oldKeyboardHeight;

      if (e === 'on') {
        this.setData({
          bottom: keyboardHeight - TailHeight
        });
        this.setData({
          maxHeight: fullViewportHeight - keyboardHeight + TailHeight - 44
        });
      } else {
        this.setData({
          bottom: -TailHeight
        });
        this.setData({
          maxHeight: fullViewportHeight * 0.73 + TailHeight
        });
      }
    },

    /**
     * 小程序环境使用
     */
    riseDialog(_ref) {
      var {
        keyboardHeight
      } = _ref;
      return;
      if (!keyboardHeight) return;
      if (isAndriod && isInLarkRuntime) return;
      var {
        fullViewportHeight,
        safeAreaInsetBottom,
        hasBottomTab
      } = this.data;
      var bottom = -TailHeight + keyboardHeight;
      var maxHeight = fullViewportHeight - keyboardHeight + TailHeight - 44;

      if (hasBottomTab) {
        var bottomTabHeight = 50;
        bottom -= bottomTabHeight + safeAreaInsetBottom;
        maxHeight += bottomTabHeight + safeAreaInsetBottom;
      }

      this.setData({
        bottom
      });
      this.setData({
        maxHeight
      });
    },

    /**
     * 小程序环境使用
     */
    dropDialog() {
      return;
      if (isAndriod && isInLarkRuntime) return;
      var {
        fullViewportHeight
      } = this.data;
      this.setData({
        bottom: -TailHeight
      });
      this.setData({
        maxHeight: fullViewportHeight * 0.73 + TailHeight
      });
    },

    /**
     * 安卓键盘弹起容器会被键盘顶起, 不用改 dialog 的 bottom 属性
     *  */
    onWindowResize(width, viewportHeight) {
      if (SystemInfo.platform === 'iOS') return;
      var {
        fullViewportHeight
      } = this.data;

      if (viewportHeight < 0.8 * fullViewportHeight) {
        this.setData({
          maxHeight: viewportHeight + TailHeight - 44
        });
      } else {
        this.setData({
          maxHeight: viewportHeight * 0.73 + TailHeight
        });
      }
    },

    closeDialog(tap) {
      var {
        taskConfig
      } = this.properties;
      reportTaskShowOrClose('survey_close_manual_cnt', taskConfig);
      this.setData({
        slide: 'slideout'
      });
      setTimeout(() => {
        this.setData({
          showDialog: false
        });
        this.triggerEvent('closed', {
          tap
        });

        if (isInLynxRuntime) {
          var {
            taskConfig: _taskConfig
          } = this.properties;
          var eventName = buildEventNameWithTaskId(EnumFeelGoodDialogHook.Closed, _taskConfig && _taskConfig.task_id || '');
          publishEvent({
            eventName,
            timestamp: Date.now(),
            params: {}
          });
        }
      }, 300);
    },

    onTapMask(event) {
      if (event.target.id !== 'FullScreenDialog') return;
      this.closeDialog(EnumCloseWay.Mask);
    },

    onTapX() {
      this.closeDialog(EnumCloseWay.X);
    },

    openDialog() {
      this.setData({
        showDialog: true,
        slide: 'slidein'
      });
    },

    onDialogShow() {
      var {
        taskConfig
      } = this.properties;
      reportTaskShowOrClose(EnumTaskReportEvent.TaskShow, taskConfig);

      if (isInLynxRuntime) {
        var shownEventName = buildEventNameWithTaskId(EnumFeelGoodDialogHook.Shown, taskConfig && taskConfig.task_id || '');
        publishEvent({
          eventName: shownEventName,
          timestamp: Date.now(),
          params: {}
        });
      }
    },

    doNothing() {},

    onSubmitted() {
      var {
        way,
        duration
      } = this.properties.thankyouConfig;
      var {
        common_config: {
          after_submit: {
            type
          }
        }
      } = this.properties.taskConfig;

      if (type === EnumAfterSubmitType.None) {
        FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, {
          tap: EnumCloseWay.Submit
        });
        return;
      }

      if (way === EnumThankyouWay.Panel) {
        this.setData({
          showThankyouPanel: true
        });
        setTimeout(() => {
          FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, {
            tap: EnumCloseWay.Submit
          });
        }, duration);
      } else {
        // @ts-ignore
        showToast({
          message: GlobalStore.Labels.thankyou,
          type: 'success',
          duration: 1000
        });
        FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, {
          tap: EnumCloseWay.Submit
        });
      }
    },

    useFisrtTitleAsFixedHeader() {
      var {
        form_config
      } = this.properties.taskConfig;

      if (form_config) {
        var {
          items: [first]
        } = form_config;
        var firstQuestion = first;
        var firstQuestionTitle = firstQuestion.title;
        this.setData({
          useFixedHeader: true,
          fixedTitle: firstQuestionTitle
        });
        setTimeout(() => {
          this.getHeaderHeight();
        }, 50);
      }
    },

    getHeaderHeight() {
      var compIns = this;

      if (isInLynxRuntime) {
        return;
        var fixedHeaderRef = this.getNodeRef('#fixedHeader');
        return;
        fixedHeaderRef.invoke({
          method: 'boundingClientRect',
          success: function success(res) {
            var {
              height
            } = res;
            compIns.setData({
              headerHeight: height
            });
          },
          fail: function fail(res) {
            compIns.setData({
              headerHeight: 48
            });
          }
        });
      } else {
        var query = tt.createSelectorQuery().in(this);
        var nodeRef = query.select('#fixedHeader');
        nodeRef && nodeRef.boundingClientRect(res => {
          var {
            height
          } = res;
          compIns.setData({
            headerHeight: height
          });
        }).exec();
      }
    },

    determineThemeClass
  }
});