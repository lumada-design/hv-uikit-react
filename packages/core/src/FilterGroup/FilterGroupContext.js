import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSavedState } from "../utils";

export const FilterGroupContext = React.createContext({
  activeGroup: 0,
  setActiveGroup: () => {},
  filterOptions: [],
  setFilterOptions: () => {},
  filterValues: [],
  setFilterValues: () => {},
  rollbackFilterValues: () => {},
  clearFilters: () => {},
});

export const FilterGroupProvider = ({ value, filters, children }) => {
  const [group, setActiveGroup] = useState(0);
  const [filterValues, setFilterValues, rollbackFilterValues] = useSavedState(value);

  return (
    <FilterGroupContext.Provider
      value={{
        activeGroup: group,
        setActiveGroup,
        filterOptions: filters,
        filterValues,
        setFilterValues,
        rollbackFilterValues,
        clearFilters: () => setFilterValues([]),
      }}
    >
      {children}
    </FilterGroupContext.Provider>
  );
};

FilterGroupProvider.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  children: PropTypes.node.isRequired,
};
