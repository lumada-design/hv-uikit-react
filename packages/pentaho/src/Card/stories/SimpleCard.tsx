import React from "react";
import { css } from "@emotion/css";
import { HvRadio, HvTypography, theme } from "@hitachivantara/uikit-react-core";
import { HvCard, HvCardSection } from "@hitachivantara/uikit-react-pentaho";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.xs,
  }),
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  }),
};

interface SimpleCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export const SimpleCard = ({ icon, title, description }: SimpleCardProps) => {
  return (
    <HvCard>
      <HvCardSection>
        <div className={classes.root}>
          {icon}
          <div className={classes.content}>
            <HvTypography variant="title4">{title}</HvTypography>
            <HvTypography variant="caption1">{description}</HvTypography>
          </div>
          <HvRadio aria-label="Select" />
        </div>
      </HvCardSection>
    </HvCard>
  );
};
