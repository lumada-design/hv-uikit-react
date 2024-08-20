export const clamp = (value: number, max = 100, min = 0) => {
  return Math.min(Math.max(value, min), max);
};
