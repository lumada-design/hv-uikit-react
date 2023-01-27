export const getClasses = <T>(keys: string[], name: string): T => {
  const classesObj = {};
  keys.forEach((key: string) => {
    classesObj[key] = `${name}-${key}`;
  });
  return classesObj as T;
};
