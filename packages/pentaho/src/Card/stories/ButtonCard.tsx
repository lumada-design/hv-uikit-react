import { css } from "@emotion/css";
import { HvTypography, theme } from "@hitachivantara/uikit-react-core";

import { HvCard } from "../Card";

const classes = {
  switch: css({ position: "absolute", top: 8, right: 8 }),
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

export interface HvButtonCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export const ButtonCard = ({
  icon,
  title,
  description,
  ...props
}: HvButtonCardProps) => {
  return (
    <HvCard component="a" {...props}>
      <div className={classes.root}>
        <div>{icon}</div>
        <div className={classes.content}>
          <HvTypography variant="title4">{title}</HvTypography>
          <HvTypography variant="caption1">{description}</HvTypography>
        </div>
      </div>
    </HvCard>
  );
};
