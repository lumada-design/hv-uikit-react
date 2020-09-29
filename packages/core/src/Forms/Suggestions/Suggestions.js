import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { Popper, withStyles } from "@material-ui/core";
import { HvList } from "../..";
import { setId } from "../../utils";
import { HvFormElementContext } from "../FormElement";
import styles from "./styles";

/**
 * A pop-out list of options
 */
const HvSuggestions = (props) => {
  const {
    id,
    className,
    classes,
    expanded = false,
    anchorEl,
    suggestionValues = [],
    onClose,
    onSuggestionSelected,
    ...others
  } = props;

  const { elementId } = useContext(HvFormElementContext);
  const localId = id ?? setId(elementId, "suggestions");

  return (
    <div id={localId} className={clsx(className, classes.root)} {...others}>
      <Popper open={expanded} disablePortal anchorEl={anchorEl} className={classes.popper}>
        <OutsideClickHandler onOutsideClick={(e) => onClose?.(e)}>
          <HvList
            className={classes.list}
            id={setId(id, "list")}
            condensed
            values={suggestionValues}
            onClick={onSuggestionSelected}
            selectable={false}
          />
        </OutsideClickHandler>
      </Popper>
    </div>
  );
};

HvSuggestions.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the popper component.
     */
    popper: PropTypes.string,
    /**
     * Styles applied to the suggestion list container.
     */
    list: PropTypes.string,
  }).isRequired,
  /**
   * Whether suggestions is visible.
   */
  expanded: PropTypes.bool,
  /**
   * The HTML element Suggestions attaches to.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  /**
   * Array of { id, label, ...others } values to display in the suggestion list
   */
  suggestionValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      isHidden: PropTypes.bool,
      iconCallback: PropTypes.func,
      showNavIcon: PropTypes.bool,
      path: PropTypes.string,
      params: PropTypes.instanceOf(Object),
    })
  ),
  /**
   * Function called when suggestion list is closed
   */
  onClose: PropTypes.func,
  /**
   * Function called when a suggestion is selected
   */
  onSuggestionSelected: PropTypes.func,
};

export default withStyles(styles, { name: "HvSuggestions" })(HvSuggestions);
