/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import Typography from "../../../Typography";

/**
 * Tooltip for the cases with a single group.
 *
 * @param classes
 * @param title
 * @param value
 * @returns {*}
 * @constructor
 */
const SingleTooltip = ({ classes, title, value }) => (
  <div className={classes.root}>
    <div>
      <Typography variant="labelText">{title}</Typography>
    </div>
    <div className={classes.separator} />
    <div>
      <Typography variant="sText">{value}</Typography>
    </div>
  </div>
);

SingleTooltip.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root class.
     */
    rootTooltip: PropTypes.string,
    /**
     * Styles applied to the separator between title and value.
     */
    separator: PropTypes.string
  }).isRequired,
  /**
   * Title of the chart.
   */
  title: PropTypes.string.isRequired,
  /**
   * Value of the chart.
   */
  value: PropTypes.number.isRequired
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title && prevProps.value === nextProps.value;

export default withStyles(styles, { name: "HvChartSingleTooltip" })(
  memo(SingleTooltip, arePropsEqual)
);
