/**
 * 日志模块，给调试、排查问题提供更多信息
 */
export declare enum EnumLoggerLevel {
    None = "",
    /** 面向SDK接入方, 只输出异常情况的报警 */
    Default = "default",
    /** 面向SDK开发者, 可以输出任何方便Debug的信息  */
    Debug = "debug"
}
declare const _default: {
    enable: (level: string) => void;
    error: (msg: string, payload?: object) => void;
    warn: (msg: string, payload?: object) => void;
    info: (msg: string, payload?: object) => void;
    debug: (msg: string, payload?: object) => void;
};
export default _default;
