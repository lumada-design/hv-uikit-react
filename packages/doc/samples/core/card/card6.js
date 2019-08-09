import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import Icon from "@hv/uikit-react-icons/dist/DawnTheme/Tool.S";
import Level1Sema2S from "@hv/uikit-react-icons/dist/DawnTheme/Level1.sema2.S";
import Level2Sema3S from "@hv/uikit-react-icons/dist/DawnTheme/Level2.sema3.S";
import Level3Sema4S from "@hv/uikit-react-icons/dist/DawnTheme/Level3.sema4.S";
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
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="85" icon={<Level1Sema2S />} />
          }
          semantic="sema2"
          isSelectable
          checkboxValue="value"
          onChange={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="45" icon={<Level2Sema3S />} />
          }
          semantic="sema3"
          isSelectable
          checkboxValue="value"
          onChange={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          icon={<Icon />}
          headerTitle="Replace contaminated oil"
          innerCardContent={
            <ContentWithStyles value="19" icon={<Level3Sema4S />} />
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
