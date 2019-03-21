import React from "react";
import HvCard from "@hv-ui/react/core/Card";
import FailureIcon from "@hv-ui/icons/core/S-icons/Level5Unsuccess16Color";
import IconInvalid from "@hv-ui/icons/core/S-icons/Level216Color";
import WarningIcon from "@hv-ui/icons/core/S-icons/Level416Color";
import Icon from "@hv-ui/icons/core/S-icons/Tool16";
import HvKpi from "@hv-ui/react/core/Kpi";
import Typography from "@material-ui/core/Typography";

const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
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
const Content = ({ value, icon }) => (
  <div>
    <HvKpi
      kpiTextConfiguration={ThroughputKpiTextConfiguration(value)}
      visualIndicator={icon}
    />
    <div>
      <Typography variant="body1" className={kpiStyles.label}>
        {data.firstTitle}
      </Typography>
      <Typography variant="body2" className={kpiStyles.text}>
        {data.firstContent}
      </Typography>
    </div>
    <div style={{ marginTop: "15px" }}>
      <Typography variant="body1" className={kpiStyles.label}>
        {data.secondTitle}
      </Typography>
      <Typography variant="body2" className={kpiStyles.text}>
        {data.secondContent}
      </Typography>
    </div>
  </div>
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
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="85" icon={<IconInvalid />} />}
          variant="info"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="45" icon={<WarningIcon />} />}
          variant="warning"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
      <div style={{ width: "280px" }}>
        <HvCard
          Icon={<Icon />}
          HeaderTitle="Replace contaminated oil"
          InnerCardContent={<Content value="19" icon={<FailureIcon />} />}
          variant="error"
          isSelectable
          checkboxValue="value"
          onSelect={event => console.log(`my value is ${event.target.value}`)}
        />
      </div>
    </div>
  </>
);
