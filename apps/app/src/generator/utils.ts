import { HvTheme } from "@hitachivantara/uikit-react-core";
import { HvThemeStructure } from "@hitachivantara/uikit-styles";

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

export const themeDiff = (a: object, b: object): object => {
  const diff: Record<string, object> = {};
  for (const key in b) {
    // if (rootLevel && (key === "name" || key === "base")) {
    //   // eslint-disable-next-line no-continue
    //   continue; // ignore 'name' and 'base' at the root level
    // }
    if (
      typeof b[key as keyof typeof b] === "object" &&
      b[key as keyof typeof b] !== null &&
      typeof a[key as keyof typeof b] === "object" &&
      a[key as keyof typeof b] !== null
    ) {
      const nestedDiff = themeDiff(
        a[key as keyof typeof b],
        b[key as keyof typeof b],
        // false
      );
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = nestedDiff;
      }
    } else if (
      !Object.hasOwn(a, key) ||
      a[key as keyof typeof b] !== b[key as keyof typeof b]
    ) {
      diff[key as keyof typeof b] = b[key as keyof typeof b];
    }
  }
  return diff;
};

export const getThemeCode = (
  themeName: string,
  selectedTheme: string,
  themeChanges?: Partial<HvTheme | HvThemeStructure>,
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
    "$1:",
  )});
`;
};

export const downloadTheme = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const extractFontSizeUnit = (fontSize: string) => {
  const unitRegex = /[a-z%]+$/i;
  const match = fontSize.match(unitRegex);
  return match ? match[0] : null;
};
