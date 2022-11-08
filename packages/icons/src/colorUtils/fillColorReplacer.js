/**
 * Extract colors from the svg to an object
 * @param  string fileData
 * @return Object
 */
module.exports = function replaceFill(fileData, colorObject) {
  let result = fileData;
  colorObject.colorArray.forEach((element, index) => {
    result = result
      .split(`fill="${element}"`)
      .join(`fill={colorArray[${index}]} className="color${index}" `);
  });

  return result;
};
