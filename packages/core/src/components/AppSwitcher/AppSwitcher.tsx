import { useMemo } from "react";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { HvListContainer } from "@core/components/ListContainer";
import { HvTypography } from "@core/components/Typography";

import { HvAppSwitcherAction, HvAppSwitcherActionApplication } from "./Action";
import { useClasses, staticClasses } from "./AppSwitcher.styles";
import TitleWithTooltip from "./TitleWithTooltip";

export { staticClasses as appSwitcherClasses };

export type HvAppSwitcherClasses = ExtractNames<typeof useClasses>;

export interface HvAppSwitcherProps extends HvBaseProps {
  /** Number of columns to render. One, two, or whatever fits the component's width. */
  layout?: "single" | "dual" | "fluid";
  /** Title to be displayed on the header of the component. */
  title?: string;
  /** The list of applications to be used to render the actions on the component. */
  applications?: HvAppSwitcherActionApplication[];
  /** Triggered when an action is clicked. */
  onActionClickedCallback?: (
    event: React.MouseEvent,
    application: HvAppSwitcherActionApplication
  ) => void;
  /** Must return a boolean stating if the action element is selected or not. */
  isActionSelectedCallback?: (
    application: HvAppSwitcherActionApplication
  ) => boolean;
  /** Element to be added to the header container, if none is provided a label with the title will be added. */
  header?: React.ReactNode;
  /** Element to be added to the footer container. */
  footer?: React.ReactNode;
  /**
   * Flag stating if the panel is opened or closed.
   *
   * @deprecated This logic should be external, i.e. using the HvAppSwitcher inside a Drawer component.
   */
  isOpen?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvAppSwitcherClasses;
}

export const HvAppSwitcher = ({
  id,
  className,
  classes: classesProp,
  layout = "single",
  title,
  applications,
  onActionClickedCallback = () => {},
  isActionSelectedCallback = () => false,
  header,
  footer,
  isOpen,
}: HvAppSwitcherProps) => {
  const { classes, cx } = useClasses(classesProp);

  const panelActions = useMemo(
    () =>
      applications &&
      applications?.map((application) => {
        if (application.name) {
          return (
            <HvAppSwitcherAction
              key={application.id || `${application.name}_${application.url}`}
              application={application}
              onClickCallback={onActionClickedCallback}
              isSelectedCallback={isActionSelectedCallback}
              classes={{
                root: classes.item,
                selected: classes.itemSelected,
                disabled: classes.itemDisabled,
                typography: classes.itemTrigger,
                icon: classes.itemIcon,
                title: classes.itemTitle,
                iconInfo: classes.itemInfoIcon,
              }}
            />
          );
        }

        return undefined;
      }),
    [applications, classes, isActionSelectedCallback, onActionClickedCallback]
  );

  return (
    <div
      id={id}
      className={cx(
        classes.root,
        classes[layout],
        { [classes.open]: !!isOpen, [classes.closed]: isOpen === false },
        className
      )}
    >
      {(header && (
        <HvTypography component="div" variant="label" className={classes.title}>
          {header}
        </HvTypography>
      )) ||
        (title && <TitleWithTooltip className={classes.title} title={title} />)}
      <HvListContainer disableGutters className={classes.actionsContainer}>
        {panelActions}
      </HvListContainer>
      {footer && (
        <HvTypography
          component="div"
          variant="label"
          className={classes.footerContainer}
        >
          {footer}
        </HvTypography>
      )}
    </div>
  );
};
