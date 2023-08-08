import { useContext } from "react";

import { ExtractNames } from "@core/utils/classes";

import { HvFilterGroupContext } from "../FilterGroupContext";
import { staticClasses, useClasses } from "./Counter.styles";
import { HvFilterGroupFilters, HvFilterGroupValue } from "../types";

export { staticClasses as filterGroupCounterClasses };

export type HvFilterGroupCounterClasses = ExtractNames<typeof useClasses>;

export interface HvFilterGroupCounterProps {
  className?: string;
  id?: string;
  classes?: HvFilterGroupCounterClasses;
}

const getExistingFiltersById = (
  idx: number,
  filterValues: HvFilterGroupValue,
  filterOptions: HvFilterGroupFilters
) => {
  let total = 0;
  filterValues[idx]?.forEach((fv) => {
    if (filterOptions[idx]?.data.find((f) => f.id === fv)) {
      total += 1;
    }
  });
  return total;
};

export const HvFilterGroupCounter = ({
  className,
  id,
  classes: classesProp,
}: HvFilterGroupCounterProps) => {
  const { classes, cx } = useClasses(classesProp);
  const {
    filterOptions,
    filterValues = [],
    appliedFilters = [],
  } = useContext(HvFilterGroupContext);

  const options =
    id && filterOptions.find((option) => option.id === id)
      ? ([
          filterOptions.find((option) => option.id === id),
        ] as HvFilterGroupFilters)
      : filterOptions;
  const optionIdx = filterOptions.findIndex((option) => option.id === id);

  let groupsCounter = 0;
  appliedFilters
    .filter((elem) => elem !== undefined)
    .forEach((fg, i) => {
      groupsCounter += getExistingFiltersById(i, filterValues, filterOptions);
    });

  const partialCounter = id
    ? getExistingFiltersById(optionIdx, filterValues, filterOptions) || 0
    : groupsCounter;

  const totalCounter = options.reduce(
    (acc, option) => acc + option.data.length,
    0
  );

  return (
    <div className={cx(classes.root, className)}>
      {partialCounter > 0 ? (
        <p className={classes.partialCounter}>{partialCounter}</p>
      ) : (
        partialCounter
      )}
      {` / ${totalCounter}`}
    </div>
  );
};
