import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HvActionsGeneric, HvButton, HvCheckBox, HvTypography } from "..";
import styles from "./styles";
import { setId } from "../utils";

/**
 * Bulk Actions allow users to perform an action to a single or multiple items,
 * also known as "batch production" of multiple items at once, one stage at a time.
 */
const HvBulkActions = (props) => {
  const {
    id,
    className,
    classes,
    numTotal = 0,
    numSelected = 0,
    onSelectAll,
    onSelectAllPages,
    selectAllLabel,
    selectAllPagesLabel,
    showSelectAllPages = false,
    semantic = true,
    actions,
    actionsCallback,
    actionsDisabled,
    maxVisibleActions,
    ...others
  } = props;
  const [anySelected, setAnySelected] = useState(false);

  const isSemantic = semantic && anySelected;

  useEffect(() => {
    setAnySelected(numSelected > 0);
  }, [numSelected]);

  const defaultSelectAllLabel = (
    <HvTypography component="span">
      {!anySelected ? (
        <b>All</b>
      ) : (
        <>
          <b>{numSelected}</b>
          {` / ${numTotal}`}
        </>
      )}
    </HvTypography>
  );

  const defaultSelectAllPagesLabel = (
    <HvTypography style={{ color: "inherit" }} variant="highlightText" component="span">
      {`Select all ${numTotal} items across all pages`}
    </HvTypography>
  );

  return (
    <div
      id={id}
      className={clsx(className, classes.root, {
        [classes.semantic]: isSemantic,
      })}
      {...others}
    >
      <div className={classes.selectAllContainer}>
        <HvCheckBox
          id={setId(id, "select")}
          className={classes.selectAll}
          checked={numSelected > 0}
          semantic={isSemantic}
          onChange={(...args) => onSelectAll?.(...args)}
          indeterminate={numSelected > 0 && numSelected < numTotal}
          label={selectAllLabel ?? defaultSelectAllLabel}
        />
        {showSelectAllPages && anySelected && numSelected < numTotal && (
          <HvButton
            id={setId(id, "pages")}
            className={classes.selectAllPages}
            category={isSemantic ? "semantic" : "ghost"}
            onClick={(...args) => onSelectAllPages?.(...args)}
          >
            {selectAllPagesLabel ?? defaultSelectAllPagesLabel}
          </HvButton>
        )}
      </div>
      <HvActionsGeneric
        id={setId(id, "actions")}
        classes={{ root: classes.actions }}
        category={isSemantic ? "semantic" : "ghost"}
        actions={actions}
        disabled={actionsDisabled ?? numSelected === 0}
        actionsCallback={actionsCallback}
        maxVisibleActions={maxVisibleActions}
      />
    </div>
  );
};

HvBulkActions.propTypes = {
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
     * Styles applied to the component root class when semantic and there are selected elements.
     */
    semantic: PropTypes.string,
    /**
     * Styles applied to the Actions root class.
     */
    actions: PropTypes.string,
    /**
     * Styles applied to the Select All container.
     */
    selectAllContainer: PropTypes.string,
    /**
     * Styles applied to the Select All checkbox.
     */
    selectAll: PropTypes.string,
    /**
     * Styles applied to the Select All pages button.
     */
    selectAllPages: PropTypes.string,
  }).isRequired,
  /**
   * Custom label for select all checkbox
   */
  selectAllLabel: PropTypes.node,
  /**
   * Custom label for select all pages button
   */
  selectAllPagesLabel: PropTypes.node,
  /**
   * Whether select all pages element should be visible
   */
  showSelectAllPages: PropTypes.bool,
  /**
   * The total number of elements
   */
  numTotal: PropTypes.number,
  /**
   * The number of elements currently selected
   */
  numSelected: PropTypes.number,
  /**
   * Function called when the "select all" Checkbox is toggled.
   */
  onSelectAll: PropTypes.func,
  /**
   * Function called when the "select all pages" button is clicked toggled.
   */
  onSelectAllPages: PropTypes.func,
  /**
   * Whether the bulk actions should use the semantic styles when there are selected elements.
   */
  semantic: PropTypes.bool,
  /**
   * The renderable content inside the right actions slot,
   * or an Array of actions `{ id, label, icon, disabled, ... }`
   */
  actions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        iconCallback: PropTypes.func,
        disabled: PropTypes.bool,
      })
    ),
  ]),
  /**
   *  Whether actions should be all disabled
   */
  actionsDisabled: PropTypes.bool,
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback: PropTypes.func,
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions: PropTypes.number,
};

export default withStyles(styles, { name: "HvBulkActions" })(HvBulkActions);
