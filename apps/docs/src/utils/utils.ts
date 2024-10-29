import {
  ComponentDoc,
  PropItem,
  withDefaultConfig,
} from "react-docgen-typescript";

export interface Meta {
  component: string;
  source: string;
  package: string;
  docgen: Docgen;
  classes: {
    [selector: string]: string;
  };
  subComponents?: [];
  subComponentsDocgen?: {};
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Record<string, PropItem>;
}

function cleanUndefinedValues(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefinedValues);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([, v]) => v !== undefined) // Filter out undefined values
        .map(([k, v]) => {
          if (k === "parent" && v === undefined) {
            return [k, null]; // Replace undefined `parent` with null
          }
          return [k, cleanUndefinedValues(v)];
        }), // Recursively clean nested objects
    );
  }
  return obj;
}

function filterInheritedProps(
  props: Record<string, PropItem>,
  componentName: string,
) {
  return Object.fromEntries(
    Object.entries(props).filter(([, prop]) => {
      const shouldInclude = prop.parent
        ? prop.parent?.fileName?.includes(componentName)
        : prop.declarations?.some((d) => d.fileName?.includes(componentName));
      return shouldInclude;
    }),
  );
}

const getParsedDocgen = (path: string) => {
  const parser = withDefaultConfig({
    shouldExtractLiteralValuesFromEnum: true,
    savePropValueAsString: true,
  });
  return parser.parse(path);
};

export const getComponentData = async (
  componentName: string,
  packageName: string,
  classes: { [selector: string]: string },
  subComponents?: string[],
) => {
  try {
    const componentLocation = `/packages/${packageName}/src/${componentName}/${componentName}.tsx`;
    const path = `${process.cwd()}../../..${componentLocation}`;
    const source = `https://github.com/lumada-design/hv-uikit-react/blob/master${componentLocation}`;

    const parsed: ComponentDoc[] = getParsedDocgen(path);

    const cleanedDocgen = cleanUndefinedValues(parsed[0]);
    cleanedDocgen.props = filterInheritedProps(
      cleanedDocgen.props,
      componentName,
    );

    let parsedSubComponents: {} = {};
    if (subComponents && subComponents.length) {
      subComponents.forEach((subComponent) => {
        const subComponentLocation = `/packages/${packageName}/src/${componentName}/${subComponent}/${subComponent}.tsx`;
        const subPath = `${process.cwd()}../../..${subComponentLocation}`;

        const parsedSubComponent: ComponentDoc[] = getParsedDocgen(subPath);
        const cleanedSubComponentDocgen = cleanUndefinedValues(
          parsedSubComponent[0],
        );
        cleanedSubComponentDocgen.props = filterInheritedProps(
          cleanedSubComponentDocgen.props,
          componentName,
        );

        parsedSubComponents = {
          ...parsedSubComponents,
          [subComponent]: cleanedSubComponentDocgen,
        };
      });
    }

    return {
      component: componentName,
      source,
      package: packageName || "",
      docgen: cleanedDocgen || {},
      classes,
      subComponents: subComponents || [],
      subComponentsDocgen: parsedSubComponents,
    } as Meta;
  } catch (error) {
    throw new Error(error as string);
  }
};
