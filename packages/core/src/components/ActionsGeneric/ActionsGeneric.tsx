import React, { isValidElement } from "react";

import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { hexToRgbA } from "@core/utils/hexToRgbA";
import { HvButton, HvButtonVariant } from "@core/components/Button";
import { HvDropDownMenu } from "@core/components/DropDownMenu";
import { setId } from "@core/utils/setId";
import { ExtractNames } from "@core/utils/classes";
import { HvBaseProps } from "@core/types/generic";
import { useTheme } from "@core/hooks/useTheme";

import { staticClasses, useClasses } from "./ActionsGeneric.styles";

export { staticClasses as actionsGenericClasses };

export type HvActionsGenericClasses = ExtractNames<typeof useClasses>;

export interface HvActionGeneric {
  id: string;
  label: string;
  icon?:
    | React.ReactNode
    | ((params: { isDisabled?: boolean }) => React.ReactNode);
  disabled?: boolean;
}

export interface HvActionsGenericProps extends HvBaseProps {
  /** Button category. */
  category?: HvButtonVariant;
  /**  Whether actions should be all disabled */
  disabled?: boolean;
  /** The renderable content inside the actions slot of the footer, or an Array of actions `{id, label, icon, disabled}` */
  actions: React.ReactNode | HvActionGeneric[];
  /**  The callback function ran when an action is triggered, receiving `action` as param */
  actionsCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /**  The number of maximum visible actions before they're collapsed into a `DropDownMenu`. */
  maxVisibleActions?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionsGenericClasses;
}

export const HvActionsGeneric = ({
  id,
  classes: classesProp,
  className,
  category = "secondaryGhost",
  disabled = false,
  actions = [],
  actionsCallback,
  maxVisibleActions = Infinity,
  ...others
}: HvActionsGenericProps) => {
  const { classes, cx, css } = useClasses(classesProp);

  const { activeTheme, selectedMode } = useTheme();

  if (!Array.isArray(actions)) return isValidElement(actions) ? actions : null;

  const renderButton = (action: HvActionGeneric, idx: number) => {
    const { disabled: actDisabled, id: actId, icon, label, ...other } = action;
    const actionId = setId(id, idx, "action", action.id);

    const renderedIcon = isValidElement(icon)
      ? icon
      : (icon as Function)?.({ isDisabled: disabled });

    return (
      <HvButton
        id={actionId}
        key={actionId || idx}
        variant={category}
        className={cx(
          css({
            "&:hover": {
              backgroundColor: hexToRgbA(
                activeTheme?.colors?.modes[selectedMode].base_light ||
                  theme.colors.base_light,
                0.3
              ),
            },
          }),
          classes.button
        )}
        disabled={actDisabled ?? disabled}
        onClick={(event) => actionsCallback?.(event, id || "", action)}
        startIcon={renderedIcon}
        {...other}
      >
        {label}
      </HvButton>
    );
  };

  const renderActionsGrid = () => {
    const actsVisible = actions.slice(0, maxVisibleActions);
    const actsDropdown = actions.slice(maxVisibleActions);

    const semantic = category === "semantic";
    const iconColor =
      (disabled && "secondary_60") || (semantic && "base_dark") || undefined;

    return (
      <>
        {actsVisible.map((action, idx) => renderButton(action, idx))}
        <HvDropDownMenu
          id={setId(id, "menu")}
          disabled={disabled}
          category={category}
          classes={{
            root: classes.dropDownMenu,
            icon: classes.dropDownMenuButton,
            iconSelected: classes.dropDownMenuButtonSelected,
          }}
          icon={<MoreOptionsVertical color={iconColor} />}
          placement="left"
          onClick={(event, action) =>
            actionsCallback?.(event, id || "", action as HvActionGeneric)
          }
          dataList={actsDropdown}
          keepOpened={false}
          disablePortal={false}
        />
      </>
    );
  };

  const actionOverflow = actions.length > maxVisibleActions;

  return (
    <div
      className={cx(
        classes.root,
        { [classes.actionContainer]: actionOverflow },
        className
      )}
      {...others}
    >
      {actionOverflow
        ? renderActionsGrid()
        : actions.map((action, idx) => renderButton(action, idx))}
    </div>
  );
};
