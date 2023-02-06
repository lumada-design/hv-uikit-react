import clsx from "clsx";
import { HvButtonVariant, HvDropDownMenu } from "components";
import { setId } from "utils";
import { isValidElement } from "react";
import { HvBaseProps } from "../../types";
import { actionsGenericClasses, HvActionsGenericClasses } from ".";
import { MoreOptionsVertical } from "@hitachivantara/uikit-icons";
import { StyledButton, StyledRoot } from "./ActionsGeneric.styles";

export type HvAction = {
  id: string;
  label?: string;
  icon?: Function | React.ReactNode;
  disabled?: boolean;
};

export type HvActionsGenericProps = HvBaseProps & {
  /** Button category. */
  category?: HvButtonVariant;
  /**  Whether actions should be all disabled */
  disabled?: boolean;
  /** The renderable content inside the actions slot of the footer, or an Array of actions `{id, label, icon, disabled}` */
  actions: React.ReactNode | HvAction[];
  /**  The callback function ran when an action is triggered, receiving `action` as param */
  actionsCallback?: Function;
  /**  The number of maximum visible actions before they're collapsed into a `DropDownMenu`. */
  maxVisibleActions?: number;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvActionsGenericClasses;
};

export const HvActionsGeneric = ({
  id,
  classes,
  className,
  category = "primaryGhost",
  disabled = false,
  actions = [],
  actionsCallback,
  maxVisibleActions = Infinity,
  ...others
}: HvActionsGenericProps) => {
  if (!Array.isArray(actions)) return isValidElement(actions) ? actions : null;

  const renderButton = (action, idx) => {
    const { disabled: actDisabled, icon, label, ...other } = action;
    const actionId = setId(id, idx, "action", action.id);

    const renderedIcon = isValidElement(icon)
      ? icon
      : icon?.({ isDisabled: disabled });

    return (
      <StyledButton
        id={actionId}
        key={actionId || idx}
        category={category}
        className={clsx(actionsGenericClasses.button, classes?.button)}
        disabled={actDisabled ?? disabled}
        onClick={(event) => actionsCallback?.(event, id, action)}
        startIcon={renderedIcon}
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
      (disabled && "atmo5") || (semantic && "base2") || undefined;

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
          onClick={(event, action) => actionsCallback?.(event, id, action)}
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
