import { useCallback, useState } from "react";

import { theme, getColor, HvColorAny } from "@hitachivantara/uikit-styles";
import { Info } from "@hitachivantara/uikit-react-icons";

import { HvAvatar } from "@core/Avatar";
import { HvListItem } from "@core/ListContainer";
import { HvTypography } from "@core/Typography";
import { HvTooltip } from "@core/Tooltip";
import { HvOverflowTooltip } from "@core/OverflowTooltip";
import { HvBaseProps } from "@core/types/generic";
import { useUniqueId } from "@core/hooks/useUniqueId";
import { ExtractNames } from "@core/utils/classes";

import { useClasses, staticClasses } from "./Action.styles";

export { staticClasses as appSwitcherActionClasses };

export type HvAppSwitcherActionClasses = ExtractNames<typeof useClasses>;

export interface HvAppSwitcherActionApplication {
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
  /**  URL where the application is accessible. */
  url?: string;
  /** Defines if the application should be opened in the same tab or in a new one. */
  target?: "_top" | "_blank";
  /** If true, the item will be disabled. */
  disabled?: boolean;
  /** True when the application is selected, false otherwise. */
  isSelected?: boolean;
  /** The color of the application. */
  color?: HvColorAny;
}

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
  const handleOnClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClickCallback?.(event, { ...application, isSelected });
    },
    [application, disabled, isSelected, onClickCallback]
  );

  const isLink = url != null;
  const descriptionElementId = useUniqueId(id, "hvAction-description");

  const renderApplication = useCallback(
    (children: React.ReactNode) => {
      const typographyProps = {
        className: classes.typography,
        onClick: handleOnClick,
        style: { borderColor: color },
        "aria-label": name,
        ...(description && { "aria-describedby": descriptionElementId }),
      };

      if (isLink) {
        return (
          <HvTypography
            component="a"
            href={url}
            target={target || "_top"}
            {...typographyProps}
          >
            {children}
          </HvTypography>
        );
      }

      return (
        <HvTypography component="button" {...typographyProps}>
          {children}
        </HvTypography>
      );
    },
    [
      classes.typography,
      color,
      description,
      descriptionElementId,
      handleOnClick,
      isLink,
      name,
      target,
      url,
    ]
  );

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
      {renderApplication(
        <>
          <div className={classes.icon}>{renderApplicationIcon()}</div>

          <HvOverflowTooltip
            paragraphOverflow
            className={classes.title}
            placement="top-start"
            data={name}
            classes={{
              tooltipAnchorParagraph: classes.titleAnchor,
            }}
          />

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
        </>
      )}
    </HvListItem>
  );
};
