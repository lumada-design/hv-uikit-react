import MuiLinearProgress from "@mui/material/LinearProgress";
import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const { useClasses } = createClasses("HvProgressColumnCell", {
  root: { display: "flex", width: "100%" },
  linearProgressContainer: { width: "100%", margin: "auto" },
  linearProgress: {
    height: 8,
  },
  linearProgressRoot: { backgroundColor: theme.colors.atmo4 },
  linearProgressColorPrimary: {
    backgroundColor: theme.colors.atmo4,
  },
  linearProgressBarColorPrimary: {
    backgroundColor: theme.colors.positive,
  },
  linearProgressBarColorSecondary: {
    backgroundColor: theme.colors.secondary,
  },
});

export interface HvProgressColumnCellProp {
  /** Current value of the bar. */
  partial: number;
  /** Maximum value of the bar. */
  total: number;
  /** The color of the bar. */
  color?: "primary" | "secondary";
  "aria-labelledby"?: string;
}

const normalizeProgressBar = (value: number, max: number) => {
  return max > 0 ? Math.floor((value * 100) / max) : 0;
};

export const HvProgressColumnCell = ({
  partial,
  total,
  color = "primary",
  "aria-labelledby": ariaLabelledBy,
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
          aria-labelledby={ariaLabelledBy}
        />
      </div>
    </div>
  );
};
