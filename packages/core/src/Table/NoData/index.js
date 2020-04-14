import React from "react";
import Fail from "@hv/uikit-react-icons/dist/Fail";
import HvEmptyState from "../../EmptyState";
import useStyles from "./styles";

// eslint-disable-next-line react/prop-types
const NoData = ({ noDataMessage = " No data to display." }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HvEmptyState message={noDataMessage} icon={<Fail />} />
    </div>
  );
};

export default NoData;
