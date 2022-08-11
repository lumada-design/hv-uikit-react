import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { HvLoading } from "@hitachivantara/uikit-react-core";
import { makeStyles, alpha, hexToRgb } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    transition: "background-Color .2s ease",
    zIndex: -1,
  },
  blur: {
    backgroundColor: alpha(hexToRgb(theme.hv.palette.atmosphere.atmo2), 0.8),
    zIndex: theme.zIndex.drawer,
  },
}));

const LoadingContainer = ({ children, hidden, ...others }) => {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        className={clsx(classes.overlay, { [classes.blur]: !hidden })}
      >
        <HvLoading classes={{ root: classes.loading }} hidden={hidden} {...others} />
      </div>
      <div style={{ display: "flow-root" }}>{children}</div>
    </>
  );
};

LoadingContainer.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
};

export default LoadingContainer;
