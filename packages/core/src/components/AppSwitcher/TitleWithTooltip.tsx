import { useEffect, useRef, useState } from "react";
import { HvTooltip, HvTypography } from "~/components";
import { StyledTitleWithTooltip } from "./AppSwitcher.styles";

const TitleWithTooltip = ({ className, title, type }) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

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
