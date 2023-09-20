import { MouseEvent, useContext, useEffect, useState } from "react";

import { theme } from "@hitachivantara/uikit-styles";

import isNil from "lodash/isNil";

import { setId } from "@core/utils/setId";
import { HvTypography } from "@core/components/Typography";
import { HvButton } from "@core/components/Button";
import { HvCheckBox } from "@core/components/CheckBox";
import { HvInput } from "@core/components/Input";
import { HvList, HvListProps, HvListValue } from "@core/components/List";
import { HvActionBar } from "@core/components/ActionBar";
import BaseDropdownContext from "@core/components/BaseDropdown/BaseDropdownContext";
import { ExtractNames } from "@core/utils/classes";

import { useDefaultProps } from "@core/hooks";
import { staticClasses, useClasses } from "./List.styles";
import { getSelected } from "../utils";
import { HvDropdownLabelsProps } from "../types";

export { staticClasses as dropdownListClasses };

export type HvDropdownListClasses = ExtractNames<typeof useClasses>;

export interface HvDropdownListProps {
  /**
   * Id to be applied to the root node.
   */
  id?: string;
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes?: HvDropdownListClasses;
  /**
   * The list to be rendered.
   */
  values?: HvListValue[];
  /**
   * If true renders a multi select list.
   */
  multiSelect?: boolean;
  /**
   * If true renders the search component.
   */
  showSearch?: boolean;
  /**
   * A function to be executed whenever a item is selected in the list
   * or the Apply button is activated (when `multiSelect` is `true`).
   */
  onChange: (
    /** An array containing the selected values */
    listValues: HvListValue[],
    /** If `true` the selection if finally committed the dropdown header text should reflect the new selection */
    commitChanges: boolean,
    /** If `true` the dropdown should toggle it's current state */
    toggle: boolean,
    /** If `true` the dropdown will call onChange */
    notifyChanges: boolean
  ) => void;
  /**
   * A function to be executed whenever the Cancel button is activated.
   */
  onCancel: (event: MouseEvent) => void;
  /**
   * An object containing all the labels for the dropdown.
   */
  labels?: HvDropdownLabelsProps;
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender?: boolean;
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips?: boolean;
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle?: boolean;
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height?: number;
  /**
   * Experimental. Max height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class.
   */
  maxHeight?: number;
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized?: boolean;
}

/**
 * The values property was being deeply cloned. That created a significant performance
 * hit when the values contained complex properties' values, like React Nodes.
 *
 * For minimizing the impact of removing the clone, a shallow clone of the array and its
 * objects is performed instead. That should have the same effect in the majority of the
 * cases, where the properties' values are primitive.
 */
const clone = (values: HvListValue[]) => values.map((value) => ({ ...value }));

/**
 * Set all hidden's to false.
 */
const cleanHidden = (lst: HvListValue[]) =>
  lst.map((item) => ({ ...item, isHidden: false }));

const valuesExist = (values: HvListValue[]) =>
  !isNil(values) && values?.length > 0;

export const HvDropdownList = (props: HvDropdownListProps) => {
  const {
    id,
    classes: classesProp,
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
    maxHeight,
    virtualized = false,
    ...others
  } = useDefaultProps("HvDropdownList", props);
  const { classes, cx, css } = useClasses(classesProp);

  const [searchStr, setSearchStr] = useState<string>("");
  const [list, setList] = useState<HvListValue[]>(clone(values));
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [anySelected, setAnySelected] = useState<boolean>(false);
  const { width, height } = useContext(BaseDropdownContext);

  const newLabels = {
    selectAll: labels?.selectAll,
    selectionConjunction: labels?.multiSelectionConjunction,
  };

  /**
   * Update states associated with select all.
   */
  const updateSelectAll = (listValues: HvListValue[]) => {
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
  }, [values, notifyChangesOnFirstRender, onChange]);

  /**
   * Sets the filtered values to the state.
   *
   * @param {String} str - The value that is being looked.
   */
  const handleSearch = (str: string) => {
    const results = list
      ? list.filter(
          ({
            searchValue,
            label,
            value,
          }: {
            searchValue?: any;
            label?: any;
            value?: any;
          }) => {
            let stringValue = "";
            if (
              typeof searchValue === "string" ||
              searchValue instanceof String
            ) {
              stringValue = searchValue.toLowerCase();
            } else if (typeof label === "string" || label instanceof String) {
              stringValue = label.toLowerCase();
            } else if (typeof value === "string" || value instanceof String) {
              stringValue = value.toLowerCase();
            }

            return stringValue.indexOf(str.toLowerCase()) >= 0;
          }
        )
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
        placeholder={labels?.searchPlaceholder}
        aria-label={labels?.searchPlaceholder}
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
    const selectAll = labels?.selectAll;
    const multiSelectionConjunction = labels?.multiSelectionConjunction;
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
          classes={{
            container: classes.selection,
          }}
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
  const onSelection: HvListProps["onChange"] = (listValues) => {
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
    const applyLabel = labels?.applyLabel;
    const cancelLabel = labels?.cancelLabel;
    return (
      <HvActionBar id={setId(id, "actions")}>
        <HvButton
          id={setId(id, "actions-apply")}
          onClick={() => onChange(cleanHidden(list), true, true, true)}
          variant="primaryGhost"
        >
          {applyLabel}
        </HvButton>
        <HvButton
          id={setId(id, "actions-cancel")}
          onClick={onCancel}
          variant="primaryGhost"
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
              root: cx(
                classes.dropdownListContainer,
                css({
                  maxWidth: width,
                  maxHeight:
                    maxHeight ??
                    `calc(${height}px - 32px - ${theme.space.xs} - ${theme.space.sm})`,
                  overflow: "auto",
                  padding: 4,
                  margin: -4,
                }),
                dropdownHeight &&
                  css({
                    height: dropdownHeight,
                  }),
                virtualized &&
                  css({
                    maxWidth: "inherit",
                    maxHeight: "inherit",
                    overflow: "inherit",
                    padding: 0,
                  })
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
