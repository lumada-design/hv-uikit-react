import React from "react";
import { css } from "@emotion/css";
import { HvRadio, HvTypography, theme } from "@hitachivantara/uikit-react-core";

import { HvCard } from "../Card";

const classes = {
  root: css({
    display: "flex",
    flexDirection: "row",
    gap: theme.space.xs,
  }),
  icon: css({}),
  radio: css({}),
  content: css({
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
  }),
};

export const SimpleCard = ({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <HvCard>
      <div className={classes.root}>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.content}>
          <HvTypography variant="title4">{title}</HvTypography>
          <HvTypography variant="caption1">{description}</HvTypography>
        </div>
        <div className={classes.radio}>
          <HvRadio aria-label="Select" />
        </div>
      </div>
    </HvCard>
  );
};
