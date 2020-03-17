import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import map from "lodash/map";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import HvCheckbox from "../../../Selectors/CheckBox";
import Actions from "../../../Actions";
import Cell from "../ListViewCell";
import { ListViewContextConsumer } from "../ListViewContext/ListViewContext";
import styles from "./styles";

const selectCell = (
  classes,
  onCheckboxSelected,
  checkboxValue,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxSemantic,
  id
) => (
  <Cell
    className={classes.selectCell}
    semantic={checkboxSemantic}
    id={`checkbox${id}`}
    key={`checkbox${id}`}
  >
    <HvCheckbox
      value={checkboxValue}
      onChange={onCheckboxSelected}
      checked={checkboxSelected}
      indeterminate={checkboxIndeterminate}
      id={id}
    />
  </Cell>
);

const actionsCell = (classes, id, viewConfiguration) => (
  <Cell className={classes.actionSeparator} id={`action${id}`} key={`action${id}`}>
    <Actions
      id={id}
      actions={viewConfiguration.actions}
      actionsCallback={viewConfiguration.actionsCallback}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
    />
  </Cell>
);

const row = (
  viewConfiguration,
  classes,
  className,
  children,
  id,
  isSelectable,
  onSelection,
  checkboxValue,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxSemantic,
  other
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
          ...columnConfiguration[index].style
        },
        cellSpacing: columnConfiguration[index].spacing,
        columnIndex: index
      });
    }
    return child;
  });

  return (
    <tr
      id={id}
      key={id}
      className={clsx(className, classes.root, {
        [classes.selectable]: renderSelectCell,
        [classes.selected]: checkboxSelected,
        [classes.notSelectable]: !renderSelectCell
      })}
      {...other}
    >
      {renderSelectCell &&
        selectCell(
          classes,
          onCheckboxSelected,
          checkboxValue,
          checkboxSelected,
          checkboxIndeterminate,
          checkboxSemantic,
          id
        )}
      {clonedChildren}
      {renderActionsCell && actionsCell(classes, checkboxValue || id, viewConfiguration)}
    </tr>
  );
};

const ListViewRow = ({
  viewConfiguration = null,
  classes,
  className = "",
  id = undefined,
  children,
  isSelectable = undefined,
  onSelection = () => {},
  checkboxValue = "",
  checkboxSelected = undefined,
  checkboxIndeterminate = undefined,
  checkboxSemantic = undefined,
  ...other
}) => (
  <ListViewContextConsumer>
    {contextConfiguration => {
      if (contextConfiguration && isNil(viewConfiguration)) {
        return row(
          contextConfiguration,
          classes,
          className,
          children,
          id,
          isSelectable,
          onSelection,
          checkboxValue,
          checkboxSelected,
          checkboxIndeterminate,
          checkboxSemantic,
          other
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
        checkboxValue,
        checkboxSelected,
        checkboxIndeterminate,
        checkboxSemantic,
        other
      );
    }}
  </ListViewContextConsumer>
);

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
    root: PropTypes.string
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
   * ´true´ if the row should have a checkbox in the the left part to be selectable ´false´ if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The value the checkbox in the in the left part of the row will return when selected.
   */
  checkboxValue: PropTypes.string,
  /**
   *  ´true´ if the checkbox is selected or ´false´ if not selected.
   *
   *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checkboxSelected: PropTypes.bool,
  /**
   *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
   */
  checkboxIndeterminate: PropTypes.bool,
  /**
   *  The border to the right of the checkbox
   */
  checkboxSemantic: PropTypes.oneOf([
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
    "atmo6"
  ])
};

export default withStyles(styles, { name: "HvListViewRow" })(ListViewRow);
