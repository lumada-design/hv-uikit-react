import MuiLinearProgress from "@mui/material/LinearProgress";

import { useClasses } from "./ProgressColumnCell.styles";

export interface HvProgressColumnCellProp {
  /** Current value of the bar. */
  partial: number;
  /** Maximum value of the bar. */
  total: number;
  /** The color of the bar. */
  color?: "primary" | "secondary";
}

export const normalizeProgressBar = (value: number, max: number) => {
  return max > 0 ? Math.floor((value * 100) / max) : 0;
};

export const HvProgressColumnCell = ({
  partial,
  total,
  color = "primary",
}: HvProgressColumnCellProp): JSX.Element => {
  const { classes } = useClasses();

  const percentage = normalizeProgressBar(partial, total);

  return (
    <div className={classes.root}>
      <div className={classes.linearProgressContainer}>
        <MuiLinearProgress
          className={classes.linearProgress}
          classes={{
            root: classes.linearProgressRoot,
            colorPrimary: classes.linearProgressColorPrimary,
            barColorPrimary: classes.linearProgressBarColorPrimary,
            barColorSecondary: classes.linearProgressBarColorSecondary,
          }}
          color={color}
          variant="determinate"
          value={percentage}
        />
      </div>
    </div>
  );
};
