import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HvTypography } from "@hitachivantara/uikit-react-core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Success, Level2Alt, Fail, Level4Alt, Level5Alt } from "@hitachivantara/uikit-react-icons";

import useStyles from "./styles";

const percentage = (value) => Math.round(value * 100);

const CustomTooltip = ({ data, customData }) => {
  const classes = useStyles();
  const metric = customData.metrics.find((m) => m.metric === data.title);

  const colorValue = metric.threshold.find(
    (ts, tsIndex) => metric.value >= ts.value || tsIndex === metric.threshold.length - 1
  );

  const iconSwitcher = (value) =>
    ({
      good: <Success color={["sema1"]} iconSize="S" />,
      average: <Level2Alt color={["sema3"]} />,
      poor: <Fail color={["sema12"]} />,
      bad: <Level4Alt color={["sema14"]} />,
      critical: <Level5Alt color={["sema6"]} />,
    }[value.toLowerCase()]);

  const thresholdSwitcher = (value, index, thresholds) => {
    const roundedValue = percentage(value);
    if (index === 0) return `> ${roundedValue}%`;
    if (index === thresholds.length - 1) return `< ${roundedValue}%`;

    const previousValue = percentage(thresholds[index - 1].value);
    return `${roundedValue}% - ${previousValue}%`;
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.container, classes.containerBorder)}>
        <div>
          <HvTypography variant="highlightText">{metric.metric}</HvTypography>
        </div>
      </div>
      <div className={clsx(classes.container, classes.containerBorder)}>
        <div className={clsx(classes.valuesContainer, classes.title)}>
          <HvTypography variant="highlightText" component="div">
            {colorValue.name}
          </HvTypography>
          <div className={classes.separator} />
          <div className={classes.thresholdContainer}>
            {iconSwitcher(colorValue.name)}
            <HvTypography>{`${percentage(metric.value)}%`}</HvTypography>
          </div>
        </div>
        <div className={classes.valuesContainer}>
          <HvTypography variant="highlightText" component="div">
            Total times
          </HvTypography>
          <div className={classes.separator} />
          <HvTypography component="div">{customData.totalTimes}</HvTypography>
        </div>
      </div>
      <div className={classes.container}>
        <HvTypography variant="highlightText" className={classes.title}>
          Thresholds
        </HvTypography>
        {metric?.threshold?.map((threshold, index) => (
          <div key={threshold.name} className={classes.valuesContainer}>
            <div className={classes.thresholdContainer}>
              {iconSwitcher(threshold.name)}
              <HvTypography variant="highlightText">{threshold.name}</HvTypography>
            </div>
            <div className={classes.separator} />
            <HvTypography component="div">
              {thresholdSwitcher(threshold.value, index, metric.threshold)}
            </HvTypography>
          </div>
        ))}
      </div>
    </div>
  );
};

CustomTooltip.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
  }),
  customData: PropTypes.shape({
    metrics: PropTypes.array,
    totalTimes: PropTypes.number,
  }),
};

export default CustomTooltip;
