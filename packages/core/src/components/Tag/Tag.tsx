import React from "react";
import { createPolymorphicComponent } from "utils/create-polymorphic-component";
import { Box } from "./Tag.styles";

export interface TagProps {
  children: React.ReactNode;
}

/**
 * Tag component
 */
export const InternalTag = ({ children, ...others }) => {
  return (
    <Box {...others} style={{ maxWidth: 120 }}>
      {children}
    </Box>
  );
};

InternalTag.displayName = "Tag";

export const Tag = createPolymorphicComponent<"div", TagProps>(InternalTag);
