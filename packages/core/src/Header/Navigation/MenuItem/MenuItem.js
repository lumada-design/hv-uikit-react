import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { KeyboardCodes, isKeypress } from "../../../utils/KeyboardUtils";
import HvTypography from "../../../Typography";
import SelectionContext from "../utils/SelectionContext";
import { FocusContext } from "../utils/FocusContext";
import ConditionalWrapper from "../../../utils/ConditionalWrapper";
import MenuBar from "../MenuBar";
import styles from "./styles";
import isBrowser from "../../../utils/browser";

const MenuItem = ({ classes, id, item, type, onClick }) => {
  const selectionPath = useContext(SelectionContext);
  const { dispatch } = useContext(FocusContext);

  const { data } = item;
  const isMenu = type === "menu";
  const isSelected = selectionPath[isMenu ? 1 : 0] === item.id;
  const hasSubLevel = data && data.length;

  const actionHandler = (event) => {
    if (
      event.type === "click" ||
      isKeypress(event, KeyboardCodes.Enter) ||
      isKeypress(event, KeyboardCodes.SpaceBar)
    ) {
      if (event.type === "click") {
        event.currentTarget.blur();
      }

      onClick?.(event, item);
    }
  };

  const handleFocus = (event) => {
    dispatch({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  const focusWrapper = (childrenToWrap) => (
    <div className={classes.externalReference}>{childrenToWrap}</div>
  );
  const isIe = isBrowser(["ie", "edge"]);
  const label = (
    <HvTypography variant={isSelected ? "selectedNavText" : "normalText"}>
      {item.label}
    </HvTypography>
  );
  const itemProps = {
    onClick: actionHandler,
    onKeyDown: actionHandler,
    tabIndex: 0,
    onFocus: handleFocus,
  };
  return (
    <li
      id={id}
      key={item.label}
      className={clsx(classes.root, classes[`${type}Item`], {
        [classes.selectedItem]: !isMenu && isSelected,
        [classes.notSelectedItem]: !isMenu && !isSelected,
      })}
    >
      <ConditionalWrapper condition={isIe} wrapper={focusWrapper}>
        {item?.href ? (
          <a
            className={clsx(classes.button, classes.link)}
            href={item?.href}
            target={item?.target}
            {...itemProps}
          >
            {label}
          </a>
        ) : (
          <div className={clsx(classes.button)} role="button" {...itemProps}>
            {label}
          </div>
        )}
      </ConditionalWrapper>
      {hasSubLevel && <MenuBar data={data} onClick={onClick} type="menu" />}
    </li>
  );
};

MenuItem.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the first element in the hierarchy.
     */
    root: PropTypes.string,
    /**
     * Style applied to the li element when it is selected.
     */
    selectedItem: PropTypes.string,
    /**
     * Style applied to the li element when it isn't selected.
     */
    notSelectedItem: PropTypes.string,
    /**
     * Style applied to each item button.
     */
    button: PropTypes.string,
    /**
     * Style applied to each item button when it is behaving as a.
     */
    link: PropTypes.string,
    /**
     * Style applied to the reference element used for ie focus.
     */
    externalReference: PropTypes.string,
    /**
     * Style applied to simulated a focus in ie.
     */
    falseFocus: PropTypes.string,
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
    href: PropTypes.string,
    target: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  /**
   * Callback triggered when item is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The type of menu.
   */
  type: PropTypes.oneOf(["menubar", "menu"]).isRequired,
};

export default withStyles(styles, { name: "HvHeaderMenuItem" })(MenuItem);
