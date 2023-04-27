import {
  HvCheckBox,
  HvInput,
  HvList,
  HvPanel,
  HvTypography,
} from "@core/components";
import { setId } from "@core/utils";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { HvFilterGroupContext } from "../FilterGroupContext";
import cloneDeep from "lodash/cloneDeep";
import { ClassNames } from "@emotion/react";
import { styles } from "./RightPanel.styles";

export interface HvFilterGroupRightPanelProps {
  id?: string;
  className?: string;
  labels?: {
    searchBoxPlaceholder?: string;
    selectAll?: string;
    multiSelectionConjunction?: string;
  };
  emptyElement?: React.ReactNode;
}

export const HvFilterGroupRightPanel = ({
  id,
  className,
  labels,
  emptyElement,
}: HvFilterGroupRightPanelProps) => {
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
    () => filterOptions[activeGroup]?.data.map((option) => option.id) || [],
    [filterOptions, activeGroup]
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

  const onChangeHandler = (values) => {
    const newFilterValues = filterOptions.map((_, i) =>
      activeGroup === i
        ? values.filter((v) => v.selected).map((v) => v.id)
        : [...(filterValues[i] || [])]
    );
    setFilterValues(newFilterValues);
  };

  const handleSelectAll = useCallback(() => {
    const newFilterValues = cloneDeep(filterValues);
    newFilterValues[activeGroup] = anySelected ? [] : activeGroupOptions;

    setFilterValues(newFilterValues);
  }, [
    activeGroup,
    activeGroupOptions,
    anySelected,
    filterValues,
    setFilterValues,
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
      <ClassNames>
        {({ css }) => (
          <div className={css(styles.selectAllContainer)}>
            <HvCheckBox
              id={setId(id, "select-all")}
              label={defaultLabel}
              onChange={() => handleSelectAll()}
              className={css(styles.selectAll)}
              indeterminate={anySelected && !allSelected}
              checked={allSelected}
            />
          </div>
        )}
      </ClassNames>
    );
  }, [
    activeFilterValues?.length,
    activeGroupOptions.length,
    allSelected,
    anySelected,
    handleSelectAll,
    id,
    labels,
  ]);

  return (
    <ClassNames>
      {({ css }) => (
        <HvPanel id={setId(id, "rightPanel")} className={className}>
          {listValues.length > 0 ? (
            <>
              <HvInput
                id={setId(id, "search")}
                classes={{
                  root: css(styles.search),
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
                className={css(styles.list)}
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
      )}
    </ClassNames>
  );
};
