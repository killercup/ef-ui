module.exports = function padDigits(digits, number) {
  return new Array(Math.max(digits - String(number).length + 1, 0))
    .join(0) + number;
};
