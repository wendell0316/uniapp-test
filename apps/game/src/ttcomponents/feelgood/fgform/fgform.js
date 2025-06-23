function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isInLarkRuntime, isInLynxRuntime } from './../common/env';
import { calcUnfilledRequiredQuestions } from './util';
import { calcHiddenFormItems, EnumBlockButton, EnumFormItemType, EnumInputRule, EnumInputRuleRegex, EnumTheme, extractFormItemVal, flattenFormItemVal, flattenQuestions, transformQuestionRelations } from '../node_m/feelgood.js';
import { EnumFeelGoodGlobalEvent, FeelGoodGlobalEventEmitter, EnumFeelGoodDialogHook } from '../events/index';
import { GlobalStore } from './../common/store';
import { submitTask, submitDoNotShowAgain } from '../service/index';
import { buildEventNameWithTaskId } from '../common/utils';
import { publishEvent } from '../node_m/x.empty.js';
import { themeData, determineThemeClass } from '../mixins/theme';
import { EnumCloseWay } from '../common/enum';

var getSubmitBtnHeight = () => {
  var theme = GlobalStore.TaskConfig ? GlobalStore.TaskConfig.common_config.theme : EnumTheme.Aweme;

  switch (theme) {
    case EnumTheme.People:
      return 64;

    default:
      return 60;
  }
};

var getBlockBtnHeight = () => {
  var theme = GlobalStore.TaskConfig ? GlobalStore.TaskConfig.common_config.theme : EnumTheme.Aweme;

  switch (theme) {
    case EnumTheme.People:
      return 38;

    default:
      return 36;
  }
};

var isRadioQuestion = question => {
  return [EnumFormItemType.Scale, EnumFormItemType.TrueOrFalse, EnumFormItemType.Rating, EnumFormItemType.SingleSelect].includes(question.type);
};

