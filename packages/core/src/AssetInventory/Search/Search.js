/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import SearchBox from "../../SearchBox";

/**
 * Filter the metadata that has searchable definitions.
 *
 * @param metadata
 * @returns {[]}
 */
const searchOperationSetup = metadata => {
  const searchableCriteria = [];

  metadata.forEach(element => {
    if (element.searchable) {
      searchableCriteria.push(element);
    }
  });

  return searchableCriteria;
};

/**
 * Filter the search string, based in the criteria, using the value.
 *
 * @param value
 * @param criteria
 * @param searchValue
 * @returns {boolean|*}
 */
const filter = (value, criteria, searchValue) => {
  const evalValue = get(value, criteria.accessor);

  if (criteria.searchFunction)
    return criteria.searchFunction(evalValue, searchValue);

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

/**
 * For each criteria the value is evaluated, returning a list of filtered results.
 *
 * @param searchValue
 * @param values
 * @param searchableCriteria
 * @returns {[]}
 */
const searchOperation = (searchValue, values, searchableCriteria) => {
  const filteredValues = [];

  searchableCriteria.forEach(criteria => {
    values.forEach(value => {
      if (
        filter(value, criteria, searchValue) &&
        !filteredValues.includes(value)
      )
        filteredValues.push(value);
    });
  });

  return filteredValues;
};

/**
 * Search component.
 *
 * @param id
 * @param labels
 * @param onFilter
 * @param values
 * @param metadata
 * @returns {*}
 * @constructor
 */
const Search = ({ id, searchBoxLabels, onFilter, onSearch, values, metadata }) => {
  const searchableCriteria = searchOperationSetup(metadata);

  const handler = value => {
    const filteredResults = searchOperation(value, values, searchableCriteria);
    onFilter(filteredResults);
    return value;
  };

  return (
    <SearchBox
      id={`search_${id}`}
      labels={searchBoxLabels}
      onChange={onSearch || handler}
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
      id: PropTypes.string
    })
  ).isRequired,
  /**
   * Labels.
   */
  searchBoxLabels: PropTypes.shape({
    sortBy: PropTypes.string
  }).isRequired,
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
      searchFunction: PropTypes.func
    })
  ).isRequired,
  /**
   * Callback function returning the filtered data.
   */
  onFilter: PropTypes.func.isRequired,
  /**
   * onSearch callback.
   */
  onSearch: PropTypes.func
};

Search.defaultProps = {
  id: undefined,
  onSearch: null
};

export default Search;
export { searchOperation, filter, searchOperationSetup };
