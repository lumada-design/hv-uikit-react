import { isValidElement } from "react";
import { Pre as NextraPre } from "nextra/components";

import { Live } from "./Live";

interface PreProps extends React.HTMLAttributes<HTMLElement> {
  live?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
}

export const Pre = ({ live, collapsed, children, ...props }: PreProps) => {
  if (live && isValidElement(children)) {
    return <Live collapsed={collapsed} {...children.props} />;
  }

  return <NextraPre {...props}>{children}</NextraPre>;
};
