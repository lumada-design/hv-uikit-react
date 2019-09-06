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

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clone from "lodash/cloneDeep";
import isNil from "lodash/isNil";
import classNames from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InnerList from "../../List";
import Search from "../../SearchBox";
import Actions from "../Actions";
import Popper from "../../utils/Popper";
import HvCheckBox from "../../Selectors/CheckBox";

const List = ({
  classes,
  values,
  multiSelect,
  showSearch,
  onChange,
  labels,
  selectDefault,
  notifyChangesOnFirstRender,
  hasTooltips,
  disablePortal,
  isOpen,
  anchorEl,
  handleClickAway
}) => {
  const [searchStr, setSearchStr] = useState();
  const [list, setList] = useState(clone(values));
  const [prevList, setPrevList] = useState(clone(values));
  const [positionUp, setPositionUp] = useState(false);
  const [created, setCreated] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const [anySelected, setAnySelected] = useState(false);
  const [selectionLabel, setSelectionLabel] = useState(labels.selectAll);

  const newLabels = {
    selectAll: labels.selectAll,
    selectionConjunction: labels.multiSelectionConjunction
  };

  /**
   * Find selected values.
   *
   * @param param
   * @returns {*}
   */
  const findSelected = param =>
    param ? param.filter(elem => elem.selected === true) : [];

  /**
   * After the first render, call onChange if notifyChangesOnFirstRender.
   */
  useEffect(() => {
    const newList = findSelected(list);
    if (notifyChangesOnFirstRender) {
      onChange(newList, false, false, true);
    }
    if (list) {
      // eslint-disable-next-line no-use-before-define
      updateSelectionLabel(newList);
    }
  }, []);

  /**
   * Sets the filtered values to the state.
   *
   * @param {String} str - The value that is being looked.
   */
  const handleSearch = str => {
    const results = list
      ? list.filter(value => {
          const valNormalized = value.label.toLowerCase();
          const strNormalized = str.toLowerCase();
          return valNormalized.indexOf(strNormalized) >= 0;
        })
      : null;

    if (!isNil(results)) {
      const newList = list.map(elem => {
        const newElem = { ...elem };
        newElem.isHidden =
          results.find(result => result.label === elem.label) === undefined;
        return newElem;
      });
      setList(newList);
      setSearchStr(str);
    }
    return str;
  };

  /**
   * Create search element.
   *
   * @returns {*}
   */
  const renderSearch = () => (
    <div className={classes.searchContainer}>
      <Search
        value={searchStr}
        values={values}
        onChange={str => handleSearch(str)}
      />
    </div>
  );

  /**
   * Update the selectionLabel.
   *
   * @param selection
   */
  const updateSelectionLabel = selection => {
    const hasSelection = selection.length > 0;

    const { selectAll, multiSelectionConjunction } = labels;

    setSelectionLabel(
      !hasSelection
        ? selectAll
        : `${selection.length} ${multiSelectionConjunction} ${list.length}`
    );
  };

  /**
   * Centralized point to call the prop onChange, altering the selection label.
   * @param selection
   * @param commitChanges
   * @param toggle
   * @param notifyChanges
   */
  const sendOnChange = (selection, commitChanges, toggle, notifyChanges) => {
    onChange(selection, commitChanges, toggle, notifyChanges);
    updateSelectionLabel(selection);
  };

  /**
   * Get selected members.
   * @param sourceList
   * @returns {null}
   */
  const getSelection = sourceList =>
    sourceList ? sourceList.filter(elem => elem.selected) : [];

  /**
   * Update states associated with select all.
   */
  const updateSelectAll = selection => {
    const selectedLength = getSelection(selection).length;
    const hasSelection = selectedLength > 0;
    const allSelect = selectedLength === list.length;

    setAnySelected(hasSelection && !allSelect);
    setAllSelected(hasSelection && allSelect);
  };

  /**
   * Select all the values inside the dropdown.
   *
   * @memberof List
   */
  const handleSelectAll = () => {
    const newList = list.map(elem => {
      const newElem = { ...elem };
      newElem.selected = !allSelected;
      return newElem;
    });

    setList(clone(newList));

    updateSelectAll(newList);

    sendOnChange(newList, false, false, false);
  };

  const renderSelectAll = () => (
    <div className={classes.selectAllContainer}>
      <HvCheckBox
        label={selectionLabel}
        onChange={() => handleSelectAll()}
        classes={{ container: classes.selection }}
        className={classNames([classes.selectAll])}
        indeterminate={anySelected}
        checked={allSelected}
      />
    </div>
  );
  /**
   * Clean the list of selected values.
   */
  const cleanSelection = () => {
    list.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      item.selected = false;
    });
    setList(list);
  };

  /**
   * Set element selected in list.
   *
   * @param elem
   */
  const setSelected = elem => {
    const selectionKey = elem.id ? "id" : "label";
    list.find(
      result => result[selectionKey] === elem[[selectionKey]]
    ).selected = true;
  };

  /**
   * Set hidden to false.
   *
   * @returns {*}
   */
  const cleanHidden = () =>
    list.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      item.isHidden = false;
    });

  /**
   * When selecting the state list is updated with the corresponding selection.
   *
   * @param selected - elements selected.
   */
  const onSelection = selected => {
    cleanSelection();

    if (multiSelect) {
      selected.forEach(elem => {
        setSelected(elem);
      });
    } else {
      setSelected(selected);
    }

    updateSelectAll(list);

    if (multiSelect) {
      setList(list);
      sendOnChange(selected, false, false, false);
    } else {
      cleanHidden();
      setPrevList(clone(list));
      setList(clone(list));
      setSearchStr("");
      sendOnChange([selected], true, true, true);
    }
  };

  /**
   * Cancel the selection in case of no commit reverting the state to it's previous iteration.
   */
  const handleCancel = () => {
    setList(clone(prevList));
    setSearchStr("");
    sendOnChange(getSelection(prevList), true, true, false);
  };

  /**
   * Commits the temporary selection to the state.
   */
  const handleApply = () => {
    cleanHidden();
    setPrevList(clone(list));
    setList(clone(list));
    setSearchStr("");
    sendOnChange(getSelection(list), true, true, true);
  };

  /**
   * Render action buttons.
   */
  const renderActions = () => (
    <div className={classes.actions}>
      <Actions
        onCancel={() => handleCancel()}
        onApply={() => handleApply()}
        labels={labels}
        cancelLabel={labels.cancelLabel}
        applyLabel={labels.applyLabel}
      />
    </div>
  );

  /**
   * When the list is render, it should determine his position.
   *
   * @param data
   */
  const handleListFlip = data => {
    const position = data.flipped;
    if (positionUp !== position) {
      setPositionUp(position);
    }
  };

  const handleListCreate = data => {
    const position = data.flipped;
    if (!created) {
      setPositionUp(position);
      setCreated(true);
    }
  };

  /**
   * Send the indication of click away and cancel any selection.
   *
   * @param evt
   */
  const handleClickAwayInternal = evt => {
    handleCancel();
    handleClickAway(evt);
  };
  const showList = !isNil(values);

  return (
    <Popper
      disablePortal={disablePortal}
      open={isOpen}
      anchorEl={anchorEl}
      placement="bottom"
      popperOptions={{
        onUpdate: data => handleListFlip(data),
        onCreate: data => handleListCreate(data)
      }}
      style={{ zIndex: 1500 }}
    >
      <ClickAwayListener onClickAway={handleClickAwayInternal}>
        <div
          className={classNames([
            classes.list,
            classes.listClosed,
            {
              [classes.listOpenDown]: isOpen && !positionUp,
              [classes.listOpenUp]: isOpen && positionUp
            }
          ])}
        >
          {!positionUp && <div className={classes.listBorderDown} />}

          <div
            className={classNames(classes.rootList, {
              [classes.marginTop]: positionUp && showList
            })}
          >
            {showSearch && renderSearch()}
            {showList && multiSelect && renderSelectAll()}
            <div className={classes.listContainer}>
              {showList && (
                <InnerList
                  values={list}
                  multiSelect={multiSelect}
                  useSelector={multiSelect}
                  showSelectAll={false}
                  onChange={onSelection}
                  labels={newLabels}
                  selectDefault={selectDefault}
                  hasTooltips={hasTooltips}
                  condensed
                />
              )}
            </div>
          </div>
          {showList && multiSelect ? renderActions() : null}

          {positionUp && <div className={classes.listBorderUp} />}
        </div>
      </ClickAwayListener>
    </Popper>
  );
};

List.propTypes = {
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * The list to be rendered.
   */
  values: PropTypes.instanceOf(Array),
  /**
   * If true renders a multi select list.
   */
  multiSelect: PropTypes.bool,
  /**
   * If true renders the search component.
   */
  showSearch: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the list.
   */
  onChange: PropTypes.func,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.instanceOf(Object).isRequired,
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool,
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
  /**
   * Disable the portal behavior. The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * If 'true' list is open.
   */
  isOpen: PropTypes.bool,
  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   * The return value will passed as the reference object of the Popper
   * instance.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Function to be call when clicking away of the list.
   */
  handleClickAway: PropTypes.func
};

List.defaultProps = {
  values: [],
  multiSelect: false,
  showSearch: false,
  onChange() {},
  selectDefault: true,
  notifyChangesOnFirstRender: false,
  hasTooltips: false,
  disablePortal: true,
  isOpen: false,
  anchorEl: null,
  handleClickAway: null
};

export default List;
