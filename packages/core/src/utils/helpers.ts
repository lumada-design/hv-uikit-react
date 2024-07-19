export const uniqueId = (prefix = "") => {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
};

export const range = (length: number, start = 0) => {
  return Array.from({ length: length - start }, (_, i) => i + start);
};

export const capitalize = (string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const clamp = (value: number, max = 100, min = 0) => {
  return Math.min(Math.max(value, min), max);
};

export function isEqual(obj1: unknown, obj2: unknown) {
  if (!obj1 || !obj2 || typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (
      !isEqual(obj1[key as keyof typeof obj1], obj2[key as keyof typeof obj2])
    )
      return false;
  }

  return true;
}
