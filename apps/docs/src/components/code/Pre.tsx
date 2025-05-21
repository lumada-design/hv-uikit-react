import { isValidElement } from "react";
import { Pre as NextraPre } from "nextra/components";

import { CodeBlock } from "./CodeBlock";

interface PreProps extends React.ComponentProps<"pre"> {
  live?: boolean;
}

export const Pre = ({ live, children, ...props }: PreProps) => {
  if (live && isValidElement(children)) {
    const code = children.props.children || "";
    return <CodeBlock code={code} layout="expandable" />;
  }

  return <NextraPre {...props}>{children}</NextraPre>;
};
