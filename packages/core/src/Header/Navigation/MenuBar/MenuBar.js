import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import useUniqueId from "../../../useUniqueId";
import { FocusContext } from "../utils/FocusContext";
import SelectionContext from "../utils/SelectionContext";
import MenuItem from "../MenuItem";
import styles from "./styles";

const MenuBar = ({ classes, id, data, onClick, type }) => {
  const uniqueId = useUniqueId(id, "hv-menubar-");
  const selectionPath = useContext(SelectionContext);
  const { state } = useContext(FocusContext);

  const isMenu = type === "menu";
  const isActive = isMenu && data.filter(item => item.id === selectionPath[1]).length > 0;

  const handleMouseOver = () => {
    const { itemFocused } = state;
    if (itemFocused) itemFocused.blur();
  };

  return (
    <div
      className={clsx(classes.root, classes[`${type}`], {
        [classes.hidden]: isMenu,
        [classes.active]: isActive
      })}
    >
      <ul id={uniqueId} className={classes.list} onMouseOver={handleMouseOver} onFocus={() => {}}>
        {data.map(item => (
          <MenuItem key={item.id} item={item} type={type} onClick={onClick} />
        ))}
      </ul>
    </div>
  );
};

MenuBar.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the menu bar.
     */
    menubar: PropTypes.string,
    /**
     * Styles applied to the menu.
     */
    menu: PropTypes.string,
    /**
     * Styles applied when in menu mode.
     */
    hidden: PropTypes.string,
    /**
     * Styles applied when active.
     */
    active: PropTypes.string,
    /**
     * Styles applied to the list.
     */
    list: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An array containing the data for each menu item.
   *
   * id - the id to be applied to the root element.
   * label - the label to be rendered on the menu item.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired
};

MenuBar.defaultProps = {
  id: undefined,
  data: [],
  onClick: () => {}
};

export default withStyles(styles, { name: "HvHeaderMenuBar" })(MenuBar);
