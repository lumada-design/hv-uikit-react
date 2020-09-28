/* eslint-disable react/prop-types */
import withStyles from "@material-ui/core/styles/withStyles";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { HvTooltip, HvTypography } from "../..";
import { styles } from "../styles";

const Index = ({ classes, data }) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    if (textRef?.current) {
      setIsOverflowed(
        textRef.current.scrollWidth > textRef.current.clientWidth ||
          textRef.current.scrollHeight > textRef.current.clientHeight
      );
    }
  }, []);

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
