import { EnumFormItemType } from '../node_m/feelgood.js';
/** 计算显示的题目中未填答的必答题目 */

export var calcUnfilledRequiredQuestions = _ref => {
  var {
    formValue,
    visibleQuestions
  } = _ref;
  var requiredQuestion = visibleQuestions.filter(q => q.required);
  var unfilledQuestion = [];
  requiredQuestion.forEach(q => {
    var {
      id,
      type
    } = q;
    var signleQuestionVal = formValue[id];

    if (!signleQuestionVal) {
      unfilledQuestion.push(id);
      return;
    }

    var {
      val
    } = signleQuestionVal;

    if (!val) {
      unfilledQuestion.push(id);
      return;
    } else {
      if (type === EnumFormItemType.MultiSelect) {
        if (Array.isArray(val) && val.length < 1) {
          unfilledQuestion.push(id);
        }
      }
    }
  });
  return unfilledQuestion;
};