//数字变化特效
export function rollNum(elId, startVal, endVal, decimalNum) {
  let n = decimalNum || 0;
  let countUp = new CountUp(elId, startVal, endVal, n, 2.5, {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  });
  if (!countUp.error) {
    countUp.start();
  } else {
    console.error(countUp.error);
  }
}
