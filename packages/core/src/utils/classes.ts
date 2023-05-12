export const getClasses = <T extends string, N extends string>(
  keys: T[],
  name: N
) => {
  const classesObj: Record<string, string> = {};
  keys.forEach((key: string) => {
    classesObj[key] = `${name}-${key}`;
  });
  return classesObj as { [P in T]: `${N}-${P}` };
};
