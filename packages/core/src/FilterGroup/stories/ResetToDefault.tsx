import { useState } from "react";
import {
  HvFilterGroup,
  HvFilterGroupProps,
  HvFilterGroupValue,
} from "@hitachivantara/uikit-react-core";

const filters: HvFilterGroupProps["filters"] = [
  {
    id: "category",
    name: "Category",
    data: [
      {
        id: "category1",
        name: "Category 1",
      },
      { id: "category2", name: "Category 2" },
      { id: "category3", name: "Category 3" },
      { id: "category4", name: "Category 4", disabled: true },
    ],
  },
  {
    id: "subcategory",
    name: "Sub-Category",
    data: [
      {
        id: "subcategory1",
        name: "Sub Category 1",
      },
      { id: "subcategory2", name: "Sub Category 2" },
      { id: "subcategory3", name: "Sub Category 3" },
      { id: "subcategory4", name: "Sub Category 4", disabled: true },
    ],
  },
];

export const ResetToDefault = () => {
  const [value, setValue] = useState<HvFilterGroupValue | undefined>([
    ["category1", "category2"],
    ["subcategory1"],
  ]);

  return (
    <HvFilterGroup
      aria-label="Reset to default filter group"
      value={value}
      defaultValue={[["category1"], []]}
      filters={filters}
      labels={{
        clearLabel: "Reset",
      }}
      onChange={(_, values) => setValue(values)}
    />
  );
};
