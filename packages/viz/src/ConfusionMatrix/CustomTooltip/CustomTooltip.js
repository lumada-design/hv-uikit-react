import React from "react";
import PropTypes from "prop-types";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import useStyles from "./styles";

const CustomTooltip = ({ data, deltaMatrix }) => {
  const classes = useStyles();
  const [element] = data.elements;
  const value = deltaMatrix && data.title !== element.value ? 0 - element.zValue : element.zValue;
  const oneLiner = `${data.title} - ${element.value}: ${value}`;
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <HvTypography>{oneLiner}</HvTypography>
        </div>
      </div>
    </div>
  );
};

CustomTooltip.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    elements: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        zValue: PropTypes.number,
      })
    ),
  }),
  deltaMatrix: PropTypes.bool,
};

export default CustomTooltip;
