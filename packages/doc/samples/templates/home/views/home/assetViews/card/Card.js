import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@hv/uikit-react-core/dist/Grid";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Kpi from "@hv/uikit-react-core/dist/Kpi";
import Card from "@hv/uikit-react-core/dist/Card";
import { Level1, Level2Average, Level3Bad, Level4, Level5 } from "@hv/uikit-react-icons/dist";
import styles from "./styles";

const KpiProbability = score => ({
  title: "Probability",
  indicator: `${score}%`
});

const KpiTimeHorizon = score => ({
  title: "Time horizon",
  indicator: `${score}h`
});

/* eslint react/prop-types: 0 */
const Content = ({ classes, values }) => (
  <>
    <Grid container className={classes.container}>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <Typography className={classes.timestamp} variant="sText">
            {values.event.timestamp}
          </Typography>
          <Typography variant="sText">{values.event.schedule}</Typography>
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <Kpi labels={KpiProbability(values.probability)} />
          <Kpi labels={KpiTimeHorizon(values.timeHorizon)} />
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
        <Typography variant="labelText">Related assets</Typography>
        <Typography variant="normalText" className={classes.text}>
          {values.relatedAssets}
        </Typography>
      </Grid>
    </Grid>
  </>
);

const ContentWithStyles = withStyles(styles)(Content);

/**
 * Render passed to the CardView.
 *
 * @param data
 * @param viewConfiguration
 * @returns {*}
 */
const cardRenderer = (data, viewConfiguration) => {
  const status = {};
  const { probability } = data;

  switch (true) {
    default:
    case probability < 20:
      status.Icon = <Level1 semantic="sema10" />;
      status.sema = "sema10";
      break;
    case probability < 40:
      status.Icon = <Level2Average semantic="sema11" />;
      status.sema = "sema11";
      break;
    case probability < 60:
      status.Icon = <Level3Bad semantic="sema12" />;
      status.sema = "sema12";
      break;
    case probability < 80:
      status.Icon = <Level4 semantic="sema13" />;
      status.sema = "sema13";
      break;
    case probability <= 100:
      status.Icon = <Level5 semantic="sema14" />;
      status.sema = "sema14";
      break;
  }

  return (
    <Card
      icon={status.Icon}
      headerTitle={data.headerTitle}
      innerCardContent={<ContentWithStyles values={data} icon={status.Icon} />}
      semantic={status.sema}
      checkboxValue={data.id}
      isSelectable={viewConfiguration.isSelectable}
      onChange={viewConfiguration.onSelection}
      actions={viewConfiguration.actions}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
      actionsCallback={viewConfiguration.actionsCallback}
    />
  );
};

export default cardRenderer;
