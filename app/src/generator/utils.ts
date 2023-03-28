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

export const extractFontsNames = (webfontLink: string): string[] => {
  const fontNames: string[] = [];

  const queryIndex = webfontLink.indexOf("?");
  if (queryIndex === -1) {
    return fontNames;
  }

  const query = webfontLink.substring(queryIndex + 1);
  const params = new URLSearchParams(query);

  params.forEach((value, key) => {
    if (key === "family") {
      value.split(",").forEach((fontNameWithVariants) => {
        const fontName = fontNameWithVariants.split(":")[0];
        fontNames.push(fontName.trim().replace(/ /g, "+"));
      });
    }
  });

  return fontNames;
};
