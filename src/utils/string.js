export function twUnitToRem(number) {
  return number / 4 + 'rem';
}

export function cursorEncode(number) {
  return window.btoa(`cursor:${number}`);
}
