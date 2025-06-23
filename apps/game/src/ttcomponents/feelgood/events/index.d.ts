/// <reference types="@byted-lynx/typings" />
import { QuestionListVal } from '@ad/feelgood-sdk';
export declare enum EnumFeelGoodDialogHook {
    Shown = "shown",
    Closed = "closed",
    Submitted = "submitted"
}
export declare enum EnumFeelGoodGlobalEvent {
    /** 弹窗关闭动画结束 */
    Dialog_Closed = "FG_Dialog_Closed",
    /** 命令弹窗关闭 */
    CMD_Dialog_Close = "FG_CMD_Dialog_Close",
    KeyboardShow = "FG_KeyboardShow",
    KeyboardHide = "FG_KeyboardHide",
    /** 命令弹窗展示 */
    CMD_Dialog_Show = "FG_CMD_Dialog_Show",
    /** 通知子组件校验题目 */
    CMD_Question_Validate = "FG_CMD_Question_Validate"
}
export declare enum EnumFormEvent {
    /** 单个题目作答情况变化 */
    Form_SingleQuestionValueChange = "ValueChange",
    ScrollToQuestion = "ScrollToQuestion"
}
export declare enum EnumLynxGlobalEvent {
    KeyboardStatusChanged = "keyboardstatuschanged",
    onWindowResize = "onWindowResize"
}
export declare type SingleQuestionValueChangePayload = QuestionListVal[string] & {
    id: string;
};
declare class LynxLikeEventbus implements Lynx.EventEmitter {
    events: {};
    addListener(event: string, listener: (...args: any[]) => void): void;
    trigger(event: string, ...args: any[]): void;
    removeListener(event: string, listener: (...args: any[]) => void): void;
    toggle(): void;
    removeAllListeners(evtName: string): void;
}
export declare const FeelGoodGlobalEventEmitter: LynxLikeEventbus;
export {};
