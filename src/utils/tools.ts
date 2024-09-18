/*
 * @Date: 2024-04-12 09:47:36
 * @LastEditTime: 2024-09-18 16:30:41
 * @Description: 封装好的一些函数工具
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/utils/tools.ts
 */

export function getCurrentTime() {
  // 获取当前日期和时间
  const now = new Date();

  // 获取年月日时分秒
  const year = now.getFullYear(); // 年
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月
  const day = String(now.getDate()).padStart(2, "0"); // 日
  const hours = String(now.getHours()).padStart(2, "0"); // 时
  const minutes = String(now.getMinutes()).padStart(2, "0"); // 分
  const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒

  // 格式化输出
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
