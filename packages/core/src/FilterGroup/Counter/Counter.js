import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FilterGroupContext } from "../FilterGroupContext";
import useStyles from "./styles";

const Counter = ({ className, id }) => {
  const classes = useStyles();
  const { filterOptions, filterValues = [], appliedFilters = [] } = useContext(FilterGroupContext);

  const options = id ? [filterOptions.find((option) => option.id === id)] : filterOptions;
  const optionIdx = filterOptions.findIndex((option) => option.id === id);

  const groupsCounter = appliedFilters?.flat()?.filter((elem) => elem !== undefined).length || 0;
  const partialCounter = id ? filterValues[optionIdx]?.length || 0 : groupsCounter;
  const totalCounter = options.reduce((acc, option) => acc + option.data.length, 0);

  return (
    <div className={clsx(classes.root, className)}>
      {partialCounter > 0 ? <b>{partialCounter}</b> : partialCounter}
      {` / ${totalCounter}`}
    </div>
  );
};

Counter.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Counter;
