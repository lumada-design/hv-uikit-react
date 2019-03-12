import React from "react";
import HvCard from "@hv-ui/react/core/Card";
import HvButton from "@hv-ui/react/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  HvCardContent,
  HvCardFooter,
  HvCardHeader
} from "@hv-ui/react/core/Card";

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
    padding: `0 ${theme.spacing.sm}px 0 ${theme.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.spacing.sm}px 0`
  },
  bottomItem: {
    padding: "0"
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle2
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1
  },
  highlightText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3
  }
});

const MultipleActions = () => {
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
        <Grid item xs={5} className={MultipleActionsStyles.item}>
          <Typography className={MultipleActionsStyles.label}>
            {cellATitle}
          </Typography>
          <Typography className={MultipleActionsStyles.text}>
            {cellAContent}
          </Typography>
        </Grid>
        <Grid item xs={7} className={MultipleActionsStyles.item}>
          <Typography className={MultipleActionsStyles.label}>
            {cellBTitle}
          </Typography>
          <Typography className={MultipleActionsStyles.text}>
            {cellBContent}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={MultipleActionsStyles.item}>
          <Typography className={MultipleActionsStyles.label}>
            {cellCTitle}
          </Typography>
          <Typography className={MultipleActionsStyles.text}>
            {cellCContent}
          </Typography>
        </Grid>
        <Grid item xs={7} className={MultipleActionsStyles.bottomItem}>
          <Typography className={MultipleActionsStyles.label}>
            {cellDTitle}
          </Typography>
          <Typography className={MultipleActionsStyles.text}>
            {cellDContent}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={MultipleActionsStyles.bottomItem}>
          <Typography className={MultipleActionsStyles.label}>
            {cellETitle}
          </Typography>
          <Typography className={MultipleActionsStyles.text}>
            {cellEContent}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const MultipleActionsButtonsStyles = theme => ({
  button: {
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    },
    "&:nth-child(1)": {
      marginRight: `${theme.spacing.xs}px`
    }
  },
  smallButton: {
    width: "32px",
    minWidth: "32px",
    padding: 0,
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    },
    "&:nth-child(1)": {
      marginRight: `${theme.spacing.xs}px`
    }
  }
});

const MultipleActionsButtons = () => (
  <>
    <HvButton
      className={MultipleActionsButtonsStyles.smallButton}
      colorType="link"
    >
      View
    </HvButton>
    <HvButton className={MultipleActionsButtonsStyles.button} colorType="link">
      Share
    </HvButton>
  </>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      HeaderTitle={configurationNoMedia.title}
      Subheader={configurationNoMedia.subtitle}
      InnerCardContent={<MultipleActions />}
      Actions={<MultipleActionsButtons />}
      variant="none"
      checkboxValue="value"
      onSelect={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
