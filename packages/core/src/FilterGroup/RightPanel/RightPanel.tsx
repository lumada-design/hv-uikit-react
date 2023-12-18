import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import cloneDeep from "lodash/cloneDeep";

import { HvCheckBox } from "../../CheckBox";
import { HvInput } from "../../Input";
import { HvList, HvListProps } from "../../List";
import { HvPanel } from "../../Panel";
import { HvTypography } from "../../Typography";
import { ExtractNames } from "../../utils/classes";
import { setId } from "../../utils/setId";

import { HvFilterGroupContext } from "../FilterGroupContext";
import { staticClasses, useClasses } from "./RightPanel.styles";

export { staticClasses as filterGroupRightPanelClasses };

export type HvFilterGroupRightPanelClasses = ExtractNames<typeof useClasses>;

export interface HvFilterGroupRightPanelProps {
  id?: string;
  className?: string;
  labels?: {
    searchBoxPlaceholder?: string;
    selectAll?: string;
    multiSelectionConjunction?: string;
  };
  emptyElement?: React.ReactNode;
  classes?: HvFilterGroupRightPanelClasses;
}

export const HvFilterGroupRightPanel = ({
  id,
  className,
  labels,
  emptyElement,
  classes: classesProp,
}: HvFilterGroupRightPanelProps) => {
  const { classes } = useClasses(classesProp);
  const [searchStr, setSearchStr] = useState<string>("");
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [anySelected, setAnySelected] = useState<boolean>(false);

  const {
    filterOptions,
    filterValues = [],
    setFilterValues,
    activeGroup,
  } = useContext(HvFilterGroupContext);

  const activeGroupOptions = useMemo(
    () =>
      filterOptions[activeGroup]?.data
        .filter((option) =>
          option.name.toLowerCase().includes(searchStr.toLowerCase())
        )
        .map((option) => option.id) || [],
    [filterOptions, activeGroup, searchStr]
  );

  const activeFilterValues = useMemo(
    () =>
      filterValues[activeGroup]?.filter((value) =>
        activeGroupOptions.includes(value)
      ) || [],
    [filterValues, activeGroupOptions, activeGroup]
  );

  const listValues = useMemo(
    () =>
      filterOptions[activeGroup]?.data.map((option) => ({
        ...option,
        label: option.name,
        selected: filterValues[activeGroup]?.includes(option.id),
        isHidden:
          option.name.toLowerCase().indexOf(searchStr.toLowerCase()) < 0,
      })) || [],
    [filterOptions, filterValues, activeGroup, searchStr]
  );

  const updateSelectAll = useCallback(() => {
    const nbrSelected = activeFilterValues?.length;
    const hasSelection = nbrSelected > 0;
    const allSelect = nbrSelected === activeGroupOptions.length;

    setAnySelected(hasSelection);
    setAllSelected(hasSelection && allSelect);
  }, [activeFilterValues, activeGroupOptions]);

  useEffect(() => {
    updateSelectAll();
  }, [activeFilterValues, updateSelectAll]);

  useEffect(() => setSearchStr(""), [activeGroup]);

  const onChangeHandler: HvListProps["onChange"] = (values) => {
    const newFilterValues = filterOptions.map((_, i) =>
      activeGroup === i
        ? values.filter((v) => v.selected).map((v) => v.id)
        : [...(filterValues[i] || [])]
    );
    setFilterValues(newFilterValues as any);
  };

  const handleSelectAll = useCallback(() => {
    const newFilterValues = cloneDeep(filterValues);

    if (anySelected) {
      if (searchStr !== "") {
        newFilterValues[activeGroup] = filterValues[activeGroup]?.filter(
          (value) => !activeGroupOptions.includes(value)
        );
      } else {
        newFilterValues[activeGroup] = [];
      }
    } else {
      newFilterValues[activeGroup] = [
        ...filterValues[activeGroup],
        ...activeGroupOptions,
      ];
    }

    setFilterValues(newFilterValues);
  }, [
    activeGroup,
    activeGroupOptions,
    anySelected,
    filterValues,
    setFilterValues,
    searchStr,
  ]);

  /**
   * Create selectAll component.
   *
   * @returns {*}
   */
  const SelectAll = useCallback(() => {
    const nbrSelected = activeFilterValues?.length;

    const defaultLabel = (
      <HvTypography component="span">
        {nbrSelected > 0 ? (
          <>
            <b>{nbrSelected}</b>
            {` ${labels?.multiSelectionConjunction} ${activeGroupOptions.length}`}
          </>
        ) : (
          <>
            <b>{labels?.selectAll}</b>
            {` (${activeGroupOptions.length})`}
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
          className={classes.selectAll}
          indeterminate={anySelected && !allSelected}
          checked={allSelected}
        />
      </div>
    );
  }, [
    activeFilterValues?.length,
    activeGroupOptions.length,
    allSelected,
    anySelected,
    handleSelectAll,
    id,
    labels,
    classes?.selectAllContainer,
    classes?.selectAll,
  ]);

  return (
    <HvPanel id={setId(id, "rightPanel")} className={className}>
      {listValues.length > 0 ? (
        <>
          <HvInput
            id={setId(id, "search")}
            classes={{
              root: classes.search,
            }}
            type="search"
            placeholder={labels?.searchBoxPlaceholder}
            value={searchStr}
            onChange={(_, str) => setSearchStr(str)}
          />
          <SelectAll />
          <HvList
            key={activeGroup}
            id={setId(id, "list")}
            values={listValues}
            className={classes.list}
            multiSelect
            useSelector
            showSelectAll={false}
            onChange={onChangeHandler}
            selectable
            condensed
            hasTooltips
          />
        </>
      ) : (
        emptyElement
      )}
    </HvPanel>
  );
};
