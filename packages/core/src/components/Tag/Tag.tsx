import clsx from "clsx";
import React from "react";
import { createPolymorphicComponent } from "utils/create-polymorphic-component";
import { Box } from "./Tag.styles";

export interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Tag component
 */
export const InternalTag = ({ children, className, ...others }) => {
  return (
    <Box {...others} className={clsx(className)}>
      {children}
    </Box>
  );
};

InternalTag.displayName = "Tag";

export const Tag = createPolymorphicComponent<"div", TagProps>(InternalTag);
