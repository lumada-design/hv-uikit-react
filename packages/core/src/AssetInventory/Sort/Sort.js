import React, { memo } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import HvDropdown from "../../Dropdown";
import { setId } from "../../utils";

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

const sortValues = ({ accessor, sortFunction: externalSortFunction, type, cellType }) => {
  let selectedSortFunc;

  const sortFunction = externalSortFunction || sortByType(cellType);

  if (type === "asc") {
    selectedSortFunc = (a, b) => (sortFunction(get(a, accessor), get(b, accessor)) ? -1 : 1);
  }
  if (type === "desc") {
    selectedSortFunc = (a, b) => (sortFunction(get(a, accessor), get(b, accessor)) ? 1 : -1);
  }
  return selectedSortFunc;
};

const Sort = ({
  id = undefined,
  labels,
  selected = undefined,
  onSelection,
  metadata,
  onSortChange = null,
  disablePortal = false,
  ...others
}) => {
  const innerSortValues = data => {
    onSelection(sortValues(data), data.id);
  };

  return (
    <HvDropdown
      id={setId(id, "sort")}
      labels={labels}
      values={sortOperationSetup(metadata, selected)}
      onChange={onSortChange || innerSortValues}
      selectDefault={false}
      singleSelectionToggle={false}
      disablePortal={disablePortal}
      {...others}
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
  selected: PropTypes.string,
  /**
   * Disable portal on the dropdown
   */
  disablePortal: PropTypes.bool
};

const arePropsEqual = (prevProps, nextProps) =>
  prevProps.metadata === nextProps.metadata && prevProps.selected === nextProps.selected;

export default memo(Sort, arePropsEqual);
export { sortOperationSetup, sortValues };
