import { useMemo, useRef } from "react";
import { HvTooltip, HvTypography } from "@core/components";
import { StyledTitleWithTooltip } from "./AppSwitcher.styles";

const TitleWithTooltip = ({ className, title, type }) => {
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
      <StyledTitleWithTooltip
        variant="label"
        component="span"
        ref={textRef}
        className={className}
        $type={type}
      >
        {title}
      </StyledTitleWithTooltip>
    </HvTooltip>
  );
};

export default TitleWithTooltip;
