import { ReactNode } from "react";
import { css } from "@emotion/css";
import {
  HvGrid,
  HvGridProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export interface MetadataItemProps extends Omit<HvGridProps, "title"> {
  title?: ReactNode;
  children?: ReactNode;
}

export const MetadataItem = ({
  title,
  children,
  ...others
}: MetadataItemProps) => (
  <HvGrid item {...others}>
    <div
      role="group"
      className={css({
        paddingTop: theme.space.xs,
        borderTop: `1px solid ${theme.colors.atmo4}`,
        display: "flex",
        flexFlow: "column wrap",
        gap: theme.space.xs,
      })}
    >
      {title && <HvTypography variant="label">{title}</HvTypography>}
      {children}
    </div>
  </HvGrid>
);
