import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { HvInput, setId } from "@hitachivantara/uikit-react-core";

const searchOperationSetup = (metadata = []) => metadata.filter((element) => element.searchable);

const filter = (value, criteria, searchValue) => {
  const evalValue = get(value, criteria.accessor);

  if (criteria.searchFunction) return criteria.searchFunction(evalValue, searchValue);

  switch (criteria.cellType.toUpperCase()) {
    case "NUMERIC":
      return evalValue.toString().includes(searchValue.toString());
    case "ALPHA-NUMERIC":
      return evalValue.toUpperCase().includes(searchValue.toUpperCase());
    case "DATE":
      return new Date(evalValue).getTime() === new Date(searchValue).getTime();
    default:
      return value === searchValue;
  }
};

const searchOperation = (searchValue, values, searchableCriteria) => {
  const filteredValues = [];

  searchableCriteria.forEach((criteria) => {
    values.forEach((value) => {
      if (filter(value, criteria, searchValue) && !filteredValues.includes(value))
        filteredValues.push(value);
    });
  });

  return filteredValues;
};

const Search = ({ id, labels, searchString, onFilter, onSearch, values, metadata, ...others }) => {
  const searchableCriteria = searchOperationSetup(metadata);

  const handler = (event, value) => {
    const filteredResults = searchOperation(value, values, searchableCriteria);
    onFilter(filteredResults, value);
    return value;
  };

  return (
    <HvInput
      id={setId(id, "search")}
      type="search"
      placeholder={labels.placeholder}
      value={searchString}
      onChange={onSearch || handler}
      role="search"
      aria-label={labels.inputLabel}
      {...others}
    />
  );
};

Search.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Data passed to the component.
   */
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  /**
   * The label of the input.
   */
  label: PropTypes.node,
  /**
   * The placeholder value of the input.
   */
  placeholder: PropTypes.string,
  /**
   * Metadata associated with the values.
   */
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      accessor: PropTypes.string,
      cellType: PropTypes.oneOf(["alpha-numeric", "numeric", "date", "node"]),
      sortable: PropTypes.bool,
      sortFunction: PropTypes.func,
      searchable: PropTypes.bool,
      searchFunction: PropTypes.func,
    })
  ).isRequired,
  /**
   * Callback function returning the filtered data.
   */
  onFilter: PropTypes.func.isRequired,
  /**
   * onSearch callback.
   */
  onSearch: PropTypes.func,
  /**
   * Search string
   */
  searchString: PropTypes.string,
  /**
   * Labels passed from the `HvAssetInventory`
   */
  labels: PropTypes.instanceOf(Object),
};

export default Search;
export { searchOperation, filter, searchOperationSetup };
