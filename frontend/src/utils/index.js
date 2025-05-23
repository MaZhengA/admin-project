function formatNum(num) {
  const strNum = num?.toString();
  return strNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export {
  formatNum
}