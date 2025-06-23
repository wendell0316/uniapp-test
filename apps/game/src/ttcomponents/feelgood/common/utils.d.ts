import { EnumChannel } from '@ad/feelgood-sdk';
import { EnumFeelGoodDialogHook } from '../events/index';
/**
 * 生成 FeelGood lynx 弹窗
 * @param token FeelGood token
 * @returns dialog schema
 */
export declare const buildDialogSchema: (token: string, channel?: EnumChannel) => string;
/**
 * 生成平台级隔离的 FeelGood Storage Key
 * @param token FeelGood token
 * @returns storage key
 */
export declare const buildStorageKeyWithToken: (token: string) => string;
/**
 * 生成带FeelGood taskId的FeelGoodDialog Hooks 事件名, 用于在总线上区分是哪个弹窗的事件
 * @param evtName
 * @param taskId
 * @returns 带FeelGood taskId的FeelGoodDialog Hooks 事件名
 */
export declare const buildEventNameWithTaskId: (evtName: EnumFeelGoodDialogHook, taskId: string) => string;
