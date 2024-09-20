/*
 * @Date: 2024-04-11 09:52:14
 * @LastEditTime: 2024-09-19 10:08:16
 * @Description: 封装好的 http请求
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/http/index.ts
 */

const http = require("http");
const url = require("url");
export const httpGet = (api) => {
  return new Promise((resolve, reject) => {
    http
      .get(api, (res) => {
        let bufferData;
        res.on("data", (chunk) => {
          bufferData = chunk;
        });
        res.on("end", () => {
          resolve(bufferData);
        });
      })
      .on("error", (err) => {
        console.log("Error: ", err.message);
        reject(err);
      });
  });
};

export const httpPost = (api, params) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(params); // 将参数转换为 JSON 字符串
    // 解析 URL
    const parsedUrl = url.parse(api);
    // 设置请求选项
    const options = {
      hostname: parsedUrl.hostname, // 从完整 URL 中获取主机名
      port: parsedUrl.port || 80, // 从完整 URL 中获取端口，默认使用 80
      path: parsedUrl.path, // 从完整 URL 中获取路径
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 指定请求体格式
        "Content-Length": Buffer.byteLength(data), // 请求体的长度
      },
    };

    const req = http.request(options, (res) => {
      let bufferData = "";

      res.on("data", (chunk) => {
        bufferData += chunk; // 拼接数据块
      });

      res.on("end", () => {
        resolve(bufferData); // 返回完整数据
      });
    });

    req.on("error", (err) => {
      console.log("Error: ", err.message);
      reject(err); // 处理请求错误
    });

    req.write(data); // 写入请求体
    req.end(); // 结束请求
  });
};
