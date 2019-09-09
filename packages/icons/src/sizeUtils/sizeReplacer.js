'use strict'

/**
 * Replace sizes in the svg
 * @param  string fileData
 * @return Object
 */
module.exports = function ReplaceSize(fileData, sizeObject, useGeneric) {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/;
  const widthRegexp = /width={(\d*?)}/;
  const heightRegexp = /height={(\d*?)}/;

  if(useGeneric) {
    return fileData
    .replace(widthRegexp, ``)
    .replace(heightRegexp, ``)
    .replace(viewBoxRegexp, `viewBox={viewbox} height={size.height} width={size.width}`);
  } else {
    return fileData
    .replace(widthRegexp, `width={${sizeObject.width}}`)
    .replace(heightRegexp, `height={${sizeObject.height}}`)
    .replace(viewBoxRegexp, `viewBox="${sizeObject.viewBoxRegexp.join(" ")}" className={className}`);
  }
};
