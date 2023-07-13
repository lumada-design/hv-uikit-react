import { useState } from "react";

import { theme } from "@hitachivantara/uikit-styles";
import { Info } from "@hitachivantara/uikit-react-icons";

import {
  HvAvatar,
  HvListItem,
  HvTooltip,
  HvTypography,
} from "@core/components";
import { HvBaseProps } from "@core/types";
import { useUniqueId } from "@core/hooks";
import { ExtractNames } from "@core/utils";

import { HvAppSwitcherActionApplication } from "../AppSwitcher";
import TitleWithTooltip from "../TitleWithTooltip";
import { useClasses, staticClasses } from "./Action.styles";

export { staticClasses as appSwitcherActionClasses };

export type HvAppSwitcherActionClasses = ExtractNames<typeof useClasses>;

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

const getColor = (color: any, defaultColor: string) =>
  theme.colors[color] || color || defaultColor;

export const HvAppSwitcherAction = ({
  id,
  className,
  classes: classesProp,
  application,
  onClickCallback = () => {},
  isSelectedCallback = () => false,
}: HvAppSwitcherActionProps) => {
  const { classes, cx } = useClasses(classesProp);

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
        <img
          className={classes.iconUrl}
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
    <HvListItem
      id={id}
      interactive
      tabIndex={0}
      selected={isSelected}
      disabled={disabled}
      className={cx(
        classes.root,
        { [classes.disabled]: disabled, [classes.selected]: isSelected },
        className
      )}
    >
      {/* As HvTooltip don't have the id prop, is not possible to use the aria-labelledby to reference it.
       In substitution is used the aria-label with the "title" value */}
      <HvTypography
        component={isLink ? "a" : "button"}
        href={isLink ? url : undefined}
        target={isLink ? target || "_top" : undefined}
        className={classes.typography}
        onClick={handleOnClick}
        style={{ borderColor: color }}
        aria-describedby={descriptionElementId}
        aria-label={name}
      >
        <div className={classes.icon}>{renderApplicationIcon()}</div>

        <TitleWithTooltip title={name} className={classes.title} />

        {description && (
          <HvTooltip
            disableFocusListener
            disableTouchListener
            title={<HvTypography>{description}</HvTypography>}
          >
            <div>
              <Info
                className={classes.iconInfo}
                role="img"
                aria-label={description}
                id={descriptionElementId}
              />
            </div>
          </HvTooltip>
        )}
      </HvTypography>
    </HvListItem>
  );
};
