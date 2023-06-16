export const getVarValue = (cssVar: string, rootElementId?: string) => {
  const root = document.getElementById(rootElementId || "hv-root");
  if (root) {
    const computedValue = getComputedStyle(root)
      .getPropertyValue(cssVar.replace("var(", "").replace(")", ""))
      .trim();

    return computedValue;
  }
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
      // eslint-disable-next-line no-continue
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
    } else if (!Object.hasOwn(a, key) || a[key] !== b[key]) {
      diff[key] = b[key];
    }
  }
  return diff;
};

export const getThemeCode = (
  themeName: string,
  selectedTheme: string,
  themeChanges
) => {
  const final = {
    name: themeName,
    base: selectedTheme,
    ...themeChanges,
  };

  // the `replace` bit below is just a regex to remove the quotes from
  // the properties names, for displaying effect only.
  return `import { createTheme } from "@hitachivantara/uikit-react-core";
  
export default createTheme(${JSON.stringify(final, null, 2).replace(
    /"([^(")"]+)":/g,
    "$1:"
  )});
`;
};

export const downloadTheme = (filename, text) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const extractFontSizeUnit = (fontSize) => {
  const unitRegex = /[a-z%]+$/i;
  const match = fontSize.match(unitRegex);
  return match ? match[0] : null;
};
