import { useContext } from "react";
import { HvFilterGroupContext } from "../FilterGroupContext";
import { styles } from "./Counter.styles";
import { HvFilterGroupFilters, HvFilterGroupValue } from "../FilterGroup";
import { ClassNames } from "@emotion/react";
import { clsx } from "clsx";

export interface HvFilterGroupCounterProps {
  className?: string;
  id?: string;
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
}: HvFilterGroupCounterProps) => {
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
    ?.flat()
    ?.filter((elem) => elem !== undefined)
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
    <ClassNames>
      {({ css }) => (
        <div className={clsx(className, css(styles.root))}>
          {partialCounter > 0 ? (
            <p className={css(styles.partialCounter)}>{partialCounter}</p>
          ) : (
            partialCounter
          )}
          {` / ${totalCounter}`}
        </div>
      )}
    </ClassNames>
  );
};
