type ResultProps = {
  width?: number;
  height?: number;
  viewBoxRegexp: number[];
};

/**
 * Creates a standardized component name from a given file and filename
 */
export const extractSize = (fileData: string) => {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/g;
  const widthRegexp = /width={(\d*?)}/g;
  const heightRegexp = /height={(\d*?)}/g;

  let matcher;

  const result: ResultProps = {
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

/**
 * Replace sizes in the svg
 */
export const replaceSize = (fileData: string) => {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/;
  const widthRegexp = /width={(\d*?)}/;
  const heightRegexp = /height={(\d*?)}/;

  return fileData
    .replace(widthRegexp, ``)
    .replace(heightRegexp, ``)
    .replace(viewBoxRegexp, `viewBox={viewbox}`);
};
