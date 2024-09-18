export declare const isProduction: boolean;
/**
 * @description: 格式化错误信息
 * @param {*} type
 * @param {*} message
 * @param {*} stack
 * @return {*}
 */
export declare function formatErrorDatas(type: any, message: any, stack: any): {
    errorType: any;
    message: any;
    stack: any;
    date: string;
};
/**
 * @description: 通过img方式进行错误信息上报
 * @param {*} datas
 * @return {*}
 */
export declare function reportViaImg(datas: any): void;
export declare class ErrorReport {
    options: any;
    vueExample: any;
    constructor(options: any);
    init(): void;
    /**
     * @description: 使用TraceKit工具对错误信息统一格式化后上报
     * @return {*}
     */
    formatErrorInfo(): void;
    vueErrorHandler(): void;
    resourceStatus(imageUrl: any): Promise<{
        status: number;
        statusText: string;
    } | undefined>;
    resourceErrorHandler(): void;
    private createResourceErrorObject;
    jsError(): void;
    promiseError(): void;
}
declare const _default: {
    isProduction: boolean;
    ErrorReport: typeof ErrorReport;
};
export default _default;
