import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import withStyles from "../../../styles/withStyles";
import { KeyboardCodes, isKeypress } from "../../../utils/KeyboardUtils";
import HvTypography from "../../../Typography";
import useUniqueId from "../../../useUniqueId";
import SelectionContext from "../utils/SelectionContext";
import { FocusContext } from "../utils/FocusContext";
import MenuBar from "../MenuBar";
import styles from "./styles";

const MenuItem = ({ classes, id, item, type, onClick }) => {
  const uniqueId = useUniqueId(id, "hv-menuItem-");
  const selectionPath = useContext(SelectionContext);
  const { dispatch } = useContext(FocusContext);

  const { data } = item;
  const isMenu = type === "menu";
  const isSelected = selectionPath[isMenu ? 1 : 0] === item.id;
  const hasSubLevel = data && data.length;

  const actionHandler = event => {
    if (
      event.type === "click" ||
      isKeypress(event, KeyboardCodes.Enter) ||
      isKeypress(event, KeyboardCodes.SpaceBar)
    ) {
      if (event.type === "click") {
        // hide focus outline when using mouse
        event.currentTarget.blur();
      }

      if (onClick) {
        onClick(event, item);
      }
    }
  };

  const handleFocus = event => {
    dispatch({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  return (
    <li
      id={uniqueId}
      key={item.label}
      role="none"
      className={clsx(classes.root, classes[`${type}Item`], {
        [classes.selectedItem]: isSelected
      })}
    >
      <div
        role="button"
        className={classes.button}
        onClick={actionHandler}
        onKeyDown={actionHandler}
        tabIndex={0}
        onFocus={handleFocus}
      >
        <HvTypography variant={isSelected ? "selectedNavText" : "normalText"}>
          {item.label}
        </HvTypography>
      </div>
      {hasSubLevel && <MenuBar data={data} onClick={onClick} type="menu" />}
    </li>
  );
};

MenuItem.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    menubarItem: PropTypes.string,
    selectedItem: PropTypes.string,
    menuItem: PropTypes.string,
    button: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An object containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired
};

MenuItem.defaultProps = {
  id: undefined,
  onClick: () => {}
};

export default withStyles(styles, { name: "HvHeaderMenuItem" })(MenuItem);
