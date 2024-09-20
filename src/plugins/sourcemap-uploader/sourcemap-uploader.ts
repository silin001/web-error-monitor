/*
 * @Date: 2024-09-16 09:40:12
 * @LastEditTime: 2024-09-20 10:20:51
 * @Description: SourceMap 源码文件上传、导出支持webpack、vite的产物
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/plugins/sourcemap-uploader/sourcemap-uploader.ts
 */
const fs = require("fs");
const path = require("path");
import { httpPost } from "../../http/index";
import { ApiResponse } from "../../type/index";

//

/* 处理vite打包后的源映射文件 */
export class SourceMapHandler {
  outputPath;
  jsmapsDir;
  constructor() {
    this.init();
  }
  // 初始化
  init() {
    // 确定输出目录
    this.outputPath = path.resolve(process.cwd(), "dist/assets");
    // 创建存储map文件的jsmapsDir
    this.jsmapsDir = path.resolve(process.cwd(), "dist-jsmaps");
    this.createDir(this.jsmapsDir);
  }
  // 获取vite打包后dist下 assets下的 所有jsmap
  async getJsmaps(outputPath) {
    // 读取输出目录下的所有文件
    const assets = await fs.promises.readdir(outputPath);
    // 过滤 jsmap
    const assetsArray = Array.isArray(assets) ? assets : Object.keys(assets);
    const jsmaps = assetsArray.filter((i) => i.endsWith(".js.map"));
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
    // TODO sourcemap 文件上传
    const result = (await httpPost(uploadURL, params)) as ApiResponse;
    console.log("上传完成->", result);
    if (result.code === 200) {
      console.log(result.data.msg);

      //     // 删除源文件、因为前端包不需要
      //     // const pathStr = path.join(__dirname,
      //     //   '../',
      //     //   '/dist/maps')
      //     // TODO  dits文件夹不在vscode中显示
      //     // console.log('-==', pathStr)
      //     // fs.rmdirSync(pathStr)
      //     // fs.unlink(pathStr, (err) => {
      //     //   if (err) throw err
      //     //   console.log('已成功删除文件')
      //     // })
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
      fileName: formatFileName(fileName),
      fileContent,
    };
  });
}

/* 处理 feilename， 如果是webpack 配置了一层 maps文件夹 需要去掉 */
export function formatFileName(filePath) {
  return filePath.includes("maps") ? filePath.replace("maps/", "") : filePath;
}
