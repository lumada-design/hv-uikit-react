import { useData } from "nextra/data";

import CodeBlock from "./CodeBlock";

export const Demo = ({ name }: { name: string }) => {
  const { samples } = useData();

  return <CodeBlock live>{samples[name]}</CodeBlock>;
};
