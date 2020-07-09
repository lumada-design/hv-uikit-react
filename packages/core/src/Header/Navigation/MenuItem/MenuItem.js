import React, { useContext, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
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
  const [useFocus, setUseFocus] = useState(false);

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
        setUseFocus(false);
        event.currentTarget.blur();
      }

      onClick?.(event, item);
    }
  };

  const handleFocus = event => {
    setUseFocus(true);
    dispatch({ type: "setItemFocused", itemFocused: event.currentTarget });
  };

  const focusWrapper = childrenToWrap => (
    <div className={classes.externalReference}>
      {childrenToWrap}
      {useFocus && <div className={classes.falseFocus} />}
    </div>
  );
  const isIe = isBrowser(["ie", "edge"]);
  return (
    <li
      id={id}
      key={item.label}
      className={clsx(classes.root, classes[`${type}Item`], {
        [classes.selectedItem]: isSelected
      })}
    >
      <ConditionalWrapper condition={isIe} wrapper={focusWrapper}>
        <div
          role="button"
          className={clsx(classes.button, {
            [classes.contentFocused]: useFocus && !isIe,
            [classes.contentFocusDisabled]: isIe || !useFocus
          })}
          onClick={actionHandler}
          onKeyDown={actionHandler}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={() => setUseFocus(false)}
        >
          <HvTypography variant={isSelected ? "selectedNavText" : "normalText"}>
            {item.label}
          </HvTypography>
        </div>
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
     * Style applied to each item button.
     */
    button: PropTypes.string,
    /**
     * Style applied when element is focused by keyboard.
     */
    contentFocused: PropTypes.string,
    /**
     * Style applied when element is focused by click.
     */
    contentFocusDisabled: PropTypes.string,
    /**
     * Style applied to the reference element used for ie focus.
     */
    externalReference: PropTypes.string,
    /**
     * Style applied to simulated a focues in ie.
     */
    falseFocus: PropTypes.string
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

export default withStyles(styles, { name: "HvHeaderMenuItem" })(MenuItem);
