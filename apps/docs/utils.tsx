import { promises as fs } from "fs";

import { parse } from "react-docgen";

export interface Meta {
  component: string;
  source: string;
  docgen: Docgen;
}

export interface Docgen {
  description: string;
  displayName: string;
  props: Record<string, string>;
}

export const getComponentData = async (componentName: string) => {
  const path = `/packages/core/src/${componentName}/${componentName}.tsx`;

  const res = await fs.readFile(`./../..${path}`, "utf8");
  return {
    component: componentName,
    source: `https://github.com/lumada-design/hv-uikit-react/blob/master${path}`,
    docgen: parse(res)[0] as Docgen,
  } as Meta;
};
