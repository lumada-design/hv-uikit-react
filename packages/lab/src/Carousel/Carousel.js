import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { HvButton, HvTypography } from "@hv/uikit-react-core";
import { Backwards, Forwards } from "@hv/uikit-react-icons";

import { withStyles, Box } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import styles from "./styles";

/**
 * The Carousel component. It supports showing images and videos.
 */
const HvCarousel = (props) => {
  const { className, classes, value, ...others } = props;

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = value.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={clsx(className, classes.root)} {...others}>
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {value.map((item) => (
          <Box className={classes.step}>
            {item.type === "image" && <img src={item.url} alt={item.name} {...item.props} />}
            {item.type === "video" && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video title={item.name} controls {...item.props}>
                <source src={item.url} />
              </video>
            )}
          </Box>
        ))}
      </SwipeableViews>
      <div className={classes.stepper}>
        <HvButton icon size="small" onClick={handleBack} disabled={activeStep === 0}>
          <Backwards />
        </HvButton>
        <HvTypography className={classes.stepperCount}>
          {`${activeStep + 1} / ${maxSteps}`}
        </HvTypography>
        <HvButton icon size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
          <Forwards />
        </HvButton>
      </div>
    </div>
  );
};

HvCarousel.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the step component.
     */
    step: PropTypes.string,
    /**
     * Styles applied to the stepper component.
     */
    stepper: PropTypes.string,
    /**
     * Styles applied to the stepper count component.
     */
    stepperCount: PropTypes.string,
  }).isRequired,
  /**
   * The array of images/videos to show.
   */
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      props: PropTypes.object,
    })
  ).isRequired,
};

export default withStyles(styles, { name: "HvCarousel" })(HvCarousel);
