import { useState } from "react";
import { clsx } from "clsx";
import { theme } from "@hitachivantara/uikit-styles";
import { HvAvatar, HvTooltip, HvTypography } from "@core/components";
import { HvAppSwitcherActionApplication } from "../AppSwitcher";
import { HvBaseProps } from "@core/types";
import TitleWithTooltip from "../TitleWithTooltip";
import {
  StyledIcon,
  StyledIconInfo,
  StyledListItem,
  StyledTypography,
  StyledImg,
} from "./Action.styles";
import appSwitcherActionClasses, {
  HvAppSwitcherActionClasses,
} from "./actionClasses";
import { useUniqueId } from "@core/hooks";

export interface HvAppSwitcherActionProps extends HvBaseProps {
  /** The application data to be used to render the Action object. */
  application: HvAppSwitcherActionApplication;
  /** Callback triggered when the action is clicked. */
  onClickCallback?: (
    event: React.MouseEvent,
    application: HvAppSwitcherActionApplication
  ) => void;
  /** Must return a boolean stating if the action element is selected or not. */
  isSelectedCallback?: (application: HvAppSwitcherActionApplication) => boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvAppSwitcherActionClasses;
}

const getColor = (color, defaultColor) =>
  theme.colors[color] || color || defaultColor;

export const HvAppSwitcherAction = ({
  id,
  className,
  classes,
  application,
  onClickCallback = () => {},
  isSelectedCallback = () => false,
}: HvAppSwitcherActionProps) => {
  const { name, description, disabled, iconElement, iconUrl, url, target } =
    application;

  const color = disabled
    ? theme.colors.secondary_60
    : getColor(application?.color, theme.colors.secondary);

  const [validIconUrl, setValidIconUrl] = useState<boolean>(true);

  const renderApplicationIcon = () => {
    if (iconElement) {
      return iconElement;
    }

    if (iconUrl && validIconUrl) {
      return (
        <StyledImg
          className={clsx(appSwitcherActionClasses.iconUrl, classes?.iconUrl)}
          src={iconUrl}
          onError={() => {
            setValidIconUrl(false);
          }}
          alt={description}
        />
      );
    }

    const brokenTitle = name.split(" ");
    const initials =
      brokenTitle[0].substring(0, 1) +
      (brokenTitle[1] ? brokenTitle[1].substring(0, 1) : "");

    return (
      <HvAvatar size="sm" backgroundColor={color} variant="square" aria-hidden>
        {initials}
      </HvAvatar>
    );
  };

  const isSelected = isSelectedCallback(application);

  /**
   * Handles the onClick event and triggers the appropriate callback if it exists.
   */
  const handleOnClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClickCallback?.(event, { ...application, isSelected });
  };

  const isLink = url != null;
  const descriptionElementId = useUniqueId(id, "hvAction-description");

  return (
    <StyledListItem
      id={id}
      interactive
      tabIndex={0}
      selected={isSelected}
      disabled={disabled}
      className={clsx(
        className,
        appSwitcherActionClasses.root,
        classes?.root,
        disabled && clsx(appSwitcherActionClasses.disabled, classes?.disabled),
        isSelected && clsx(appSwitcherActionClasses.selected, classes?.selected)
      )}
    >
      {/*As HvTooltip don't have the id prop, is not possible to use the aria-labelledby to reference it.
       In substitution is used the aria-label with the "title" value*/}
      <StyledTypography
        component={isLink ? "a" : "button"}
        href={isLink ? url : undefined}
        target={isLink ? target || "_top" : undefined}
        className={clsx(
          appSwitcherActionClasses.typography,
          classes?.typography
        )}
        onClick={handleOnClick}
        style={{ borderColor: color }}
        aria-describedby={descriptionElementId}
        aria-label={name}
      >
        <StyledIcon
          className={clsx(appSwitcherActionClasses.icon, classes?.icon)}
        >
          {renderApplicationIcon()}
        </StyledIcon>

        <TitleWithTooltip
          title={name}
          className={clsx(appSwitcherActionClasses.title, classes?.title)}
          type="action"
        />

        {description && (
          <HvTooltip
            disableFocusListener
            disableTouchListener
            title={<HvTypography>{description}</HvTypography>}
          >
            <div>
              <StyledIconInfo
                className={clsx(
                  appSwitcherActionClasses.iconInfo,
                  classes?.iconInfo
                )}
                role="img"
                aria-label={description}
                id={descriptionElementId}
              />
            </div>
          </HvTooltip>
        )}
      </StyledTypography>
    </StyledListItem>
  );
};
