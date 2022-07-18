import React, { isValidElement } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import clsx from "clsx";
import { MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvDropDownMenu, setId } from "..";
import styles from "./styles";

const ActionsGeneric = ({
  id,
  classes,
  className,
  category = "ghost",
  disabled = false,
  actions = [],
  actionsCallback,
  maxVisibleActions = Infinity,
  ...others
}) => {
  if (!Array.isArray(actions)) return isValidElement(actions) ? actions : null;

  const renderButton = (action, idx) => {
    const { disabled: actDisabled, icon, label, ...other } = action;
    const actionId = setId(id, idx, "action", action.id);

    const renderedIcon = isValidElement(icon) ? icon : icon?.({ isDisabled: disabled });

    return (
      <HvButton
        id={actionId}
        key={actionId || idx}
        category={category}
        className={classes.button}
        disabled={actDisabled ?? disabled}
        onClick={(event) => actionsCallback?.(event, id, action)}
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
    const iconColor = (disabled && "atmo5") || (semantic && "base2") || undefined;

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
    <div
      className={clsx(className, classes.root, {
        [classes.actionContainer]: actionOverflow,
      })}
      {...others}
    >
      {actionOverflow
        ? renderActionsGrid()
        : actions.map((action, idx) => renderButton(action, idx))}
    </div>
  );
};

ActionsGeneric.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   *   A Jss Object used to override or extend the styles applied to the actions.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to element root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the visible buttons.
     */
    button: PropTypes.string,
    /**
     * Styles applied to the action container wrapper.
     */
    actionContainer: PropTypes.string,
    /**
     * Styles applied to the DropDownMenu component.
     */
    dropDownMenu: PropTypes.string,
    /**
     * Styles applied to the DropDownMenu IconButton component.
     */
    dropDownMenuButton: PropTypes.string,
    /**
     * Styles applied to the DropDownMenu IconButton component when it is selected.
     */
    dropDownMenuButtonSelected: PropTypes.string,
  }).isRequired,
  /**
   * Component identifier.
   */
  id: PropTypes.string,
  /**
   * Button category.
   */
  category: PropTypes.oneOf(["primary", "secondary", "ghost", "semantic"]),
  /**
   *  Whether actions should be all disabled
   */
  disabled: PropTypes.bool,
  /**
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions `{id, label, icon, disabled}`
   */
  actions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions: PropTypes.number,
};

export default withStyles(styles, { name: "HvActionsGeneric" })(ActionsGeneric);
