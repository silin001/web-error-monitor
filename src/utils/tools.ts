/*
 * @Date: 2024-04-12 09:47:36
 * @LastEditTime: 2024-09-23 15:02:27
 * @Description: 封装好的一些函数工具
 * @FilePath: /my-v3ts-project/Users/sisi/Desktop/myWeb/my-plugins-project/web-error-tracker/src/utils/tools.ts
 */

// export function getCurrentTime() {
//   const now = new Date();

//   // 获取年月日时分秒
//   const year = now.getFullYear(); // 年
//   const month = String(now.getMonth() + 1).padStart(2, "0"); // 月
//   const day = String(now.getDate()).padStart(2, "0"); // 日
//   const hours = String(now.getHours()).padStart(2, "0"); // 时
//   const minutes = String(now.getMinutes()).padStart(2, "0"); // 分
//   const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒

//   // 格式化输出
//   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }


export function getCurrentTime() {
  // 获取当前日期和时间
  const now = new Date();

  // 获取年月日时分秒
  const year = now.getFullYear(); // 年
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月
  const day = String(now.getDate()).padStart(2, "0"); // 日
  const hours = now.getHours(); // 时
  const minutes = String(now.getMinutes()).padStart(2, "0"); // 分
  const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒

  // 获取星期几
  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const dayOfWeek = daysOfWeek[now.getDay()]; // 获取星期几

  // 格式化小时
  let formattedHours;
  let period = ""; // 上午/下午

  if (hours < 12) {
    formattedHours = hours === 0 ? 12 : hours; // 0点显示为12
    period = "上午";
  } else {
    formattedHours = hours === 12 ? 12 : hours - 12; // 12点显示为12，其他点减去12
    period = "下午";
  }

  // 若超过12点，则输出24小时制
  const displayHours =
    hours >= 12 ? String(hours).padStart(2, "0") : formattedHours;

  // 格式化输出
  return `${year}-${month}-${day} ${dayOfWeek} ${period} ${displayHours}:${minutes}:${seconds}`;
}

