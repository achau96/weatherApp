const CtoF = function(CTemp) {
  return ((CTemp * 9 / 5) + 32).toFixed(2);
}

const FtoC = function(FTemp) {
  return ((FTemp - 32) * 5 / 9).toFixed(2);
}
export {CtoF, FtoC};
