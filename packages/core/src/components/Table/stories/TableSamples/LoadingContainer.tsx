import { hexToRgbA, HvLoading } from "@core/index";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import { useTheme } from "@core/hooks";

const styles = {
  loading: css({
    width: "100%",
    height: "100%",
  }),
  overlay: css({
    position: "absolute",
    transition: "background-Color .2s ease",
    zIndex: -1,
  }),
  blur: css({
    backgroundColor: hexToRgbA("#EEEEEE"),
    zIndex: theme.zIndices.popover,
  }),
};

const LoadingContainer = ({ children, loading, ...others }) => {
  const ref = useRef(null);
  const [overlayPosition, setOverlayPosition] = useState({});
  const { activeTheme, selectedMode } = useTheme();

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
  }, [children]);

  return (
    <>
      <div
        style={{
          ...overlayPosition,
          backgroundColor: hexToRgbA(
            activeTheme?.colors.modes[selectedMode].atmo2
          ),
        }}
        className={clsx(styles.overlay, loading && styles.blur)}
      >
        <HvLoading
          classes={{ root: styles.loading }}
          hidden={!loading}
          {...others}
        />
      </div>
      <div ref={ref}>{children}</div>
    </>
  );
};

export default LoadingContainer;
