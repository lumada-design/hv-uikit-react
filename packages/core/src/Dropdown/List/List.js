import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clone from "lodash/cloneDeep";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { setId } from "../../utils";
import { HvActionBar, HvButton, HvCheckBox, HvList, HvInput, HvTypography } from "../..";
import { getSelected } from "../utils";
import styles from "./styles";

const valuesExist = (values) => !isNil(values) && values?.length > 0;

const List = ({
  id,
  classes,
  values = [],
  multiSelect = false,
  showSearch = false,
  onChange,
  labels,
  notifyChangesOnFirstRender = false,
  hasTooltips = false,
  singleSelectionToggle,
  ...others
}) => {
  const [searchStr, setSearchStr] = useState("");
  const [list, setList] = useState(clone(values));
  const [allSelected, setAllSelected] = useState(false);
  const [anySelected, setAnySelected] = useState(false);

  const newLabels = {
    selectAll: labels.selectAll,
    selectionConjunction: labels.multiSelectionConjunction,
  };

  /**
   * Update states associated with select all.
   */
  const updateSelectAll = (listValues) => {
    if (!listValues) return;
    const nbrSelected = getSelected(listValues).length;
    const hasSelection = nbrSelected > 0;
    const allSelect = nbrSelected === listValues.length;

    setAnySelected(hasSelection);
    setAllSelected(hasSelection && allSelect);
  };

  /**
   * After the first render, call onChange if notifyChangesOnFirstRender.
   */
  useEffect(() => {
    if (!valuesExist(values)) return;
    setList(clone(values));
    updateSelectAll(values);
    if (notifyChangesOnFirstRender) {
      onChange?.(values, false, false, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  /**
   * Sets the filtered values to the state.
   *
   * @param {String} str - The value that is being looked.
   */
  const handleSearch = (str) => {
    const results = list
      ? list.filter((value) => value.label.toLowerCase().indexOf(str.toLowerCase()) >= 0)
      : null;

    if (!isNil(results)) {
      const newList = list.map((elem) => {
        const isResult = results.find((result) => result.label === elem.label);
        return { ...elem, isHidden: !isResult };
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
      <HvInput
        id={setId(id, "search")}
        type="search"
        value={searchStr}
        placeholder={labels.searchPlaceholder}
        onChange={(event, str) => handleSearch(str)}
      />
    </div>
  );

  /**
   * Select all the values inside the dropdown.
   *
   */
  const handleSelectAll = () => {
    const newList = list.map((elem) => ({ ...elem, selected: !anySelected }));
    setList(newList);
    updateSelectAll(newList);
  };

  /**
   * Create selecteAll component.
   *
   * @returns {*}
   */
  const renderSelectAll = () => {
    const { selectAll, multiSelectionConjunction } = labels;
    const nbrSelected = getSelected(list).length;

    const defaultLabel = (
      <HvTypography component="span">
        {nbrSelected > 0 ? (
          <>
            <b>{nbrSelected}</b>
            {` ${multiSelectionConjunction} ${list.length}`}
          </>
        ) : (
          <>
            <b>{selectAll}</b>
            {` (${list.length})`}
          </>
        )}
      </HvTypography>
    );

    return (
      <div className={classes.selectAllContainer}>
        <HvCheckBox
          id={setId(id, "select-all")}
          label={defaultLabel}
          onChange={() => handleSelectAll()}
          classes={{ container: classes.selection }}
          className={classes.selectAll}
          indeterminate={anySelected && !allSelected}
          checked={allSelected}
        />
      </div>
    );
  };

  /**
   * Set all hidden's to false.
   *
   * @returns {*}
   */
  const cleanHidden = (lst) => lst.map((item) => ({ ...item, isHidden: false }));

  /**
   * When selecting the state list is updated with the corresponding selection.
   *
   * @param listValues - elements selected.
   */
  const onSelection = (listValues) => {
    if (!multiSelect) {
      onChange(cleanHidden(listValues), true, true, true);
    } else {
      updateSelectAll(listValues);
      setList(clone(listValues));
    }
  };

  /**
   * Render action buttons.
   */
  const renderActions = () => {
    const { applyLabel, cancelLabel } = labels;
    return (
      <HvActionBar id={setId(id, "actions")}>
        <HvButton
          id={setId(id, "actions-apply")}
          onClick={() => onChange(cleanHidden(list), true, true, true)}
          category="ghost"
        >
          {applyLabel}
        </HvButton>
        <HvButton
          id={setId(id, "actions-cancel")}
          onClick={() => onChange(null, false, true, false)}
          category="ghost"
        >
          {cancelLabel}
        </HvButton>
      </HvActionBar>
    );
  };

  const showList = valuesExist(values);

  return (
    <div className={classes.rootList}>
      <div className={classes.listBorderDown} />
      <div className={classes.listContainer}>
        {showSearch && renderSearch()}
        {showList && multiSelect && renderSelectAll()}
        {showList && (
          <HvList
            id={setId(id, "list")}
            classes={{
              root: classes.dropdownListContainer,
            }}
            values={list}
            multiSelect={multiSelect}
            useSelector={multiSelect}
            showSelectAll={false}
            onChange={onSelection}
            labels={newLabels}
            hasTooltips={hasTooltips}
            selectable
            condensed
            singleSelectionToggle={singleSelectionToggle}
            {...others}
          />
        )}
      </div>
      {showList && multiSelect ? renderActions() : null}
    </div>
  );
};

List.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string.isRequired,
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
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool.isRequired,
};

export default withStyles(styles, { name: "HvDropdownList" })(List);
