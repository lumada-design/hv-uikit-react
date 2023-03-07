export const getVarValue = (cssVar: string): string => {
  // Creating a temporary element to get CSS variables
  const tempEl = document.createElement("div");
  tempEl.style.setProperty("--temp", cssVar);
  document.body.appendChild(tempEl);
  const computedValue = getComputedStyle(tempEl)
    .getPropertyValue("--temp")
    .trim();
  document.body.removeChild(tempEl);

  return computedValue;
};

export const extractFontName = (fontLink) =>
  fontLink.substring(fontLink.indexOf("family=") + 7, fontLink.indexOf("&"));
