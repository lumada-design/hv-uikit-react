const hexToRgbA = (hex, factor = 0.8) => {
  let color;
  let result;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split("");
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = `0x${color.join("")}`;
    // eslint-disable-next-line no-bitwise
    result = `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(",")}, ${factor})`;
  }
  return result;
};

export default hexToRgbA;
