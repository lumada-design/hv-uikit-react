/** Extracts the SVG viewBox */
export const extractSize = (fileData: string) => {
  const viewBoxRegexp = /viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/;
  return (viewBoxRegexp.exec(fileData) || []).slice(1, 5).join(" ");
};

/** Replace sizes in the svg */
export const replaceSize = (fileData: string) => {
  return fileData
    .replace(/width={(\d*?)}/, "")
    .replace(/height={(\d*?)}/, "")
    .replace(/viewBox="(\d*?) (\d*?) (\d*?) (\d*?)"/, `viewBox={viewbox}`);
};
