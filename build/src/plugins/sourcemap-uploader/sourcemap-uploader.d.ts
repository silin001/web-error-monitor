export declare class SourceMapHandler {
    outputPath: any;
    jsmapsDir: any;
    packTools: any;
    constructor(packTools: any);
    viteWayInit(): void;
    getJsmaps(outputPath: any): Promise<any>;
    moveJsMaps(jsmaps: any, outputPath: any, mapsDir: any): Promise<void>;
    createDir(mapsDir: any): void;
    removeDir(dirname: any): void;
}
/**
 * @description: source-map文件上传
 * @param {*} assets 产出 map文件
 * @param {*} outputPath 输出路径
 * @return {*}
 */
export declare const sourceUpload: (assets: any, outputPath: any, uploadURL: any, storageDir: any) => Promise<void>;
export declare function formatMapsList(jsmapList: any, outputPath: any): any;
