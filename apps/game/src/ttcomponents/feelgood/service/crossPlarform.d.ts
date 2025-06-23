export declare enum EnumBridgeCode {
    Success = 1
}
interface CrossResponse {
    code: number;
    data: {
        httpCode: number;
        header: object;
        response: object;
    };
}
interface RequestOptions {
    url: string;
    method: string;
    body: object;
    params: object;
    header: {
        'Content-Type': string;
        [key: string]: string;
    };
}
/**
 * 封装 tt.request和 x.request 根据环境不同选择调用其中一个
 * @param options
 */
export declare function crossRquest({ url, method, body, params, header }: RequestOptions): Promise<CrossResponse>;
declare function crossPlatformShowToast({ message, type, duration }: {
    message: string;
    type: 'success' | 'error';
    duration: number;
}): void;
export { crossPlatformShowToast as showToast };
