/**
 * 封装 x.request 包含错误处理，日志上报之类的功能
 * @param param0
 * @returns
 */
export declare function mRequest<T>({ url, method, params, body, }: {
    url: string;
    method: 'GET' | 'POST';
    params?: Record<string, any>;
    body: Record<string, any>;
}): Promise<T | null>;
/**
 * (lynx only)取出存在 Storage 的值， 如果出错返回null
 * @param key
 * @returns null 或者 setItem存的值
 */
export declare const getStorageItemWithAutoUnboxing: ({ key }: {
    key: string;
}) => Promise<any>;
/**
 * (lynx only)存到 Storage
 * @param key
 * @param value
 * @returns null 或者 setItem存的值
 */
export declare const setStorageItemWithAutoBoxing: ({ key, value }: {
    key: string;
    value: any;
}) => Promise<boolean>;
