import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Grid from "@material-ui/core/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

const strings = {
  cellATitle: "Priority",
  cellAContent: "High",
  cellCTitle: "Probability score",
  cellCContent: "98%",
  cellBTitle: "Main Asset",
  cellBContent: "California wonder grain of wonderfullness",
  cellDTitle: "Est. date of failure",
  cellDContent: "30-60 days",
  cellETitle: "UUID",
  cellEContent: "2101caf3-7cd4-1000-bdp95-d8c4971767c"
};

const MultipleActionsStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  bottomItem: {
    padding: "0"
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const MultipleActions = ({ classes }) => {
  const {
    cellATitle,
    cellAContent,
    cellBTitle,
    cellBContent,
    cellCTitle,
    cellCContent,
    cellDTitle,
    cellDContent,
    cellETitle,
    cellEContent
  } = strings;

  return (
    <>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <HvTypography variant="labelText">{cellATitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellAContent}
          </HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.item}>
          <HvTypography variant="labelText">{cellBTitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellBContent}
          </HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <HvTypography variant="labelText">{cellCTitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellCContent}
          </HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.bottomItem}>
          <HvTypography variant="labelText">{cellDTitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellDContent}
          </HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.bottomItem}>
          <HvTypography variant="labelText">{cellETitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellEContent}
          </HvTypography>
        </Grid>
      </Grid>
    </>
  );
};

const MultipleActionsWithStyle = withStyles(MultipleActionsStyles)(
  MultipleActions
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      subheader={configurationNoMedia.subtitle}
      innerCardContent={<MultipleActionsWithStyle />}
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
