import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import SelectionContext from "../utils/SelectionContext";
import MenuItem from "../MenuItem";
import styles from "./styles";

const MenuBar = ({ classes, id, data = [], onClick, type }) => {
  const selectionPath = useContext(SelectionContext);

  const isMenu = type === "menu";
  const isActive = isMenu && data.filter((item) => item.id === selectionPath[1]).length > 0;

  return (
    <div
      className={clsx(classes.root, classes[`${type}`], {
        [classes.hidden]: isMenu,
        [classes.active]: isActive,
      })}
    >
      <ul id={id} className={classes.list} onFocus={() => {}}>
        {data.map((item) => (
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
    list: PropTypes.string,
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
   * href - the url used for navigation.
   * target - the behavior when opening an url.
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      target: PropTypes.string,
    })
  ),
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired,
};

export default withStyles(styles, { name: "HvHeaderMenuBar" })(MenuBar);
