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

export const EmptyFilters = () => {
  const [hasFilters, setHasFilters] = useState<boolean>(true);
  const myFilters: HvFilterGroupProps["filters"] = hasFilters
    ? [
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
      ]
    : [];

  const leftEmptyElement = (
    <HvLoading label="Loading filters..." style={{ height: "100%" }} />
  );
  const rightEmptyElement = (
    <HvEmptyState icon={<Info />} message="No values found for the filter" />
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: 180 }}>
        <HvFilterGroup
          aria-label="Empty filter group"
          filters={myFilters}
          filterContentProps={{ leftEmptyElement, rightEmptyElement }}
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
