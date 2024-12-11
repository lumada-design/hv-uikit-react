const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const findBestUnit = (bytes: number, base = 1000) => {
  const i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(base)) : 0;
  const si = Math.min(i, units.length - 1); // safe index

  return { unit: units[si], value: bytes / base ** si };
};

export const convertUnits = (bytes: number, base = 1000) => {
  const { unit, value } = findBestUnit(bytes, base);

  return value.toFixed(2) + unit;
};
