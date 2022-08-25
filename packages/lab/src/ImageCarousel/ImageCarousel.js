import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  setId,
  useUniqueId,
  HvButton,
  HvContainer,
  HvTypography,
  HvGrid,
  HvStack,
  HvPanel,
  useScrollTo,
} from "@hitachivantara/uikit-react-core";

import { Button, Fade } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";

import { Backwards, Forwards, Close, Fullscreen } from "@hitachivantara/uikit-react-icons";

import styles from "./styles";
/**
 * ImageCarousel description/documentation paragraph
 */
const HvImageCarousel = (props) => {
  const {
    className,
    classes,
    documents,
    title,
    id,
    fullscreen: fullscreenProp = false,
    thumbnails = false,
    lowCardinality = false,
    infiniteCarousel = false,
    xs = false,
    onChange,
    counter = false,
    currentStep = 0,
    setCurrentStep,
    visibleArrows = false,
    variant = "contain",
    ...others
  } = props;
  const elementId = useUniqueId(id, "hvcarousel");
  const [fullscreen, setFullscreen] = useState(false);
  const options = documents.map((element) => ({
    src: element.src,
    value: setId(elementId, element.value),
  }));

  const [sliceStart, setSliceStart] = useState(0);
  const [selImage, setImage] = useState(currentStep);
  const [offset, setOffset] = useState(0);
  const [imageHover, setImageHover] = useState(false);
  let direction = "next";
  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
    imageBox: {
      minWidth: "100%",
      display: "flex",
      justifyContent: "center",
    },
    allImages: {
      width: "max-content",
      display: "flex",
    },
  }));
  const style = useStyles();

  const [selectedIndex, setScrollTo] = useScrollTo(
    0,
    setId(elementId, "panel"),
    false,
    100,
    documents,
    onChange,
    "row"
  );
  const [selectedBigIndex, setBigScrollTo] = useScrollTo(
    0,
    setId(elementId, "bigPanel"),
    false,
    0,
    options,
    onChange,
    "row"
  );
  const refBackwards = useRef(null);
  const refForwards = useRef(null);
  let typeCircle = "circle";

  const handleSelection = useCallback(
    (event, value, index) => {
      const wrappedOnChange = () => {
        onChange?.(event, index);
      };
      setScrollTo(event, value, index, wrappedOnChange);
    },
    [onChange, setScrollTo]
  );

  const handleFocus = (focus) => {
    if (focus === refBackwards.current || focus === refForwards.current) focus.focus();
  };

  const handleBigSelection = useCallback(
    (event, value, index) => {
      const wrappedOnChange = () => {
        onChange?.(event, index);
      };
      setBigScrollTo(event, value, index, wrappedOnChange);
    },
    [onChange, setBigScrollTo]
  );

  const handleVisibility = useCallback(
    (event, value, index) => {
      const image = document.getElementById(value);
      const panel = document.getElementById(setId(elementId, "panel"));
      const container = document.getElementById(setId(elementId, "container"));
      const containerWidth = container.offsetWidth;
      const offsetPanel = panel.offsetLeft;
      const offsetImage = image.offsetLeft;
      const imageWidth = image.offsetWidth;
      const scroll = panel.scrollLeft;
      const focus = document.activeElement;

      if (
        offsetPanel + offsetImage + offset + imageWidth - scroll > containerWidth ||
        offsetImage - scroll < 0
      ) {
        handleSelection(event, value, index);
        handleFocus(focus);
      }
    },
    [elementId, handleSelection, offset]
  );

  useEffect(() => {
    setCurrentStep?.(selImage);
  }, [selImage, setCurrentStep]);

  useEffect(() => {
    if (fullscreen) setOffset(150);
    else setOffset(0);

    if (thumbnails) {
      handleVisibility(undefined, documents[selImage].value, selImage, selectedIndex);
    }
    handleBigSelection(undefined, options[selImage].value, selImage, selectedBigIndex);
  }, [
    documents,
    fullscreen,
    handleBigSelection,
    handleVisibility,
    options,
    selImage,
    selectedBigIndex,
    selectedIndex,
    thumbnails,
  ]);

  const changeSlice = () => {
    if (direction === "next") {
      if (infiniteCarousel && selImage === documents.length - 1) setSliceStart(0);
      else if (selImage > sliceStart + 2 && selImage !== documents.length - 2)
        setSliceStart(sliceStart + 1);
    }
    if (direction === "prev") {
      if (infiniteCarousel && selImage === 0)
        setSliceStart(documents.length > 5 ? documents.length - 5 : 0);
      else if (selImage < sliceStart + 2 && selImage !== 1) setSliceStart(sliceStart - 1);
    }
  };

  const nextImage = () => {
    let next;
    if (selImage !== documents.length - 1) next = selImage + 1;
    else if (infiniteCarousel) next = 0;
    setImage(next);
    if (xs) {
      direction = "next";
      changeSlice();
    }
  };

  const previousImage = () => {
    let previous;
    if (selImage !== 0) previous = selImage - 1;
    else if (infiniteCarousel) previous = documents.length - 1;
    setImage(previous);
    if (xs) {
      direction = "prev";
      changeSlice();
    }
  };

  const styleThumbnail = (index) => {
    if (index !== selImage) return classes.img;
    return classes.thumbnailSelected;
  };

  const circleType = (index) => {
    if (index === selImage) {
      typeCircle = "BigCircle";
      if (xs) return classes.xsSelectedCircle;
      return classes.selectedCircle;
    }
    typeCircle = "Circle";
    return classes.miniCircle;
  };

  return (
    <HvContainer
      id={setId(elementId, "container")}
      className={clsx(
        className,
        classes.root,
        fullscreen ? classes.fullscreenStyle : "",
        xs ? "xs" : "nxs"
      )}
      {...others}
    >
      {!xs && (
        <div className={classes.title}>
          <div>{title}</div>
          {fullscreenProp && (
            <div>
              {fullscreen ? (
                <HvButton
                  className={classes.closeButton}
                  icon
                  aria-label="Close"
                  onClick={() => setFullscreen(!fullscreen)}
                >
                  <Close />
                </HvButton>
              ) : (
                <HvButton icon aria-label="Fullscreen" onClick={() => setFullscreen(true)}>
                  <Fullscreen />
                </HvButton>
              )}
            </div>
          )}
        </div>
      )}
      <HvContainer
        className={clsx(
          classes.imageContainer,
          !xs ? "nxs" : "",
          fullscreen ? "fullscreen" : "notFullscreen"
        )}
        onFocus={() => setImageHover(true)}
        onMouseOver={() => setImageHover(true)}
        onBlur={() => setImageHover(false)}
        onMouseOut={() => setImageHover(false)}
      >
        <HvPanel
          className={clsx(classes.stack, xs ? "xs" : "nxs")}
          id={setId(elementId, "bigPanel")}
        >
          {options.map((element, index) => (
            <div className={style.imageBox} id={element.value} key={`div ${element.value}`}>
              <Fade in={selImage === index || xs} timeout={{ appear: 500, enter: 1200, exit: 200 }}>
                <img
                  className={clsx(
                    classes.selectedImage,
                    xs ? "xs" : "nxs",
                    fullscreen ? "fullscreen" : "notFullscreen",
                    variant
                  )}
                  src={element.src}
                  alt={element.value}
                  key={`image ${element.value}`}
                />
              </Fade>
            </div>
          ))}
        </HvPanel>
        {(xs || lowCardinality) && (
          <div className={clsx(classes.lowButtons, !xs ? "nxs" : "")}>
            <div>
              <Fade in={imageHover || visibleArrows}>
                <HvButton
                  ref={refBackwards}
                  className={classes.button}
                  icon
                  aria-label="Backwards"
                  onClick={(event) => previousImage(event)}
                >
                  <Backwards />
                </HvButton>
              </Fade>
            </div>
            <div>
              <Fade in={imageHover || visibleArrows}>
                <HvButton
                  ref={refForwards}
                  className={classes.button}
                  icon
                  aria-label="Forwards"
                  onClick={(event) => nextImage(event)}
                >
                  <Forwards />
                </HvButton>
              </Fade>
            </div>
          </div>
        )}
        {xs && (
          <div className={classes.xsCircles}>
            {documents
              .map((element, index) => (
                <span
                  className={circleType(index)}
                  title={typeCircle}
                  key={`Circle ${element.value}`}
                />
              ))
              .slice(sliceStart, sliceStart + 5)}
          </div>
        )}
        {counter && (
          <div className={clsx(classes.divCounter, !xs ? "nxs" : "")}>
            <span className={classes.counter}>
              <HvTypography variant="normalText" style={{ color: "white" }}>
                {`${selImage + 1}/${documents.length}`}
              </HvTypography>
            </span>
          </div>
        )}
      </HvContainer>
      {!xs && (
        <>
          {lowCardinality ? (
            <div className={classes.circles}>
              {documents.map((element, index) => (
                <span
                  className={circleType(index)}
                  title={`${typeCircle} ${index}`}
                  key={`Circle ${element.value}`}
                />
              ))}
            </div>
          ) : (
            <HvGrid
              className={clsx(classes.normalButtons)}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <HvGrid item>
                <HvButton
                  className={infiniteCarousel || selImage !== 0 ? "" : classes.hidden}
                  ref={refBackwards}
                  icon
                  aria-label="Backwards"
                  onClick={(event) => previousImage(event)}
                >
                  <Backwards />
                </HvButton>
              </HvGrid>
              <HvGrid item>
                <HvTypography variant="highlightText" component="a">
                  {selImage + 1}
                </HvTypography>
                <HvTypography variant="normalText" component="a">
                  {` /  ${documents.length}`}
                </HvTypography>
              </HvGrid>
              <HvGrid item>
                <HvButton
                  className={
                    infiniteCarousel || selImage !== documents.length - 1 ? "" : classes.hidden
                  }
                  ref={refForwards}
                  icon
                  aria-label="Forwards"
                  onClick={(event) => nextImage(event)}
                >
                  <Forwards />
                </HvButton>
              </HvGrid>
            </HvGrid>
          )}
          {thumbnails && (
            <HvPanel className={classes.panel} id={setId(elementId, "panel")}>
              <HvStack key="Thumbnails" direction="row" spacing="xs" withNavigation>
                {documents.map((element, i) => (
                  <Button
                    id={element.value}
                    key={`Button ${element.value}`}
                    className={classes.thumbnailButton}
                    onClick={() => setImage(i)}
                  >
                    <img
                      className={styleThumbnail(i)}
                      src={element.src}
                      alt={element.value}
                      key={`Thumbnail ${element.value}`}
                    />
                  </Button>
                ))}
              </HvStack>
            </HvPanel>
          )}
        </>
      )}
    </HvContainer>
  );
};

