import { forwardRef } from "react";
import { Down } from "@hitachivantara/uikit-react-icons";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvButton, HvButtonProps } from "../Button";
import { useExpandable } from "../hooks/useExpandable";
import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./Section.styles";

export { staticClasses as sectionClasses };

export type HvSectionClasses = ExtractNames<typeof useClasses>;

export interface HvSectionProps
  extends Omit<HvBaseProps<HTMLDivElement>, "title" | "onToggle"> {
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

    const { isOpen, toggleOpen, buttonProps, regionProps } = useExpandable({
      id,
      expanded,
      defaultExpanded,
    });

    const showContent = expandable ? !!isOpen : true;

    return (
      <div
        ref={ref}
        id={id}
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
                  toggleOpen();
                  onToggle?.(event, !isOpen);
                }}
                aria-label={isOpen ? "Collapse" : "Expand"}
                {...buttonProps}
                {...expandButtonProps}
              >
                <Down style={{ rotate: isOpen ? "180deg" : undefined }} />
              </HvButton>
            )}
            {title}
            <div className={classes.actions}>{actions}</div>
          </div>
        )}
        <div
          ref={contentRef}
          hidden={!isOpen}
          className={cx(classes.content, {
            [classes.hidden]: !showContent,
            [classes.spaceTop]: !(title || actions || expandable),
          })}
          {...(expandable && regionProps)}
        >
          {children}
        </div>
      </div>
    );
  },
);
