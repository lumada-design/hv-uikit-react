import { isValidElement } from "react";

import CodeBlock from "./CodeBlock";

type Props = {
  live?: boolean;
  children?: React.ReactNode;
};

const Pre = ({ live, children, ...props }: Props) => {
  return isValidElement(children) ? (
    <CodeBlock live={live} {...children.props} />
  ) : (
    <pre {...props}>{children}</pre>
  );
};

export default Pre;
