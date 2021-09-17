import React, { useMemo, useContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import clsx from "clsx";
import { FilterGroupContext } from "../FilterGroupContext";
import useStyles from "./styles";
import { setId, HvTypography, HvList, HvInput, HvPanel, HvCheckBox } from "../..";

const RightPanel = ({ id, className, labels }) => {
  const classes = useStyles();
  const [searchStr, setSearchStr] = useState("");
  const [allSelected, setAllSelected] = useState(false);
  const [anySelected, setAnySelected] = useState(false);

  const { filterOptions, filterValues, setFilterValues, activeGroup } =
    useContext(FilterGroupContext);

  const activeGroupOptions = useMemo(
    () => filterOptions[activeGroup].data.map((option) => option.id),
    [filterOptions, activeGroup]
  );

  const activeFilterValues = useMemo(
    () => filterValues[activeGroup]?.filter((value) => activeGroupOptions.includes(value)),
    [filterValues, activeGroupOptions, activeGroup]
  );

  const listValues = useMemo(
    () =>
      filterOptions[activeGroup].data.map((option) => ({
        ...option,
        label: option.name,
        selected: filterValues[activeGroup]?.includes(option.id),
        isHidden: option.name.toLowerCase().indexOf(searchStr.toLowerCase()) < 0,
      })),
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
    const newFilterValues = filterOptions.map((option, i) =>
      activeGroup === i
        ? values.filter((v) => v.selected).map((v) => v.id)
        : [...(filterValues[i] || [])]
    );
    setFilterValues(newFilterValues);
  };

  const handleSelectAll = () => {
    const newFilterValues = cloneDeep(filterValues);
    newFilterValues[activeGroup] = anySelected ? [] : activeGroupOptions;

    setFilterValues(newFilterValues);
  };

  /**
   * Create selecteAll component.
   *
   * @returns {*}
   */
  const SelectAll = () => {
    const { selectAll, multiSelectionConjunction } = labels;
    const nbrSelected = activeFilterValues?.length;

    const defaultLabel = (
      <HvTypography component="span">
        {nbrSelected > 0 ? (
          <>
            <b>{nbrSelected}</b>
            {` ${multiSelectionConjunction} ${activeGroupOptions.length}`}
          </>
        ) : (
          <>
            <b>{selectAll}</b>
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
          classes={{ container: classes.selection }}
          className={classes.selectAll}
          indeterminate={anySelected && !allSelected}
          checked={allSelected}
        />
      </div>
    );
  };

  return (
    <HvPanel id={setId(id, "rightPanel")} className={clsx(className, classes.root)}>
      <HvInput
        id={setId(id, "search")}
        classes={{
          root: classes.search,
        }}
        type="search"
        placeholder={labels.searchBoxPlaceholder}
        value={searchStr}
        onChange={(event, str) => setSearchStr(str)}
      />
      <SelectAll />
      <HvList
        key={activeGroup}
        id={setId(id, "list")}
        className={classes.list}
        values={listValues}
        multiSelect
        useSelector
        showSelectAll={false}
        onChange={onChangeHandler}
        selectable
        condensed
        hasTooltips
      />
    </HvPanel>
  );
};

RightPanel.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  labels: PropTypes.shape({
    searchBoxPlaceholder: PropTypes.string,
    selectAll: PropTypes.string,
    multiSelectionConjunction: PropTypes.string,
  }),
};

export default RightPanel;
