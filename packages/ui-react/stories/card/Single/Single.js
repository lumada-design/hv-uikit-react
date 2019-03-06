import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const data = {
  firstTitle: "ID",
  firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
  secondTitle: "Last connected",
  secondContent: "Aug 30, 2017 12:27:53 PM"
};

const SingleContent = ({ classes }) => (
  <div>
    <div>
      <Typography variant="body1" className={classes.label}>{data.firstTitle}</Typography>
      <Typography variant="body2" className={classes.text}>{data.firstContent}</Typography>
    </div>
    <div style={{ marginTop: "15px" }}>
      <Typography variant="body1" className={classes.label}>{data.secondTitle}</Typography>
      <Typography variant="body2" className={classes.text}>{data.secondContent}</Typography>
    </div>
  </div>
);

SingleContent.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default SingleContent;
