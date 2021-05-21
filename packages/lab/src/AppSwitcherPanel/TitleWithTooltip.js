import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { HvTooltip, HvTypography } from "@hv/uikit-react-core";

const TitleWithTooltip = ({ className, title }) => {
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
      title={<HvTypography>{title}</HvTypography>}
    >
      <HvTypography variant="highlightText" component="span" ref={textRef} className={className}>
        {title}
      </HvTypography>
    </HvTooltip>
  );
};

TitleWithTooltip.propTypes = {
  /**
   * Class names to be applied to the root element.
   */
  className: PropTypes.string,
  /**
   * Title to be displayed.
   */
  title: PropTypes.string,
};

export default TitleWithTooltip;
