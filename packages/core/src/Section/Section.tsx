import { forwardRef } from "react";
import { Down, Up } from "@hitachivantara/uikit-react-icons";

import { HvButton, HvButtonProps } from "../Button";
import { useControlled } from "../hooks/useControlled";
import { useDefaultProps } from "../hooks/useDefaultProps";
import { useUniqueId } from "../hooks/useUniqueId";
import { HvBaseProps } from "../types/generic";
import { ExtractNames } from "../utils/classes";
import { setId } from "../utils/setId";
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
    event: React.MouseEvent<HTMLButtonElement>,
    open: boolean,
  ) => void;
  /** Props to be passed to the expand button */
  expandButtonProps?: HvButtonProps;
  /** Determines whether or not the header has a shadow on the bottom border. */
  raisedHeader?: boolean;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvSectionClasses;
  /** Content container ref. */
  contentRef?: React.Ref<HTMLDivElement>;
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
      raisedHeader,
      contentRef,
      children,
      ...others
    } = useDefaultProps("HvSection", props);

    const { classes, cx } = useClasses(classesProp);

    const [isOpen, setIsOpen] = useControlled(
      expanded,
      Boolean(defaultExpanded),
    );

    const elementId = useUniqueId(id);
    const contentId = setId(elementId, "content");

    const showContent = expandable ? !!isOpen : true;

    return (
      <div
        ref={ref}
        id={elementId}
        className={cx(classes.root, className)}
        {...others}
      >
        {(title || actions || expandable) && (
          <div
            className={cx(classes.header, {
              [classes.raisedHeader]: raisedHeader && isOpen,
            })}
          >
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
        )}
        <div
          ref={contentRef}
          id={contentId}
          hidden={!isOpen}
          className={cx(classes.content, {
            [classes.hidden]: !showContent,
            [classes.spaceTop]: !(title || actions || expandable),
          })}
        >
          {children}
        </div>
      </div>
    );
  },
);
