import React, { isValidElement } from "react";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { HvButton, HvButtonProps, HvButtonVariant } from "../Button";
import { HvDropDownMenu } from "../DropDownMenu";
import { setId } from "../utils/setId";
import { ExtractNames } from "../utils/classes";
import { HvBaseProps } from "../types/generic";
import { staticClasses, useClasses } from "./ActionsGeneric.styles";
import { IconButton } from "../utils/IconButton";

export { staticClasses as actionsGenericClasses };

export type HvActionsGenericClasses = ExtractNames<typeof useClasses>;

export interface HvActionGeneric {
  /** Action id. */
  id: string;
  /** Action label. */
  label: string;
  /** Action icon. */
  icon?:
    | React.ReactNode
    | ((params: { isDisabled?: boolean }) => React.ReactNode);
  /** Whether the action is disabled or not. */
  disabled?: boolean;
  /** When set to `true`, the button will have the icon has its content and a tooltip with the label will appear when the button is visible and hovered. */
  iconOnly?: boolean;
}

export interface HvActionsGenericProps extends HvBaseProps {
  /**
   * The button category for all actions.
   *
   * @deprecated Use `variant` instead.
   */
  category?: HvButtonVariant;
  /** The button variant for all actions. */
  variant?: HvButtonVariant;
  /** Whether the actions should be all disabled. */
  disabled?: boolean;
  /** Whether the actions should be all icon buttons when visible. */
  iconOnly?: boolean;
  /** The renderable content inside the actions slot of the footer, or an array of actions. */
  actions: React.ReactNode | HvActionGeneric[];
  /**
   * The callback function called when an action is triggered, receiving the `action` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionsCallback?: (
    event: React.SyntheticEvent,
    id: string,
    action: HvActionGeneric
  ) => void;
  /** The callback function called when an action is triggered, receiving the `action` as parameter. */
  onAction?: (event: React.SyntheticEvent, action: HvActionGeneric) => void;
  /** The maximum number of visible actions before they're collapsed into a dropdown menu. */
  maxVisibleActions?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvActionsGenericClasses;
}

export const HvActionsGeneric = (props: HvActionsGenericProps) => {
  const {
    id: idProp,
    classes: classesProp,
    className,
    category = "secondaryGhost", // TODO - remove and update variant default in v6
    variant: variantProp,
    disabled = false,
    actions = [],
    actionsCallback, // TODO - remove in v6
    onAction,
    maxVisibleActions = Infinity,
    iconOnly: iconOnlyProp,
    ...others
  } = useDefaultProps("HvActionsGeneric", props);

  const variant = variantProp || category;

  const { classes, cx } = useClasses(classesProp);

  const handleCallback: HvActionsGenericProps["actionsCallback"] = (
    event,
    id,
    action
  ) => {
    actionsCallback?.(event, id, action);
    onAction?.(event, action);
  };

  if (!Array.isArray(actions)) return isValidElement(actions) ? actions : null;

  const renderButton = (action: HvActionGeneric, idx: number) => {
    const {
      disabled: actDisabled,
      id: actId,
      icon,
      label,
      iconOnly,
      ...other
    } = action;
    const actionId = setId(idProp, idx, "action", action.id);

    const renderedIcon = isValidElement(icon)
      ? icon
      : (icon as Function)?.({ isDisabled: disabled });

    const commonButtonProps: HvButtonProps = {
      id: actionId,
      variant,
      className: classes.button,
      disabled: actDisabled ?? disabled,
      onClick: (event) => handleCallback(event, idProp || "", action),
      ...other,
    };

    const key = actionId || idx;

    const isIcon = iconOnly ?? iconOnlyProp;

    if (isIcon) {
      return (
        <IconButton {...commonButtonProps} key={key} title={label}>
          {renderedIcon}
        </IconButton>
      );
    }

    return (
      <HvButton {...commonButtonProps} key={key} startIcon={renderedIcon}>
        {label}
      </HvButton>
    );
  };

  const renderActionsGrid = () => {
    const actsVisible = actions.slice(0, maxVisibleActions);
    const actsDropdown = actions.slice(maxVisibleActions);

    const semantic = variant === "semantic";
    const iconColor =
      (disabled && "secondary_60") || (semantic && "base_dark") || undefined;

    return (
      <>
        {actsVisible.map((action, idx) => renderButton(action, idx))}
        <HvDropDownMenu
          id={setId(idProp, "menu")}
          disabled={disabled}
          variant={variant}
          classes={{
            root: classes.dropDownMenu,
            icon: classes.dropDownMenuButton,
            iconSelected: classes.dropDownMenuButtonSelected,
          }}
          icon={<MoreOptionsVertical color={iconColor} />}
          placement="left"
          onClick={(event, action) =>
            handleCallback(event, idProp || "", action as HvActionGeneric)
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
