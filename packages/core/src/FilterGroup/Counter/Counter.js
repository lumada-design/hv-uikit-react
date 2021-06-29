import React, { useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FilterGroupContext } from "../FilterGroupContext";
import useStyles from "./styles";

const Counter = ({ className, value, id }) => {
  const classes = useStyles();
  const { filterOptions, filterValues } = useContext(FilterGroupContext);

  const optionsValuesCount = value || filterValues;
  const options = id ? [filterOptions.find((option) => option.id === id)] : filterOptions;

  const totalCounter = options.reduce((acc, option) => acc + option.data.length, 0);

  const partialCounter = id
    ? options.reduce(
        (acc, group) =>
          acc + group.data.filter((option) => optionsValuesCount.includes(option.id)).length,
        0
      )
    : optionsValuesCount.length;

  return (
    <div className={clsx(classes.root, className)}>
      {partialCounter > 0 ? <b>{partialCounter}</b> : partialCounter}
      {` / ${totalCounter}`}
    </div>
  );
};

Counter.propTypes = {
  className: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
};

export default Counter;
