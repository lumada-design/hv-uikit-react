import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { HvBaseProps } from "@core/types/generic";

import { StyledDiv } from "./Panel.styles";
import panelClasses, { HvPanelClasses } from "./panelClasses";

export interface HvPanelProps extends HvBaseProps {
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvPanelClasses;
}

/**
 * A panel is a container used in a variety of patterns (e.g. dropdown, filter group, details section).
 * It can be horizontal or vertical and its size is defined by its content and how it relates to surrounding patterns.
 * Regardless of its content, a panel look and feel should be consistent.
 */
export const HvPanel = (props: HvPanelProps) => {
  const { id, className, classes, children, ...others } = useDefaultProps(
    "HvPanel",
    props
  );

  return (
    <StyledDiv
      id={id}
      className={clsx(className, panelClasses.root, classes?.root)}
      {...others}
    >
      {children}
    </StyledDiv>
  );
};
