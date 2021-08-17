import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
// eslint-disable-next-line import/no-extraneous-dependencies
import useResizeAware from "react-resize-aware";

import { makeStyles } from "@material-ui/core";
import { hexToRgbA, HvLoading } from "@hv/uikit-react-core";

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
    backgroundColor: hexToRgbA(theme.hv.palette.atmosphere.atmo2),
    zIndex: theme.zIndex.drawer,
  },
}));

// eslint-disable-next-line react/prop-types
const LoadingContainer = ({ children, loading, ...others }) => {
  const ref = useRef(null);
  const classes = useStyles();
  const [resizeListener, sizes] = useResizeAware();
  const [overlayPosition, setOverlayPosition] = useState({});

  useEffect(() => {
    if (children && ref.current) {
      const { clientHeight, clientWidth, offsetTop, offsetLeft } = ref.current;
      setOverlayPosition({
        top: offsetTop,
        left: offsetLeft,
        height: clientHeight,
        width: clientWidth,
      });
    }
  }, [children, sizes.width, sizes.height]);

  return (
    <>
      <div
        style={{ ...overlayPosition }}
        className={clsx(classes.overlay, { [classes.blur]: loading })}
      >
        <HvLoading classes={{ root: classes.loading }} hidden={!loading} {...others} />
      </div>
      {resizeListener}
      <div ref={ref}>{children}</div>
    </>
  );
};

export default LoadingContainer;
