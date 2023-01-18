import clsx from "clsx";
import { HvBaseProps } from "../../types";
import { StyledDiv } from "./Panel.styles";

/**
 * A panel is a container used in a variety of patterns (e.g. dropdown, filter group, details section).
 * It can be horizontal or vertical and its size is defined by its content and how it relates to surrounding patterns.
 * Regardless of its content, a panel look and feel should be consistent.
 */
export const HvPanel = (props: PanelProps) => {
  const { id, className, classes, children, ...others } = props;

  return (
    <StyledDiv id={id} className={clsx(className, classes?.root)} {...others}>
      {children}
    </StyledDiv>
  );
};

export type PanelProps = HvBaseProps & {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: {
    /**
     * Styles applied to the component root class.
     */
    root?: string;
  };
};
