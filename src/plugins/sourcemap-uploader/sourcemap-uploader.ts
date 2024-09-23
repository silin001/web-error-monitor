/*
 * @Date: 2024-09-16 09:40:12
 * @LastEditTime: 2024-09-23 14:48:19
 * @Description: SourceMap 源码文件上传、导出支持webpack、vite的产物
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/plugins/sourcemap-uploader/sourcemap-uploader.ts
 */
const fs = require("fs");
const path = require("path");
import { httpPost } from "../../http/index";
import { ApiResponse } from "../../type/index";

/* 处理vite打包后的源映射文件 */
export class SourceMapHandler {
  outputPath;
  jsmapsDir;
  packTools;
  constructor(packTools) {
    this.packTools = packTools;
    // 定义存储map文件的jsmapsDir路径
    this.jsmapsDir = path.resolve(process.cwd(), "dist-jsmaps");
    // 如果是vite工具打包则创建 dist-jsmaps文件夹
    if (this.packTools === "vite") {
      this.viteWayInit();
    }
  }
  // 初始化
  viteWayInit() {
    // 确定输出目录
    this.outputPath = path.resolve(process.cwd(), "dist/assets");
    this.createDir(this.jsmapsDir);
  }
  // 获取vite打包后dist下 assets下的 所有jsmap
  async getJsmaps(outputPath) {
    // 读取输出目录下的所有文件
    const assets = await fs.promises.readdir(outputPath);
    // 过滤 jsmap
    const jsmaps = assets.filter((i) => i.endsWith(".js.map"));
    return jsmaps;
  }

  // 移动 jsmap 文件到 dist-jsmaps 目录
  async moveJsMaps(jsmaps, outputPath, mapsDir) {
    // 要移动的所有文件list
    const movePromisesList = jsmaps.map(async (file) => {
      const oldPath = path.join(outputPath, file);
      const newPath = path.join(mapsDir, file);
      await moveFileIfExists(oldPath, newPath);
    });
    try {
      // 等待所有的移动操作完成
      await Promise.all(movePromisesList); // 等待所有文件移动完成
      console.log("All files moved successfully." + movePromisesList.length);
    } catch (error: any) {
      console.error(`Error moving some files: ${error.message}`);
    }
  }

  // 创建指定目录
  createDir(mapsDir) {
    try {
      // 删除之前到文件夹
      this.removeDir("dist-jsmaps");
      // 在创建新的
      fs.promises.mkdir(mapsDir, { recursive: true });
    } catch (error) {
      console.error(`Error creating maps directory: ${error}`);
    }
  }
  // 删除指定目录
  removeDir(dirname) {
    const dir = path.resolve(process.cwd(), dirname);
    // 使用 rmSync 删除目录
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/* nodeApi移动文件 */
async function moveFileIfExists(oldPath, newPath) {
  // 检查文件是否存在
  fs.access(oldPath, (err) => {
    if (err) {
      console.error(`access文件不存在: ${oldPath}`);
    }
    // 移动文件
    fs.rename(oldPath, newPath, (renameErr) => {
      if (renameErr) {
        console.error(
          `Error moving file from ${oldPath} to ${newPath}: ${renameErr.message}`
        );
      }
      // console.log(`Moved: ${oldPath} -> ${newPath}`);
    });
  });
}

/**
 * @description: source-map文件上传
 * @param {*} assets 产出 map文件
 * @param {*} outputPath 输出路径
 * @param {*} uploadURL 上传源码文件 api
 * @param {*} storageDir 上传源码文件到服务端指定目录
 * @return {*}
 */
export const sourceUpload = async (
  assets,
  outputPath,
  uploadURL,
  storageDir
) => {
  // 这里没有直接找到对应文件直接上传，而是把所有文件的fileName，fileContent
  // 以数组对象形式保存到数组中然后去上传数组，服务端接收到数组通过node写入文件内容
  const mapsArr = formatMapsList(assets, outputPath);
  const params = {
    mapsArr,
    storageDir,
  };
  try {
    // 调用上传源码接口
    const result = (await httpPost(uploadURL, params)) as ApiResponse;
    console.log("上传完成->", result);
    if (result.code === 200) {
      console.log(result.data.msg);
    }
  } catch (error) {
    console.error(`错误: ${error}`);
  }
};

/* 处理 webpack、vite 的jsmap文件，生成最后要上传的数组对象数据 */
export function formatMapsList(jsmapList, outputPath) {
  return jsmapList.map((fileName) => {
    const filePath = path.join(outputPath, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return {
      fileName,
      fileContent,
    };
  });
}
