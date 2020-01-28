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

import React, { memo } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import DropDown from "../../Dropdown";

/**
 * Filter the metadata that has searchable definitions.
 *
 * @param metadata
 * @returns {[]}
 */
const sortOperationSetup = (metadata, selectedSort) => {
  const sortableCriteria = [];

  metadata.forEach(element => {
    if (element.sortable) {
      sortableCriteria.push({
        id: `${element.id}Asc`,
        cellType: element.cellType,
        label: element.sortableLabelAsc,
        accessor: element.accessor,
        type: "asc",
        sortFunction: element.sortFunction,
        selected: `${element.id}Asc` === selectedSort
      });
      sortableCriteria.push({
        id: `${element.id}Desc`,
        cellType: element.cellType,
        label: element.sortableLabelDesc,
        accessor: element.accessor,
        type: "desc",
        sortFunction: element.sortFunction,
        selected: `${element.id}Desc` === selectedSort
      });
    }
  });

  return sortableCriteria;
};

/**
 * Get the sort function according the type.
 *
 * @param type
 * @returns {(function(*=, *=): boolean)|(function(*, *): boolean)}
 */
const sortByType = type => {
  switch (type.toUpperCase()) {
    case "NUMERIC":
    case "ALPHA-NUMERIC":
      return (a, b) => a < b;
    case "DATE":
      return (a, b) => new Date(a).getTime() < new Date(b).getTime();
    default:
      return (a, b) => a < b;
  }
};

/**
 * Calls the passed onSelection passing the sort function.
 *
 * @param sort
 */
const sortValues = ({
  accessor,
  sortFunction: externalSortFunction,
  type,
  cellType
}) => {
  let selectedSortFunc;

  const sortFunction = externalSortFunction || sortByType(cellType);

  if (type === "asc") {
    selectedSortFunc = (a, b) =>
      sortFunction(get(a, accessor), get(b, accessor)) ? -1 : 1;
  }
  if (type === "desc") {
    selectedSortFunc = (a, b) =>
      sortFunction(get(a, accessor), get(b, accessor)) ? 1 : -1;
  }
  return selectedSortFunc;
};

/**
 * Sort component.
 *
 * @param id
 * @param labels
 * @param onSelection
 * @param metadata
 * @returns {*}
 * @constructor
 */
const Sort = ({
  id,
  labels,
  selected,
  onSelection,
  metadata,
  onSortChange
}) => {
  const innerSortValues = data => {
    onSelection(sortValues(data), data.id);
  };

  return (
    <DropDown
      id={`sort_${id}`}
      labels={labels}
      values={sortOperationSetup(metadata, selected)}
      onChange={onSortChange || innerSortValues}
      selectDefault={false}
      singleSelectionToggle={false}
    />
  );
};

Sort.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Callback on selection.
   */
  onSelection: PropTypes.func.isRequired,
  /**
   * onSortChange callback.
   */
  onSortChange: PropTypes.func,
  /**
   * Labels.
   */
  labels: PropTypes.shape({
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
   * Selected id
   */
  selected: PropTypes.string.isRequired
};

Sort.defaultProps = {
  id: undefined,
  onSortChange: null
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.metadata === nextProps.metadata && prevProps.selected === nextProps.selected;

export default memo(Sort, arePropsEqual);
export { sortOperationSetup, sortValues };
