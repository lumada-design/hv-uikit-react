import clsx from "clsx";
import { useMemo } from "react";
import { HvBaseProps } from "../../types";
import { HvAction } from "./Action";
import {
  StyledRoot,
  StyledTitle,
  StyledActionsContainer,
  StyledFooter,
} from "./AppSwitcher.styles";
import TitleWithTooltip from "./TitleWithTooltip";

export type HvApplication = {
  /** Id of the application. */
  id?: string;
  /** Name of the application, this is the value that will be displayed on the component. */
  name: string;
  /** URL with the icon location to be used to represent the application. iconUrl will only be used if no iconElement is provided. */
  iconUrl?: string;
  /** Element to be added as the icon representing the application. The iconElement will be the primary option to be displayed. */
  iconElement?: React.ReactElement;
  /** Small description of the application. */
  description?: string;
  /**  URL where the application is accesible. */
  url?: string;
  /** Defines if the application should be opened in the same tab or in a new one. */
  target?: "_top" | "_blank";
  /** If true, the item will be disabled. */
  disabled?: boolean;
  /** True when the application is selected, false otherwise. */
  isSelected?: boolean;
  /** The color of the application. */
  color?: string;
};

export type HvAppSwitcherProps = HvBaseProps & {
  /** Number of columns to render. One, two, or whatever fits the component's width. */
  layout?: "single" | "dual" | "fluid";
  /** Title to be displayed on the header of the component. */
  title?: string;
  /** The list of applications to be used to render the actions on the component. */
  applications?: HvApplication[];
  /** Triggered when an action is clicked. */
  onActionClickedCallback?: Function;
  /** Must return a boolean stating if the action element is selected or not. */
  isActionSelectedCallback?: Function;
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
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    item?: string;
    itemSelected?: string;
    itemDisabled?: string;
    itemTrigger?: string;
    itemIcon?: string;
    itemTitle?: string;
    itemInfoIcon?: string;
    actionsContainer?: string;
    footerContainer?: string;
    open?: string;
    closed?: string;
    title?: string;
  };
};

export const HvAppSwitcher = ({
  id,
  className,
  classes,
  layout = "single",
  title,
  applications,
  onActionClickedCallback = () => {},
  isActionSelectedCallback = () => false,
  header,
  footer,
  isOpen,
}: HvAppSwitcherProps) => {
  const actionClicked = (event, application) => {
    onActionClickedCallback?.(event, application);
  };

  const panelActions = useMemo(
    () =>
      applications &&
      applications?.map((application) => {
        if (application.name) {
          return (
            <HvAction
              key={application.id || `${application.name}_${application.url}`}
              application={application}
              onClickCallback={actionClicked}
              isSelectedCallback={isActionSelectedCallback}
              classes={{
                root: classes?.item,
                selected: classes?.itemSelected,
                disabled: classes?.itemDisabled,
                typography: classes?.itemTrigger,
                icon: classes?.itemIcon,
                title: classes?.itemTitle,
                iconInfo: classes?.itemInfoIcon,
              }}
            />
          );
        }

        return undefined;
      }),
    [applications]
  );

  return (
    <StyledRoot
      id={id}
      className={clsx(
        className,
        classes?.root,
        isOpen && classes?.open,
        isOpen === false && classes?.closed
      )}
      $open={!!isOpen}
      $closed={isOpen === false}
      $layout={layout}
    >
      {(header && (
        <StyledTitle className={classes?.title}>{header}</StyledTitle>
      )) ||
        (title && (
          <TitleWithTooltip
            className={classes?.title}
            title={title}
            type="appSwitcher"
          />
        ))}
      <StyledActionsContainer
        disableGutters
        className={classes?.actionsContainer}
      >
        {panelActions}
      </StyledActionsContainer>
      {footer && (
        <StyledFooter className={classes?.footerContainer}>
          {footer}
        </StyledFooter>
      )}
    </StyledRoot>
  );
};
