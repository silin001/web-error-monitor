import { ErrorReportType } from "../type/index";
export declare class ErrorReport {
    options: any;
    reportApi: any;
    vueExample: any;
    packingMethod: any;
    constructor(options: ErrorReportType);
    init(): void;
    /**
     * @description: 使用TraceKit工具对错误信息统一格式化后上报
     * @return {*}
     */
    formatErrorInfo(): void;
    /**
     * @description: 通过img方式进行错误信息上报
     * @param {*} datas
     * @return {*}
     */
    reportViaImg(datas: any): void;
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
/**
 * @description: 格式化错误信息
 * @param {*} type
 * @param {*} message
 * @param {*} stack
 * @return {*}
 */
export declare function formatErrorDatas(packingMethod: any, type: any, message: any, stack: any): {
    packingMethod: any;
    errorType: any;
    message: any;
    stack: any;
    date: string;
};
declare const _default: {
    ErrorReport: typeof ErrorReport;
};
export default _default;
