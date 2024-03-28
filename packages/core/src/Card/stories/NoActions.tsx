import { css } from "@emotion/css";
import { Grid } from "@mui/material";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const classes = {
  grid: css({
    paddingTop: theme.space.sm,
    paddingRight: 0,
    paddingBottom: theme.space.sm,
    paddingLeft: 0,
  }),
  gridBottom: css({ padding: 0 }),
};

const actions = [
  { title: "Priority", content: "High" },
  {
    title: "Main Asset",
    content: "California wonder grain of wonderfulness",
  },
  { title: "Probability score", content: "98%" },
  { title: "Est. date of failure", content: "30-60 days" },
  { title: "UUID", content: "2101caf3-7cd4-1000-bdp95-d8c4971767c" },
];

export const NoActions = () => {
  return (
    <HvCard bgcolor="atmo1" style={{ width: "500px" }}>
      <HvCardHeader title="Advanced Server DS120" subheader="QTFCR27520007" />
      <HvCardContent>
        <Grid container>
          <Grid className={classes.grid} item xs={5}>
            <HvTypography variant="label">{actions[0].title}</HvTypography>
            <HvTypography>{actions[0].content}</HvTypography>
          </Grid>
          <Grid className={classes.grid} item xs={7}>
            <HvTypography variant="label">{actions[1].title}</HvTypography>
            <HvTypography>{actions[1].content}</HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid className={classes.grid} item xs={5}>
            <HvTypography variant="label">{actions[2].title}</HvTypography>
            <HvTypography>{actions[2].content}</HvTypography>
          </Grid>
          <Grid className={classes.gridBottom} item xs={7}>
            <HvTypography variant="label">{actions[3].title}</HvTypography>
            <HvTypography>{actions[3].content}</HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid className={classes.gridBottom} item xs={12}>
            <HvTypography variant="label">{actions[4].title}</HvTypography>
            <HvTypography>{actions[4].content}</HvTypography>
          </Grid>
        </Grid>
      </HvCardContent>
    </HvCard>
  );
};
