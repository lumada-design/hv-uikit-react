/* eslint-disable */
import React from "react";
import { withStyles } from "@material-ui/core";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";
import HvEmptyState from "../../EmptyState";
import styles from "./styles";

const NoData = ({ classes, noDataMessage = " No data to display." }) => (
  <div className={classes.root}>
    <HvEmptyState message={noDataMessage} icon={<Fail />} />
  </div>
);

export default withStyles(styles, { name: "HvTableNoData" })(NoData);
