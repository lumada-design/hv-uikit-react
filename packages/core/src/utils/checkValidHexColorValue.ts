const checkValidHexColorValue = (value?: string): boolean => {
  const reg = /^#([0-9a-f]{3}){1,2}$/i;
  return value ? reg.test(value) : false;
};

export default checkValidHexColorValue;
