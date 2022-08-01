import React, { useContext, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { makeStyles, withStyles, useTheme } from "@mui/styles";

import { setId } from "../../utils";
import { HvActionBar, HvButton, HvCheckBox, HvList, HvInput, HvTypography } from "../..";
import { getSelected } from "../utils";
import styles from "./styles";
import BaseDropdownContext from "../../BaseDropdown/BaseDropdownContext";

/**
 * The values property was being deeply cloned. That created a significant performance
 * hit when the values contained complex properties' values, like React Nodes.
 *
 * For minimizing the impact of removing the clone, a shallow clone of the array and its
 * objects is performed instead. That should have the same effect in the majority of the
 * cases, where the properties' values are primitive.
 */
const clone = (values) => values.map((value) => ({ ...value }));

/**
 * Set all hidden's to false.
 */
const cleanHidden = (lst) => lst.map((item) => ({ ...item, isHidden: false }));

const valuesExist = (values) => !isNil(values) && values?.length > 0;

const List = ({
  id,
  classes,
  values = [],
  multiSelect = false,
  showSearch = false,
  onChange,
  onCancel,
  labels,
  notifyChangesOnFirstRender = false,
  hasTooltips = false,
  singleSelectionToggle,
  height: dropdownHeight,
  virtualized = false,
  ...others
}) => {
  const [searchStr, setSearchStr] = useState("");
  const [list, setList] = useState(clone(values));
  const [allSelected, setAllSelected] = useState(false);
  const [anySelected, setAnySelected] = useState(false);
  const { width, height } = useContext(BaseDropdownContext);
  const theme = useTheme();

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
      ? list.filter(({ searchValue, label, value }) => {
          let stringValue = "";
          if (typeof searchValue === "string" || searchValue instanceof String) {
            stringValue = searchValue.toLowerCase();
          } else if (typeof label === "string" || label instanceof String) {
            stringValue = label.toLowerCase();
          } else if (typeof value === "string" || value instanceof String) {
            stringValue = value.toLowerCase();
          }

          return stringValue.indexOf(str.toLowerCase()) >= 0;
        })
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
        <HvButton id={setId(id, "actions-cancel")} onClick={onCancel} category="ghost">
          {cancelLabel}
        </HvButton>
      </HvActionBar>
    );
  };

  const showList = valuesExist(values);

  const maxSizeClasses = useMemo(
    () =>
      makeStyles({
        root: {
          ...(dropdownHeight && { height: dropdownHeight }),
          maxWidth: width,
          maxHeight: `calc(${height}px - 32px - ${theme.spacing("xs")} - ${theme.spacing("sm")})`,
          overflow: "auto",
          padding: 5,
        },
        virtualized: {
          maxWidth: "inherit",
          maxHeight: "inherit",
          overflow: "inherit",
          padding: 0,
        },
      }),
    [width, height, dropdownHeight, theme]
  )();

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
              root: clsx(
                classes.dropdownListContainer,
                dropdownHeight && maxSizeClasses.root,
                virtualized && maxSizeClasses.virtualized
              ),
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
            height={dropdownHeight}
            virtualized={virtualized}
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
   * A function to be executed whenever a item is selected in the list
   * or the Apply button is activated (when `multiSelect` is `true`).
   */
  onChange: PropTypes.func,
  /**
   * A function to be executed whenever the Cancel button is activated.
   */
  onCancel: PropTypes.func,
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
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height: PropTypes.number,
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized: PropTypes.bool,
};

export default withStyles(styles, { name: "HvDropdownList" })(List);
