import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import map from "lodash/map";
import isNil from "lodash/isNil";
import { withStyles } from "@mui/styles";
import { HvCheckBox, HvActionsGeneric, withId, HvFocus } from "@hitachivantara/uikit-react-core";
import Cell from "../ListViewCell";
import { ListViewContextConsumer } from "../ListViewContext/ListViewContext";
import styles from "./styles";
import setActionsId from "../../setActionsId";

const getValue = (checkboxProps) =>
  checkboxProps && checkboxProps.value ? checkboxProps.value : false;

const selectCell = (classes, onCheckboxSelected, checkboxProps, checked, semantic, id) => {
  return (
    <div
      className={classes.selectCell}
      semantic={semantic}
      id={`checkbox-cell-${id}`}
      key={`checkbox${id}`}
    >
      <HvCheckBox
        className={classes.checkboxPlacement}
        onChange={onCheckboxSelected}
        checked={checked}
        id={`checkbox-${id}`}
        {...checkboxProps}
      />
    </div>
  );
};

const actionsCell = (classes, id, viewConfiguration) => {
  return (
    <Cell className={classes.actionSeparator} id={`action-cell-${id}`} key={`action${id}`}>
      <HvActionsGeneric
        id={id}
        actions={setActionsId(viewConfiguration.actions, id)}
        actionsCallback={viewConfiguration.actionsCallback}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
      />
    </Cell>
  );
};

const row = (
  viewConfiguration,
  classes,
  className,
  children,
  id,
  isSelectable,
  onSelection,
  checkboxProps,
  checked,
  semantic,
  containerRef,
  others
) => {
  const columnConfiguration =
    isNil(viewConfiguration) || isNil(viewConfiguration.columnConfiguration)
      ? null
      : viewConfiguration.columnConfiguration;
  const onCheckboxSelected =
    isNil(viewConfiguration) || isNil(viewConfiguration.onSelection)
      ? onSelection
      : viewConfiguration.onSelection;
  let renderSelectCell = !isNil(isSelectable);
  renderSelectCell =
    isNil(viewConfiguration) || isNil(viewConfiguration.isSelectable)
      ? renderSelectCell
      : viewConfiguration.isSelectable;
  const renderActionsCell = !(isNil(viewConfiguration) || isNil(viewConfiguration.actions));
  const clonedChildren = map(children, (child, index) => {
    if (!isNil(columnConfiguration)) {
      return React.cloneElement(child, {
        style: {
          ...columnConfiguration[index].style,
        },
        cellSpacing: columnConfiguration[index].spacing,
        columnIndex: index,
      });
    }
    return child;
  });

  return (
    <HvFocus
      rootRef={containerRef}
      key={`row-${id}`}
      strategy="grid"
      filterClass="grid"
      navigationJump={1}
      focusDisabled={false}
    >
      <li
        id={`row-${id}`}
        key={`row-${id}`}
        className={clsx(className, classes.root, {
          [classes.selectable]: renderSelectCell,
          [classes.selected]: checked,
          [classes.notSelectable]: !renderSelectCell,
        })}
        {...others}
      >
        {renderSelectCell &&
          selectCell(classes, onCheckboxSelected, checkboxProps, checked, semantic, id)}
        {clonedChildren}
        {renderActionsCell &&
          actionsCell(classes, getValue(checkboxProps) || id, viewConfiguration)}
      </li>
    </HvFocus>
  );
};

const ListViewRow = ({
  id,
  viewConfiguration,
  classes,
  className,
  children,
  isSelectable,
  onSelection,
  checkboxProps,
  checked,
  semantic,
  ...others
}) => {
  return (
    <ListViewContextConsumer>
      {(contextConfiguration) => {
        const { containerRef } = contextConfiguration;
        if (contextConfiguration && isNil(viewConfiguration)) {
          return row(
            contextConfiguration,
            classes,
            className,
            children,
            id,
            isSelectable,
            onSelection,
            checkboxProps,
            checked,
            semantic,
            containerRef,
            others
          );
        }
        return row(
          viewConfiguration,
          classes,
          className,
          children,
          id,
          isSelectable,
          onSelection,
          checkboxProps,
          checked,
          semantic,
          containerRef,
          others
        );
      }}
    </ListViewContextConsumer>
  );
};

ListViewRow.propTypes = {
  /**
   * Id to be applied to the root node this value is used to identify the checkbox clicks or actions.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * This value is provided by the asset inventory list view and contains necessary configurations for the columns.
   */
  viewConfiguration: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the root class.
     */
    root: PropTypes.string,
  }).isRequired,
  /**
   * The content inside the row.
   */
  children: PropTypes.node.isRequired,
  /**
   *  The function that will be executed when the row is selected.
   */
  onSelection: PropTypes.func,
  /**
   * `true` if the row should have a checkbox in the the left part to be selectable `false` if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   * Whether the checkbox is selected or not.
   *
   * Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checked: PropTypes.bool,
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckBox API.
   */
  checkboxProps: PropTypes.instanceOf(Object),
  /**
   *  The border to the right of the checkbox
   */
  semantic: PropTypes.oneOf([
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9",
    "sema10",
    "sema11",
    "sema12",
    "sema13",
    "sema14",
    "sema15",
    "sema16",
    "sema17",
    "sema18",
    "sema19",
    "atmo1",
    "atmo2",
    "atmo3",
    "atmo4",
    "atmo5",
  ]),
};

export default withStyles(styles, { name: "HvListViewRow" })(withId(ListViewRow));
