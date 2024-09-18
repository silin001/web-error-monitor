declare const test = "=======>  typescript  plugin-zip-pack...";
declare const deepClone: (obj: Object) => object;

declare const isProduction: boolean;
/**
 * @description: 格式化错误信息
 * @param {*} type
 * @param {*} message
 * @param {*} stack
 * @return {*}
 */
declare function formatErrorDatas(type: any, message: any, stack: any): {
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
declare function reportViaImg(datas: any): void;
declare class ErrorReport {
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

export { ErrorReport, deepClone, formatErrorDatas, isProduction, reportViaImg, test };
