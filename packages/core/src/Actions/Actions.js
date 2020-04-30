import React from "react";
import PropTypes, { oneOfType } from "prop-types";
import { withStyles } from "@material-ui/core";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical";
import clsx from "clsx";
import HvButton from "../Button";
import DropDownMenu from "../DropDownMenu";
import { setId } from "..";
import styles from "./styles";

const Actions = ({
  id,
  classes,
  className,
  category = "ghost",
  actions = [],
  actionsCallback,
  maxVisibleActions = Infinity,
  ...others
}) => {
  if (!Array.isArray(actions)) return React.isValidElement(actions) ? actions : null;

  const renderButton = (action, idx) => {
    const { disabled, iconCallback, label, ...other } = action;
    const actionId = setId(id, idx, "action", action.id);
    return (
      <HvButton
        id={actionId}
        key={actionId}
        category={category}
        className={classes.button}
        disabled={disabled}
        onClick={event => actionsCallback?.(event, id, action)}
        {...other}
      >
        {iconCallback?.({ isDisabled: disabled })}
        {label}
      </HvButton>
    );
  };

  const renderActionsGrid = () => {
    const actsVisible = actions.slice(0, maxVisibleActions);
    const actsDropdown = actions.slice(maxVisibleActions);

    return (
      <>
        {actsVisible.map((action, idx) => renderButton(action, idx))}
        <DropDownMenu
          classes={{ root: classes.dropDownMenu }}
          icon={<MoreVert className={classes.dropDownMenuIcon} />}
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
        [classes.actionContainer]: actionOverflow
      })}
      {...others}
    >
      {actionOverflow
        ? renderActionsGrid()
        : actions.map((action, idx) => renderButton(action, idx))}
    </div>
  );
};

Actions.propTypes = {
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
     * Styles applied to the DropDownMenu icon.
     */
    dropDownMenuIcon: PropTypes.string
  }).isRequired,
  /**
   * Component identifier.
   */
  id: PropTypes.string,
  /**
   * Button category.
   */
  category: PropTypes.oneOf(["primary", "secondary", "ghost", "ghostSecondary", "semantic"]),
  /**
   * The renderable content inside the actions slot ofsdf dasf a the footer,
   * or an Array of actions ´{id, label, icon, disabled}´
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconCallback: PropTypes.func,
        disabled: PropTypes.bool,
        ariaLabel: PropTypes.string,
        ariaLabelledBy: PropTypes.string,
        ariaDescribedBy: PropTypes.string
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number
};

export default withStyles(styles, { name: "HvActions" })(Actions);
