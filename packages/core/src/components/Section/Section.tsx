import { forwardRef } from "react";
import { Down, Up } from "@hitachivantara/uikit-react-icons";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { HvButton, HvButtonProps } from "@core/components/Button";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { useControlled } from "@core/hooks/useControlled";
import { useUniqueId } from "@core/hooks/useUniqueId";
import { setId } from "@core/utils/setId";

import { staticClasses, useClasses } from "./Section.styles";

export { staticClasses as sectionClasses };

export type HvSectionClasses = ExtractNames<typeof useClasses>;

export interface HvSectionProps
  extends Omit<HvBaseProps<HTMLDivElement>, "title"> {
  /** The title of the section */
  title?: React.ReactNode;
  /** Whether or not the section is expandable.  */
  expandable?: boolean;
  /** Whether the section is open or not, if this property is defined the accordion must be fully controlled. */
  expanded?: boolean;
  /** When uncontrolled, defines the initial expanded state. */
  defaultExpanded?: boolean;
  /** Section actions */
  actions?: React.ReactNode;
  /** Section onExpand callback */
  onToggle?: (
    event: React.MouseEventHandler<HTMLButtonElement>,
    open: boolean
  ) => void;
  /** Props to be passed to the expand button */
  expandButtonProps?: HvButtonProps;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvSectionClasses;
}

/**
 * Sections allow grouping information on a page under the same topic.
 */
export const HvSection = forwardRef<HTMLDivElement, HvSectionProps>(
  (props, ref) => {
    const {
      id,
      classes: classesProp,
      className,
      title,
      expandable,
      expanded,
      defaultExpanded = true,
      actions,
      onToggle,
      expandButtonProps,
      children,
      ...others
    } = useDefaultProps("HvSection", props);

    const { classes, cx } = useClasses(classesProp);

    const [isOpen, setIsOpen] = useControlled(
      expanded,
      Boolean(defaultExpanded)
    );

    const elementId = useUniqueId(id, "hvSection");
    const contentId = setId(elementId, "content");

    const showContent = expandable ? !!isOpen : true;

    return (
      <div
        ref={ref}
        id={elementId}
        className={cx(classes.root, className)}
        {...others}
      >
        <div className={classes.header}>
          {expandable && (
            <HvButton
              icon
              onClick={(event) => {
                setIsOpen((o) => !o);
                onToggle?.(event, !isOpen);
              }}
              aria-expanded={isOpen}
              aria-controls={contentId}
              aria-label={isOpen ? "Collapse" : "Expand"}
              {...expandButtonProps}
            >
              {isOpen ? <Up /> : <Down />}
            </HvButton>
          )}
          {title}
          <div className={classes.actions}>{actions}</div>
        </div>
        <div
          id={contentId}
          hidden={!isOpen}
          className={cx(classes.content, { [classes.hidden]: !showContent })}
        >
          {children}
        </div>
      </div>
    );
  }
);
