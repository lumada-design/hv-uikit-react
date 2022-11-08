/**
 * Creates a standardized component name from a given gile and filename
 * @param  string fileData
 * @return Object
 */
module.exports = function extractColors(fileData) {
  const regexp = /fill="(.*?)"|fill: (.*?);/g; // find all the fills inside the component
  let matcher;

  const result = {
    colorArray: [],
    colorText: "",
  };

  do {
    matcher = regexp.exec(fileData);
    if (matcher) {
      if (
        !result.colorArray.includes(matcher[1]) &&
        !result.colorArray.includes(matcher[2])
      ) {
        if (matcher[1] !== undefined && matcher[1] !== null) {
          result.colorArray.push(matcher[1]);
          result.colorText = result.colorText.concat(`"${matcher[1]}",`);
        }
        if (matcher[2] !== undefined && matcher[2] !== null) {
          result.colorArray.push(matcher[2]);
          result.colorText = result.colorText.concat(`"${matcher[2]}",`);
        }
      }
    }
  } while (matcher);
  result.colorText = result.colorText.slice(0, -1); // eliminate the last comma
  return result;
};
