import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useSavedState } from "../utils";

export const FilterGroupContext = React.createContext({
  activeGroup: 0,
  setActiveGroup: () => {},
  filterOptions: [],
  setFilterOptions: () => {},
  filterValues: [],
  setFilterValues: () => {},
  rollbackFilters: () => {},
  clearFilters: () => {},
  applyFilters: () => {},
  applyDisabled: false,
});

const groups = (filters) => filters.map(() => []);

export const FilterGroupProvider = ({ value, filters, children }) => {
  const [group, setActiveGroup] = useState(0);
  const [filterValues, setFilterValues, rollbackFilters, appliedFilters] = useSavedState(
    value || groups(filters)
  );
  const [applyDisabled, setApplyDisabled] = useState(false);

  useEffect(() => {
    setApplyDisabled(isEqual(filterValues, appliedFilters));
  }, [filterValues, appliedFilters]);

  const clearFilters = () => {
    setFilterValues(groups(filters));
  };

  const applyFilters = () => {
    setFilterValues(filterValues, true);
  };

  return (
    <FilterGroupContext.Provider
      value={{
        activeGroup: group,
        setActiveGroup,
        filterOptions: filters,
        filterValues,
        setFilterValues,
        appliedFilters,
        rollbackFilters,
        clearFilters,
        applyFilters,
        applyDisabled,
      }}
    >
      {children}
    </FilterGroupContext.Provider>
  );
};

FilterGroupProvider.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  children: PropTypes.node.isRequired,
};
