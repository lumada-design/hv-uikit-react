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

export const themeDiff = (a: object, b: object, rootLevel = true): object => {
  const diff = {};
  for (const key in b) {
    if (rootLevel && (key === "name" || key === "base")) {
      continue; // ignore 'name' and 'base' at the root level
    }
    if (
      typeof b[key] === "object" &&
      b[key] !== null &&
      typeof a[key] === "object" &&
      a[key] !== null
    ) {
      const nestedDiff = themeDiff(a[key], b[key], false);
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      }
    } else if (!a.hasOwnProperty(key) || a[key] !== b[key]) {
      diff[key] = b[key];
    }
  }
  return diff;
};

export const downloadTheme = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
