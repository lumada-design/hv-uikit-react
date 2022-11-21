/**
 * Replace sizes in the svg
 * @param  string fileData
 * @return Object
 */
const replaceSize = (fileData) => {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/;
  const widthRegexp = /width={(\d*?)}/;
  const heightRegexp = /height={(\d*?)}/;

  return fileData
    .replace(widthRegexp, ``)
    .replace(heightRegexp, ``)
    .replace(
      viewBoxRegexp,
      `viewBox={viewbox} height={size.height} width={size.width}`
    );
};

export default replaceSize;
