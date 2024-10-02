import React, { isValidElement } from "react";
import { Pre as NextraPre } from "nextra/components";

import { Live } from "./Live";

interface PreProps extends React.HTMLAttributes<HTMLElement> {
  live?: boolean;
  children?: React.ReactNode;
}

export const Pre = ({ live, children, ...props }: PreProps) => {
  if (!children) {
    return <pre {...props} />;
  }

  if (isValidElement(children)) {
    const childProps = children.props;
    return live ? <Live {...childProps} /> : <NextraPre {...childProps} />;
  }

  return <pre {...props}>{children}</pre>;
};