var FormFooterPaddingBottom = 12;
Component({
  properties: {
    taskConfig: {
      type: Object,
      value: {
        common_config: {}
      },

      observer(taskConfig) {
        if (Object.keys(taskConfig).length > 0) {
          this.setData({
            questionRelations: transformQuestionRelations(taskConfig.question_relations, taskConfig.form_config.items)
          });
          this.onFormValueChange({});
          var {
            common_config
          } = taskConfig;
          var SubmitBtnHeight = getSubmitBtnHeight();
          var BlockBtnHeight = getBlockBtnHeight();
          var formFooterHeight = common_config && common_config.show_block_btn ? SubmitBtnHeight + BlockBtnHeight + FormFooterPaddingBottom : SubmitBtnHeight + FormFooterPaddingBottom;
          var {
            formMaxHeight
          } = this.properties;
          var scrollViewMaxHeight = formMaxHeight - formFooterHeight;
          this.setData({
            scrollViewMaxHeight
          });
        }
      }

    },
    formMaxHeight: {
      type: Number,
      value: 500,

      observer(formMaxHeight) {
        var {
          common_config
        } = this.properties.taskConfig;
        var SubmitBtnHeight = getSubmitBtnHeight();
        var BlockBtnHeight = getBlockBtnHeight();
        var formFooterHeight = common_config && common_config.show_block_btn ? SubmitBtnHeight + BlockBtnHeight + FormFooterPaddingBottom : SubmitBtnHeight + FormFooterPaddingBottom;
        var scrollViewMaxHeight = formMaxHeight - formFooterHeight;
        this.setData({
          scrollViewMaxHeight
        });
      }

    }
  },
  data: _objectSpread({
    scrollViewMaxHeight: 0,
    visibleQuestions: [],
    hiddenQuestionIds: [],
    isAllRequiredFilled: false,
    questionRelations: {},
    prefillData: {},
    questionIdHasPrefilled: {},
    focusedQuestionId: '',
    labels: GlobalStore.Labels,
    blockBtnLabel: GlobalStore.Labels.do_not_show_again,
    formShowAt: 0,
    onlyOneRadioQuestion: false,
    isSubmitLoading: false
  }, themeData),
  methods: {
    onClickSubmit() {
      var _this = this;

      return _asyncToGenerator(function* () {
        var {
          visibleQuestions,
          isAllRequiredFilled,
          taskConfig,
          formShowAt,
          isSubmitLoading
        } = _this.data;
        if (isSubmitLoading) return;
        var {
          FormValue: formValue
        } = GlobalStore;
        var shownQuestions = visibleQuestions.map(_ref => {
          var {
            id
          } = _ref;
          return id;
        });
        var {
          task_id,
          task_version
        } = taskConfig;

        if (isAllRequiredFilled) {
          var failedQuestions = _this.validateQuestionAnswers();

          if (failedQuestions.length > 0) {
            _this.onScrollIntoView({
              questionId: failedQuestions[0]
            });

            return;
          }

          _this.setData({
            isSubmitLoading: true
          });

          var isSuccess = yield submitTask({
            task_id,
            data: formValue,
            shown_questions: shownQuestions,
            task_version,
            time_cost: Math.ceil((Date.now() - formShowAt) / 1000),
            url: '',
            report_id: '',
            do_not_show_again: false,
            language: GlobalStore.EnvInfo.language
          });

          _this.setData({
            isSubmitLoading: false
          });

          if (isSuccess) {
            if (isInLynxRuntime) {
              var {
                taskConfig: _taskConfig
              } = _this.properties;
              var eventName = buildEventNameWithTaskId(EnumFeelGoodDialogHook.Submitted, _taskConfig && _taskConfig.task_id || '');
              publishEvent({
                eventName,
                timestamp: Date.now(),
                params: {}
              });
            }

            _this.triggerEvent('submitted');
          }
        }
      })();
    },

    onTapDoNotShowAgain() {
      return _asyncToGenerator(function* () {
        yield submitDoNotShowAgain();
        FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Dialog_Close, {
          tap: EnumCloseWay.Block
        });
      })();
    },

    onFormValueChange(payload) {
      //@ts-ignore
      var {
        id,
        type,
        val
      } = payload.detail || payload;
      var {
        taskConfig,
        questionRelations,
        prefillData,
        questionIdHasPrefilled
      } = this.data;
      var {
        FormValue: formValue
      } = GlobalStore;
      var newSingleQuesVal = id ? {
        [id]: {
          type,
          val
        }
      } : {};

      var newFormValue = _objectSpread(_objectSpread({}, formValue), newSingleQuesVal);

      var allQuestions = flattenQuestions(taskConfig.form_config.items);
      var hiddenQuestionIds = calcHiddenQuestions({
        allQuestions,
        taskConfig: taskConfig,
        questionRelations,
        formValue: newFormValue,
        questionIdHasPrefilled,
        prefillData
      });
      this.setData({
        hiddenQuestionIds
      });
      hiddenQuestionIds.forEach(qid => {
        delete newFormValue[qid];
        questionIdHasPrefilled[qid] = false;
      });
      var visibleQuestions = allQuestions.filter(item => !hiddenQuestionIds.includes(item.id.toString()));
      var unfilledRequiredQuesionIds = calcUnfilledRequiredQuestions({
        formValue: newFormValue,
        visibleQuestions
      });
      this.setData({
        isAllRequiredFilled: unfilledRequiredQuesionIds.length === 0
      });
      var onlyOneRadioQuestion = visibleQuestions.length === 1 && isRadioQuestion(visibleQuestions[0]);
      this.setData({
        visibleQuestions,
        onlyOneRadioQuestion
      });
      GlobalStore.FormValue = newFormValue;

      if (isRadioQuestion(visibleQuestions[0]) && visibleQuestions.length === 1) {
        this.onClickSubmit();
      }
    },

    onScrollIntoView(evt) {
      // @ts-ignore
      var {
        questionId
      } = evt.detail || evt;

      if (isInLynxRuntime) {
        var textAreaRef = this.getNodeRef("#q".concat(questionId));
        textAreaRef.scrollIntoView(true);
      } else {
        // lark runtime 不做弹窗被键盘顶起逻辑，不做滚动逻辑
        if (isInLarkRuntime) return;
        this.setData({
          focusedQuestionId: ""
        });
        this.setData({
          focusedQuestionId: "q".concat(questionId)
        });
      }
    },

    doNothing() {},

    determineThemeClass,

    /**
     * 校验已经展现的题目
     * @returns 返回所有校验失败的题目id
     */
    validateQuestionAnswers() {
      FeelGoodGlobalEventEmitter.trigger(EnumFeelGoodGlobalEvent.CMD_Question_Validate);
      var {
        visibleQuestions
      } = this.data;
      var {
        FormValue: formValue
      } = GlobalStore;
      var validateFailQuestions = visibleQuestions.filter(question => {
        var {
          id,
          required,
          type
        } = question;
        var {
          val
        } = formValue[id] || {};

        if (required && !val) {
          return true;
        }

        if (type === EnumFormItemType.ShortAnswer && val) {
          var {
            input_rule
          } = question;

          if (input_rule === EnumInputRule.Email && !EnumInputRuleRegex.Email.test(val)) {
            return true;
          } else if (input_rule === EnumInputRule.Phone && !EnumInputRuleRegex.Phone.test(val)) {
            return true;
          }
        }

        return false;
      }).map(_ref2 => {
        var {
          id
        } = _ref2;
        return id;
      });
      return validateFailQuestions;
    }

  },

  attached() {
    this.setData({
      formShowAt: Date.now()
    });
    this.setData({
      labels: GlobalStore.Labels
    });
    var {
      block_btn_type
    } = this.properties.taskConfig.common_config || {};
    var blockBtnLabel = GlobalStore.Labels.do_not_show_again;

    if (block_btn_type === EnumBlockButton.Customize) {
      blockBtnLabel = GlobalStore.Labels.block_btn_text;
    } else if (block_btn_type === EnumBlockButton.DoNotShowAgain) {
      blockBtnLabel = GlobalStore.Labels.do_not_show_again;
    } else if (block_btn_type === EnumBlockButton.IDontKnow) {
      blockBtnLabel = GlobalStore.Labels.i_dont_know;
    }

    this.setData({
      blockBtnLabel
    });
    this.determineThemeClass();
  },

  created() {
    GlobalStore.FormValue = {};
  }

});
/**
 * 从作答情况计算计算隐藏题目
 * @param taskConfig
 * @param questionRelations
 * @param formValue 题目作答情况
 * @param questionIdHasPrefilled
 * @param prefillData
 * @returns
 */

function calcHiddenQuestions(_ref3) {
  var {
    allQuestions,
    taskConfig,
    questionRelations,
    formValue,
    questionIdHasPrefilled,
    prefillData
  } = _ref3;
  var questionAnswerMap = flattenFormItemVal(extractFormItemVal(formValue, taskConfig.form_config.items));
  var hiddenQuestionIds = calcHiddenFormItems(questionRelations, questionAnswerMap, allQuestions.map(item => item.id), (qid, hide, currentAnswer) => {
    if (hide) return; // 计算逻辑关系后新出现的问题

    var questionValModel = formValue[qid];

    if (questionValModel && !questionIdHasPrefilled[qid] && prefillData[qid]) {
      // 预填后的结果
      var newAnswer = _objectSpread(_objectSpread({}, questionValModel), {}, {
        val: JSON.parse(JSON.stringify(prefillData[qid].val))
      }); // 预填的答案要干预后续题目的逻辑联动计算


      currentAnswer[qid] = flattenFormItemVal({
        [qid]: newAnswer
      })[qid]; // 预填的答案要回显在UI上

      formValue[qid] = newAnswer;
      questionIdHasPrefilled[qid] = true;
    }
  });
  return hiddenQuestionIds;
}