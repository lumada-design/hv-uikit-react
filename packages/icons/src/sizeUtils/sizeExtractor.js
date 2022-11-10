/**
 * Creates a standardized component name from a given gile and filename
 * @param  string fileData
 * @return Object
 */
module.exports = function extractSize(fileData) {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/g;
  const widthRegexp = /width={(\d*?)}/g;
  const heightRegexp = /height={(\d*?)}/g;

  let matcher;

  const result = {
    width: undefined,
    height: undefined,
    viewBoxRegexp: [],
  };

  matcher = widthRegexp.exec(fileData);
  result.width = parseInt(matcher[1], 10) - 2;
  matcher = heightRegexp.exec(fileData);
  result.height = parseInt(matcher[1], 10) - 2;
  matcher = viewBoxRegexp.exec(fileData);

  result.viewBoxRegexp = [
    parseInt(matcher[1], 10),
    parseInt(matcher[2], 10),
    parseInt(matcher[3], 10),
    parseInt(matcher[4], 10),
  ];

  return result;
};
