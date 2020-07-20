function metricConvert(num) {
  return Math.round(((num - 32) * 5) / 9);
}

console.log(metricConvert(109));
