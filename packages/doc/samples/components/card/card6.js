import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Generic/Tool";
import Level1 from "@hv/uikit-react-icons/dist/Generic/Level1";
import Level2 from "@hv/uikit-react-icons/dist/Generic/Level2.Average";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import Grid from "@hv/uikit-react-core/dist/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  }
});

const data = {
  firstTitle: "Related assets",
  firstContent: "Primary asset to be worked on, other asset, other asset",
  secondTitle: "Description",
  secondContent:
    "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary."
};

const ThroughputKpiTextConfiguration = score => ({
  title: "Confidence score",
  indicator: `${score}%`
});

/* eslint react/prop-types: 0 */
const Content = ({ classes, value, icon }) => (
  <>
    <Grid container>
      <HvKpi
        labels={ThroughputKpiTextConfiguration(value)}
        visualIndicator={icon}
      />
    </Grid>
    <Grid container>
      <Grid item className={classes.item} xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        <HvTypography variant="normalText">{data.firstContent}</HvTypography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        <HvTypography variant="normalText">{data.secondContent}</HvTypography>
      </Grid>
    </Grid>
  </>
);

const ContentWithStyles = withStyles(kpiStyles, {
  withTheme: true
})(Content);

const levelStyles = {
  width: "30px"
};

const StyledLevel1 = () => <Level1 boxStyles={levelStyles} semantic="sema2" />;

const StyledLevel2 = () => <Level2 boxStyles={levelStyles} semantic="sema3" />;

const StyledLevel3 = () => <Level3 boxStyles={levelStyles} semantic="sema4" />;

export default (
  <Grid container>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Icon />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles
            value="85"
            icon={<StyledLevel1 semantic="sema2" iconSize="S" />}
          />
        }
        semantic="sema2"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Icon />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles
            value="45"
            icon={<StyledLevel2 semantic="sema3" iconSize="S" />}
          />
        }
        semantic="sema3"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
    <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
      <HvCard
        icon={<Icon />}
        headerTitle="Replace contaminated oil"
        innerCardContent={
          <ContentWithStyles
            value="19"
            icon={<StyledLevel3 semantic="sema4" iconSize="S" />}
          />
        }
        semantic="sema4"
        isSelectable
        checkboxValue="value"
        onChange={event => console.log(`my value is ${event.target.value}`)}
      />
    </Grid>
  </Grid>
);
