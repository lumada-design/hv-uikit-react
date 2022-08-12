/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";

import { withStyles } from "@mui/styles";

import { useResizeDetector } from "react-resize-detector";

import { HvTooltip, HvTypography } from "@hitachivantara/uikit-react-core";
import { styles } from "../styles";

const Index = ({ classes, data }) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef();

  const onResize = useCallback(() => {
    setIsOverflowed(
      textRef.current != null &&
        (textRef.current.scrollWidth > textRef.current.clientWidth ||
          textRef.current.scrollHeight > textRef.current.clientHeight)
    );
  }, []);

  useResizeDetector({ onResize, targetRef: textRef });

  return (
    <HvTooltip
      disableHoverListener={!isOverflowed}
      placement="top-start"
      title={<HvTypography>{data}</HvTypography>}
    >
      <div ref={textRef} className={clsx(classes.tooltipAnchor, classes.textContainer)}>
        {data}
      </div>
    </HvTooltip>
  );
};
export default withStyles(styles, {
  name: "OverflowTooltip",
})(React.memo(Index));
