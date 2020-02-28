import React from "react";
import PropTypes from "prop-types";

const HvKnobRing = props => {
  const { classes } = props;

  return <div className={classes.knobRing} />;
};

HvKnobRing.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default HvKnobRing;
