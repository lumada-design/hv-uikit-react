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
        name: "Categoryyyyyyyyyyyyyyyyyyyyyyyyy is a very long string 1",
      },
      { id: 2, name: "Category 2" },
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
        name: "Sub Category Categoryyyyyyyyy is a very long string 1",
      },
      { id: "subcategory2", name: "Sub Category 2" },
      { id: "subcategory3", name: "Sub Category 3" },
      { id: "subcategory4", name: "Sub Category 4", disabled: true },
    ],
  },
  {
    id: "subsubcategory",
    name: "Sub-Sub-Category Category Category Category Category Category",
    data: [
      {
        id: "subsubcategory1",
        name: "Sub sub Category 1 Categoryyyyyyyyy is a very long string",
      },
      { id: "subsubcategory2", name: "Sub sub Category 2" },
      { id: "subsubcategory3", name: "Sub sub Category 3" },
      { id: "subsubcategory4", name: "Sub sub Category 4" },
      { id: "subsubcategory5", name: "Sub sub Category 5" },
      { id: "subsubcategory6", name: "Sub sub Category 6" },
      { id: "subsubcategory7", name: "Sub sub Category 7" },
      { id: "subsubcategory8", name: "Sub sub Category 8" },
      { id: "subsubcategory9", name: "Sub sub Category 9" },
      { id: "subsubcategory10", name: "Sub sub Category 10" },
      { id: "subsubcategory11", name: "Sub sub Category 11" },
      { id: "subsubcategory12", name: "Sub sub Category 12" },
    ],
  },
];

export const Main = () => {
  const [value, setValue] = useState<HvFilterGroupValue | undefined>([
    ["category1", 2],
    [],
    ["subsubcategory2", "subsubcategory8"],
  ]);

  return (
    <HvFilterGroup
      aria-label="Main filter group"
      value={value}
      filters={filters}
      onChange={(_, values) => setValue(values)}
    />
  );
};