HvImageCarousel.propTypes = {
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
     * Styles applied to the component SelectedImage.
     */
    selectedImage: PropTypes.string,
    /**
     * Styles applied to xs mode
     */
    xsMode: PropTypes.string,
    /**
     * Styles applied to image in xsMode
     */
    xsImage: PropTypes.string,
    /**
     * Styles applied to panel with low cardinality circles
     */
    circles: PropTypes.string,
    /**
     * Styles applied to xs mode circles
     */
    xsCircles: PropTypes.string,
    /**
     * Styles applied to unavailable button
     */
    hidden: PropTypes.string,
    /**
     * Styles applied to the carousel title
     */
    title: PropTypes.string,
    /**
     * Styles applied to the counter
     */
    counter: PropTypes.string,
    /**
     * Styles applied to the div with the counter
     */
    divCounter: PropTypes.string,
    /**
     * Styles applied to the thumbnails
     */
    img: PropTypes.string,
    /**
     * Styles applied to the selected thumbnail
     */
    thumbnailSelected: PropTypes.string,
    /**
     * Styles applied to the thumbnail button
     */
    thumbnailButton: PropTypes.string,
    /**
     * Styles applied to the low cardinality circles
     */
    miniCircle: PropTypes.string,
    /**
     * Styles applied to the circle of the selected image
     */
    selectedCircle: PropTypes.string,
    /**
     * Styles applied to the circle of the selected image in xsmode
     */
    xsSelectedCircle: PropTypes.string,
    /**
     * Styles applied to the panel with low cardinality buttons
     */
    lowButtons: PropTypes.string,
    /**
     * Styles applied to the container of the selected image
     */
    imageContainer: PropTypes.string,
    /**
     * Styles applied to the panel with the thumbnails
     */
    stack: PropTypes.string,
    /**
     * Styles applied to the panel that contains the buttons and counter in default mode
     */
    normalButtons: PropTypes.string,
    /**
     * Styles applied to fullscreen mode.
     */
    fullscreenStyle: PropTypes.string,
    /**
     * Styles applied to close button in fullscreen mode.
     */
    closeButton: PropTypes.string,
    /**
     * Styles applied to change image buttons.
     */
    button: PropTypes.string,
    /**
     * Styles applied to thumbnails panel.
     */
    panel: PropTypes.string,
  }).isRequired,
  /**
   * Documents to be displayed.
   */
  documents: PropTypes.array.isRequired,
  /**
   * Title of the image carousel
   */
  title: PropTypes.node,
  /**
   * A function called each time the selected image changes.
   */
  onChange: PropTypes.func,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A flag that activates the thumbnails.
   */
  thumbnails: PropTypes.bool,
  /**
   * A flag that switches to low cardinality mode
   */
  lowCardinality: PropTypes.bool,
  /**
   * A flag that activates the infinite carousel behavior
   */
  infiniteCarousel: PropTypes.bool,
  /**
   * A flag that activates a counter on the top right corner of the selected image
   */
  counter: PropTypes.bool,
  /**
   * Set Image Carousel to fullscreen mode
   */
  fullscreen: PropTypes.bool,
  /**
   * Set selected image to a particular image in documents
   */
  currentStep: PropTypes.number,
  /**
   * Function that changes the selected image
   */
  setCurrentStep: PropTypes.func,
  /**
   * Image Carousel set to xs mode
   */
  xs: PropTypes.bool,
  /**
   * Arrows always displayed in low cardinality or xs mode
   */
  visibleArrows: PropTypes.bool,
  /**
   * Selected image fit variant
   */
  variant: PropTypes.string,
};

export default withStyles(styles, { name: "HvImageCarousel" })(HvImageCarousel);
