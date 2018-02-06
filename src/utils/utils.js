/**
 * Created by Jason on 2018/2/6.
 */
import moment from 'moment';


// 获取某月有几周
export function getWeekInMonth({ year, month }) {
    // 获取year and month， 生成当前month的所有day;
  const lastMonth = new Date(year, month - 1, 0);
  const date = new Date(year, month, 0);
  const daysCount = date.getDate();// 获取天数
  const days = [{ value: 0, label: '全部' }];// 当前月份所有天的数组。
  let firstDate = lastMonth.getDay() + 1;
  let weekCount = 0;
  const week = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'];

    // 算出一个月有几周
  for (let i = 0; i < daysCount; i += 1) {
    firstDate += 1;
    if (firstDate === 7) {
      firstDate = 1;
      weekCount += 1;
      days.push({ value: weekCount, label: week[weekCount - 1] });
    }
  }
  return days;
}


// 初始化联动时间选择器
export function createDatePicker() {
  const initDatePick = [];
  let nowYear = moment().year();
  for (let i = 10; i > 0; i -= 1) {
    const yearItem = { value: nowYear, label: `${nowYear}年`, isLeaf: false };
    const monthItem = [];
    for (let j = 0; j < 12; j += 1) {
      monthItem.push({ value: j + 1, label: `${j + 1}月`, isLeaf: false });
    }
    yearItem.children = monthItem;
    initDatePick.push(yearItem);
    nowYear -= 1;
  }
  return initDatePick;
}
