import { useState } from "react";
import {
  HvEmptyState,
  HvFilterGroup,
  HvFilterGroupProps,
  HvLoading,
  HvSwitch,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

const filters: HvFilterGroupProps["filters"] = [
  {
    id: "1",
    name: "Filter with data",
    data: Array.from(Array(5), (el, i) => ({
      id: `opt${i}`,
      name: `Option ${i}`,
    })),
  },
  {
    id: "2",
    name: "Filter with no data",
    data: [],
  },
];

const filterContent = {
  leftEmptyElement: <HvLoading label="Loading filters..." className="h-full" />,
  rightEmptyElement: <HvEmptyState icon={<Info />} message="No values found" />,
};

export const EmptyFilters = () => {
  const [hasFilters, setHasFilters] = useState(true);

  return (
    <div className="flex items-center gap-20px">
      <div className="w-180px">
        <HvFilterGroup
          aria-label="Empty filter group"
          filters={hasFilters ? filters : []}
          filterContentProps={filterContent}
        />
      </div>
      <HvSwitch
        checked={hasFilters}
        onChange={(_, checked) => setHasFilters(checked)}
        aria-label="Loaded state"
      />
      <HvTypography>
        {hasFilters ? "Filters in loaded state" : "Filters in loading state"}
      </HvTypography>
    </div>
  );
};
