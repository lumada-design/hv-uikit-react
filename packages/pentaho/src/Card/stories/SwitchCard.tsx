import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvSwitch,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { HvCard, HvCardSection } from "@hitachivantara/uikit-react-pentaho";

const classes = {
  switch: css({
    position: "absolute",
    top: 8,
    right: 8,
  }),
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

export const SwitchCard = ({
  icon,
  title,
  description,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <HvCard>
      <HvCardSection>
        <div className={classes.root}>
          <div>{icon}</div>
          <div className={classes.content}>
            <HvTypography variant="title4">{title}</HvTypography>
            <HvTypography variant="caption1">{description}</HvTypography>
            {open && children}
          </div>
          <div className={classes.switch}>
            <HvSwitch
              aria-label="Show content"
              onChange={() => setOpen((p) => !p)}
            />
          </div>
        </div>
      </HvCardSection>
    </HvCard>
  );
};
