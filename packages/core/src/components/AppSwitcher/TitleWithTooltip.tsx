import { useMemo, useRef } from "react";

import { HvTooltip } from "@core/components/Tooltip";
import { HvTypography } from "@core/components/Typography";

const TitleWithTooltip = ({ className, title }) => {
  const textRef = useRef<HTMLDivElement>(null);

  const isOverflowed = useMemo(() => {
    const el = textRef.current;
    if (!el) return false;

    return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
  }, []);

  return (
    <HvTooltip
      disableHoverListener={!isOverflowed}
      placement="top-start"
      title={<HvTypography>{title}</HvTypography>}
    >
      <HvTypography
        className={className}
        variant="label"
        component="span"
        ref={textRef}
      >
        {title}
      </HvTypography>
    </HvTooltip>
  );
};

export default TitleWithTooltip;
