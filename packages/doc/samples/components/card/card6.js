import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/Generic/Tool";
import Level1 from "@hv/uikit-react-icons/dist/Generic/Level1";
import Level2 from "@hv/uikit-react-icons/dist/Generic/Level2.Average";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
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
        kpiTextConfiguration={ThroughputKpiTextConfiguration(value)}
        visualIndicator={icon}
      />
    </Grid>
    <Grid container>
      <Grid item xs={12} className={classes.item}>
        <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {data.firstContent}
        </HvTypography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={12}>
        <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {data.secondContent}
        </HvTypography>
      </Grid>
    </Grid>
  </>
);

const ContentWithStyles = withStyles(kpiStyles, {
  withTheme: true
})(Content);

const iconStyles = {
  paddingTop: "7px",
  width: "30px",
  height: "30px"
};

const StyledIcon = () => (
  <Icon boxStyles={iconStyles} style={{ display: "block", margin: "auto" }} />
);

const levelStyles = {
  width: "30px"
};

const StyledLevel1 = () => (
  <Level1
    boxStyles={levelStyles}
    semantic="sema2"
    style={{ display: "block", margin: "auto" }}
  />
);

const StyledLevel2 = () => (
  <Level2
    boxStyles={levelStyles}
    semantic="sema3"
    style={{ display: "block", margin: "auto" }}
  />
);

const StyledLevel3 = () => (
  <Level3
    boxStyles={levelStyles}
    semantic="sema4"
    style={{ display: "block", margin: "auto" }}
  />
);

export default (
  <>
    <div
      style={{
        display: "flex",
        width: "1000px",
        justifyContent: "space-evenly"
      }}
    >
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<StyledIcon />}
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
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<StyledIcon />}
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
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<StyledIcon />}
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
      </div>
    </div>
  </>
);
