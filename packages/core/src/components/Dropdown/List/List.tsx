import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { setId } from "utils";
import {
  HvActionBar,
  HvButton,
  HvCheckBox,
  HvInput,
  HvListValue,
  HvTypography,
} from "components";
import BaseDropdownContext from "../../BaseDropdown/BaseDropdownContext";
import {
  StyledList,
  StyledListContainer,
  StyledRootList,
  StyledSearchContainer,
} from "./List.styles";
import { getSelected } from "../utils";
import { HvDropdownLabelsProps } from "../Dropdown";
import dropdownListClasses, { HvDropdownListClasses } from "./listClasses";

export type HvDropdownListProps = {
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
  onChange: any;
  /**
   * A function to be executed whenever the Cancel button is activated.
   */
  onCancel: any;
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
};

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

const valuesExist = (values) => !isNil(values) && values?.length > 0;

export const HvDropdownList = ({
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
  maxHeight,
  virtualized = false,
  ...others
}: HvDropdownListProps) => {
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
  }, [values]);

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
    <StyledSearchContainer
      className={clsx(
        dropdownListClasses.searchContainer,
        classes?.searchContainer
      )}
    >
      <HvInput
        id={setId(id, "search")}
        type="search"
        value={searchStr}
        placeholder={labels?.searchPlaceholder}
        onChange={(event, str) => handleSearch(str)}
      />
    </StyledSearchContainer>
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
      <div
        className={clsx(
          dropdownListClasses.selectAllContainer,
          classes?.selectAllContainer
        )}
      >
        <HvCheckBox
          id={setId(id, "select-all")}
          label={defaultLabel}
          onChange={() => handleSelectAll()}
          classes={{
            container: clsx(dropdownListClasses.selection, classes?.selection),
          }}
          className={clsx(dropdownListClasses.selectAll, classes?.selectAll)}
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
    const applyLabel = labels?.applyLabel;
    const cancelLabel = labels?.cancelLabel;
    return (
      <HvActionBar id={setId(id, "actions")}>
        <HvButton
          id={setId(id, "actions-apply")}
          onClick={() => onChange(cleanHidden(list), true, true, true)}
          variant="ghost"
        >
          {applyLabel}
        </HvButton>
        <HvButton
          id={setId(id, "actions-cancel")}
          onClick={onCancel}
          variant="ghost"
        >
          {cancelLabel}
        </HvButton>
      </HvActionBar>
    );
  };

  const showList = valuesExist(values);

  return (
    <StyledRootList
      className={clsx(dropdownListClasses.rootList, classes?.rootList)}
    >
      <div
        className={clsx(
          dropdownListClasses.listBorderDown,
          classes?.listBorderDown
        )}
      />
      <StyledListContainer
        className={clsx(
          dropdownListClasses.listContainer,
          classes?.listContainer
        )}
      >
        {showSearch && renderSearch()}
        {showList && multiSelect && renderSelectAll()}
        {showList && (
          <StyledList
            id={setId(id, "list")}
            classes={{
              root: clsx(
                dropdownListClasses.dropdownListContainer,
                classes?.dropdownListContainer
              ),
            }}
            $dropdownHeight={dropdownHeight}
            $maxHeight={maxHeight}
            $virtualized={virtualized}
            $height={height}
            $width={width}
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
      </StyledListContainer>
      {showList && multiSelect ? renderActions() : null}
    </StyledRootList>
  );
};
