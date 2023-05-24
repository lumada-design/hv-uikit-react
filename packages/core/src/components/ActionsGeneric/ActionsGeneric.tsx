import { clsx } from "clsx";
import {
  HvButtonSize,
  HvButtonVariant,
  HvDropDownMenu,
} from "@core/components";
import { setId } from "@core/utils";
import React, { isValidElement } from "react";
import { HvBaseProps } from "@core/types";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { useTheme } from "@core/hooks";
import { StyledButton, StyledRoot } from "./ActionsGeneric.styles";
import actionsGenericClasses, {
  HvActionsGenericClasses,
} from "./actionsGenericClasses";

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
  classes,
  className,
  category = "secondaryGhost",
  disabled = false,
  actions = [],
  actionsCallback,
  maxVisibleActions = Infinity,
  ...others
}: HvActionsGenericProps) => {
  const { activeTheme, selectedMode } = useTheme();

  if (!Array.isArray(actions)) return isValidElement(actions) ? actions : null;

  const renderButton = (action: HvActionGeneric, idx: number) => {
    const { disabled: actDisabled, id: actId, icon, label, ...other } = action;
    const actionId = setId(id, idx, "action", action.id);

    const renderedIcon = isValidElement(icon)
      ? icon
      : (icon as Function)?.({ isDisabled: disabled });

    return (
      <StyledButton
        id={actionId}
        key={actionId || idx}
        variant={category}
        className={clsx(actionsGenericClasses.button, classes?.button)}
        disabled={actDisabled ?? disabled}
        onClick={(event: React.SyntheticEvent) =>
          actionsCallback?.(event, id || "", action)
        }
        startIcon={renderedIcon}
        $baseColor={
          activeTheme?.colors?.modes[selectedMode].base_light ||
          theme.colors.base_light
        }
        size={(activeTheme?.actionsGeneric?.buttonSize as HvButtonSize) || "md"}
        {...other}
      >
        {label}
      </StyledButton>
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
            root: clsx(
              actionsGenericClasses.dropDownMenu,
              classes?.dropDownMenu
            ),
            icon: clsx(
              actionsGenericClasses.dropDownMenuButton,
              classes?.dropDownMenuButton
            ),
            iconSelected: clsx(
              actionsGenericClasses.dropDownMenuButtonSelected,
              classes?.dropDownMenuButtonSelected
            ),
          }}
          icon={<MoreOptionsVertical color={iconColor} />}
          placement="left"
          onClick={(event: React.SyntheticEvent, action: HvActionGeneric) =>
            actionsCallback?.(event, id || "", action)
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
    <StyledRoot
      className={clsx(
        className,
        actionsGenericClasses.root,
        classes?.root,
        actionOverflow &&
          clsx(actionsGenericClasses.actionContainer, classes?.actionContainer)
      )}
      $actionOverflow={actionOverflow}
      {...others}
    >
      {actionOverflow
        ? renderActionsGrid()
        : actions.map((action, idx) => renderButton(action, idx))}
    </StyledRoot>
  );
};
