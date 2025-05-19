import { resolve } from "path";
import { withDefaultConfig, type Props } from "react-docgen-typescript";

export interface Meta {
  component: string;
  source: string;
  package: string;
  docgen: Docgen;
  classes: Record<string, string>;
  subComponents?: string[];
  subComponentsDocgen?: Record<string, unknown>;
  componentPath?: string;
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Props;
}

function cleanUndefinedValues(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefinedValues);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => {
          if (k === "parent" && v === undefined) {
            return [k, null];
          }
          return [k, cleanUndefinedValues(v)];
        }),
    );
  }
  return obj;
}

function filterInheritedProps(
  props: Props,
  componentName: string,
  includeInheritedProps = false,
): Props {
  return includeInheritedProps
    ? props
    : Object.fromEntries(
        Object.entries(props).filter(([, prop]) => {
          const shouldInclude = prop.parent
            ? prop.parent?.fileName?.includes(componentName)
            : prop.declarations?.some((d) =>
                d.fileName?.includes(componentName),
              );
          return shouldInclude;
        }),
      );
}

const parser = withDefaultConfig({
  shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true,
});

const getParsedDocgen = (path: string) => {
  return parser.parse(resolve("../..", path));
};

export const getComponentData = async (
  componentName: string,
  packageName: string,
  classes: Record<string, string>,
  subComponents: string[] = [],
  includeInheritedProps = false,
  componentPath = "",
): Promise<Meta> => {
  const componentLocation = `packages/${packageName}/src/${componentPath}/{componentName}/${componentName}.tsx`;
  const source = `https://github.com/lumada-design/hv-uikit-react/blob/master/${componentLocation}`;

  const parsed = getParsedDocgen(componentLocation);

  const cleanedDocgen = cleanUndefinedValues(parsed[0]) as Docgen;
  cleanedDocgen.props = filterInheritedProps(
    cleanedDocgen.props,
    componentName,
    includeInheritedProps,
  );

  const parsedSubComponents: Record<string, Docgen> = {};
  for (const subComponent of subComponents) {
    const subComponentLocation = `packages/${packageName}/src/${componentPath}/${componentName}/${subComponent}/${subComponent}.tsx`;

    const parsedSubComponent = getParsedDocgen(subComponentLocation);
    const cleanedSubComponentDocgen = cleanUndefinedValues(
      parsedSubComponent[0],
    ) as Docgen;
    cleanedSubComponentDocgen.props = filterInheritedProps(
      cleanedSubComponentDocgen.props,
      componentName,
    );

    parsedSubComponents[subComponent] = cleanedSubComponentDocgen;
  }

  return {
    component: componentName,
    source,
    package: packageName || "",
    docgen: cleanedDocgen || {},
    classes,
    subComponents: subComponents || [],
    subComponentsDocgen: parsedSubComponents,
  };
};
