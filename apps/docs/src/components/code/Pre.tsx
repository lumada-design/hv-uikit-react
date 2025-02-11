import { isValidElement } from "react";
import { Pre as NextraPre } from "nextra/components";

import { CodeBlock } from "./CodeBlock";

interface PreProps extends React.HTMLAttributes<HTMLElement> {
  live?: boolean;
  children?: React.ReactNode;
}

export const Pre = ({ live, children, ...props }: PreProps) => {
  if (live && isValidElement(children)) {
    const code = children.props.children || "";
    return <CodeBlock code={code} layout="expandable" />;
  }

  return <NextraPre {...props}>{children}</NextraPre>;
};
