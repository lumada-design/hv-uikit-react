import { useState } from "react";
import clsx from "clsx";
import { theme } from "@hitachivantara/uikit-styles";
import { HvAvatar, HvTooltip, HvTypography } from "components";
import { HvApplication } from "..";
import { HvBaseProps } from "../../../types";
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

export type HvActionProps = HvBaseProps & {
  /** The application data to be used to render the Action object. */
  application: HvApplication;
  /** Callback triggered when the action is clicked. */
  onClickCallback?: Function;
  /** Must return a boolean stating if the action element is selected or not. */
  isSelectedCallback?: Function;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvAppSwitcherActionClasses;
};

const getColor = (color, defaultColor) =>
  theme.colors[color] || color || defaultColor;

export const HvAction = ({
  id,
  className,
  classes,
  application,
  onClickCallback = () => {},
  isSelectedCallback = () => false,
}: HvActionProps) => {
  const { name, description, disabled, iconElement, iconUrl, url, target } =
    application;

  const color = disabled
    ? theme.colors.atmo5
    : getColor(application?.color, theme.colors.acce1);

  const [validIconUrl, setValidIconUrl] = useState(true);

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
      <HvAvatar size="SM" backgroundColor={color} variant="square">
        {initials}
      </HvAvatar>
    );
  };

  const isSelected = isSelectedCallback(application);

  /**
   * Handles the onClick event and triggers the appropriate callback if it exists.
   */
  const handleOnClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClickCallback?.(event, { ...application, isSelected });
  };

  const isLink = url != null;

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
      <StyledTypography
        as={isLink ? "a" : "button"}
        // @ts-ignore
        href={isLink ? url : undefined}
        target={isLink ? target || "_top" : undefined}
        className={clsx(
          appSwitcherActionClasses.typography,
          classes?.typography
        )}
        onClick={handleOnClick}
        style={{ borderColor: color }}
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
              />
            </div>
          </HvTooltip>
        )}
      </StyledTypography>
    </StyledListItem>
  );
};
