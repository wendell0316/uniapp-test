/// <reference types="@byted-lynx/typings" />
import { EnumFeelGoodDialogHook } from './../events/index';
import { EnumChannel, TaskConfig, UserParams } from '@ad/feelgood-sdk';
export declare const FeelGoodApi: {
    /**
     *
     * @param FeelGoodOption 包括 token, language, userInfo等
     */
    init({ token, language, userInfo, channel, }: {
        token: string;
        language: string;
        userInfo: UserParams;
        channel?: EnumChannel | undefined;
    }): void;
    /**
     * 设置语言
     * @param language
     */
    setLanguage(language: any): void;
    /**
     * 主动设置用户标识，若包含user_name则会覆盖自动获取的 nickname
     * @param userInfo 用户标识
     */
    setUserInfo(userInfo: UserParams): void;
    /**
     * 触发某个事件，若频控通过，则展示与该事件关联的表单；若频控不通过，则不展示
     * @param eventName 在FeelGood平台配置的事件名
     */
    triggerEvent(eventName: string, { page }?: {
        page: string;
    }): Promise<TaskConfig | undefined>;
    /**
     * 展示某个调研，不受频控限制
     * @param taskId 调研任务Id
     */
    triggerTask(taskId: string, { page }?: {
        page: string;
    }): Promise<TaskConfig | undefined>;
    /**
     * 关闭所有调研弹窗
     */
    closeAllDialog(): void;
    /**
     * 从 Storage 中恢复 GlobalStore
     * @param token
     * @returns 返回Promise\<boolean\> 表示有无获取成功
     */
    restoreFromStorage(token: any): Promise<boolean>;
    /**
     * 打开FeelGood弹窗, 如果已经有弹窗，则不会打开新的弹窗
     * @param token FeelGood token
     * @param taskConfig 非必须，如果传了，就将打开这个Task
     * @param hooks
     */
    openDialogCard({ token, taskConfig, lynxCompInstance, hooks, }: {
        token: string;
        taskConfig: TaskConfig;
        lynxCompInstance?: LynxComponent.Instance<any, any, any, any> | LynxCard.Instance<any, any, any> | undefined;
        hooks?: {
            shown?: (() => void) | undefined;
            submitted?: (() => void) | undefined;
            closed?: (() => void) | undefined;
        } | undefined;
    }): Promise<void>;
};
export { EnumChannel as FeelGoodEnumChannel };
