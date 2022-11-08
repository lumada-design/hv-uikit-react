import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

const styles = {
  root: {
    display: "flex",
    "& svg": {
      margin: "auto",
    },
  },
  xs: {
    width: 32,
    height: 32,
  },
  s: {
    width: 32,
    height: 32,
  },
  m: {
    width: 48,
    height: 48,
  },
  l: {
    width: 112,
    height: 112,
  },
};

const useStyles = makeStyles(styles, { name: "HvIconBase" });

const HvIconBase = ({ className, children, iconSize, ...others }) => {
  const classes = useStyles();
  const sizeClass = classes[iconSize?.toLowerCase()] || classes.s;

  return (
    <div className={clsx(className, classes.root, sizeClass)} {...others}>
      {children}
    </div>
  );
};

HvIconBase.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root component.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the root component, when it is extra small.
     */
    xs: PropTypes.string,
    /**
     * Styles applied to the root component, when it is small.
     */
    s: PropTypes.string,
    /**
     * Styles applied to the root component, when it is medium.
     */
    m: PropTypes.string,
    /**
     * Styles applied to the root component, when it is large.
     */
    l: PropTypes.string,
  }),
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A String or Array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   * You can use either an HEX or color name from the palette.
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * A string that will override the viewbox of the svg
   */
  viewbox: PropTypes.string,
  /**
   * A string that will override the height of the svg
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * A string that will override the width of the svg
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Sets one of the standard sizes of the icons
   */
  iconSize: PropTypes.oneOf(["XS", "S", "M", "L"]),
  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic: PropTypes.oneOf([
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9",
    "sema10",
    "sema11",
    "sema12",
    "sema13",
    "sema14",
    "sema15",
    "sema16",
    "sema17",
    "sema18",
    "sema19",
  ]),
  /**
   * Inverts the background-foreground on semantic icons
   */
  inverted: PropTypes.bool,
  /**
   * * Props passed down to the svg element..
   */
  svgProps: PropTypes.instanceOf(Object),
  /**
   * Node to be rendered.
   */
  children: PropTypes.node,
};

export default HvIconBase;
