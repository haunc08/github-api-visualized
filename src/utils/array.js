export function range(start, count) {
  return Array.from({ length: count }, (_, i) => i + start);
}
