import { promises as fs } from "fs";

import { parse } from "react-docgen";
import { PropDescriptor } from "react-docgen/dist/Documentation";

export interface Meta {
  component: string;
  source: string;
  docgen: Docgen;
  classes: {
    [selector: string]: string;
  };
}

export interface DocgenProp {
  defaultValue: {
    value: string;
  };
  description: string;
  name: string;
  required: boolean;
  type: {
    name: string;
  };
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Record<string, PropDescriptor>;
}

export const getComponentData = async (
  componentName: string,
  classes: { [selector: string]: string }
) => {
  const path = `/packages/core/src/${componentName}/${componentName}.tsx`;

  const res = await fs.readFile(`./../..${path}`, "utf8");
  return {
    component: componentName,
    source: `https://github.com/lumada-design/hv-uikit-react/blob/master${path}`,
    docgen: parse(res)[0] as Docgen,
    classes,
  } as Meta;
};
