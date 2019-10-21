/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import map from "lodash/map";
import isNil from "lodash/isNil";
import MoreVert from "@hv/uikit-react-icons/dist/MoreOptionsVertical.S";
import HvCheckbox from "../../../Selectors/CheckBox";
import HvButton from "../../../Button";
import DropDownMenu from "../../../DropDownMenu";
import Cell from "../ListViewCell";
import { ListViewContextConsumer } from "../ListViewContext/ListViewContext";

const renderActions = (
  id,
  actions,
  actionsCallback,
  classes,
  maxVisibleActions
) => {
  if (!Array.isArray(actions)) {
    return React.isValidElement(actions) ? actions : null;
  }

  const renderButton = action => (
    <HvButton
      className={classes.button}
      disabled={action.disabled}
      onClick={() => actionsCallback(id, action)}
      category="ghostSecondary"
      id={id}
      key={id}
    >
      {action.icon && action.icon({ classes })}
      {action.label}
    </HvButton>
  );

  const renderActionsGrid = acts => (
    <div className={classes.actionGrid}>
      {renderButton(acts[0])}
      <DropDownMenu
        className={classes.button}
        icon={<MoreVert />}
        placement="left"
        disablePortal={false}
        onClick={action => actionsCallback(id, action)}
        dataList={acts.slice(1).map(a => ({ ...a, leftIcon: a.icon }))}
      />
    </div>
  );

  return actions.length > maxVisibleActions
    ? renderActionsGrid(actions)
    : actions.map(a => renderButton(a));
};

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
  <Cell
    className={classes.actionSeparator}
    id={`action${id}`}
    key={`action${id}`}
  >
    {renderActions(
      id,
      viewConfiguration.actions,
      viewConfiguration.actionsCallback,
      classes,
      viewConfiguration.maxVisibleActions
    )}
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
  const renderActionsCell = !(
    isNil(viewConfiguration) || isNil(viewConfiguration.actions)
  );
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
      className={classNames(className, classes.root, {
        [classes.selectable]: renderSelectCell,
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
      {renderActionsCell &&
        actionsCell(classes, checkboxValue || id, viewConfiguration)}
    </tr>
  );
};

const ListViewRow = ({
  viewConfiguration,
  classes,
  className,
  id,
  children,
  isSelectable,
  onSelection,
  checkboxValue,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxSemantic,
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

ListViewRow.defaultProps = {
  className: "",
  isSelectable: undefined,
  id: undefined,
  viewConfiguration: null,
  checkboxValue: "",
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined,
  checkboxSemantic: undefined,
  onSelection: () => {}
};

export default ListViewRow;
