import { QuestionListVal, FormItemConfig } from '@ad/feelgood-sdk';
/** 计算显示的题目中未填答的必答题目 */
export declare const calcUnfilledRequiredQuestions: ({ formValue, visibleQuestions, }: {
    formValue: QuestionListVal;
    visibleQuestions: FormItemConfig[];
}) => string[];
