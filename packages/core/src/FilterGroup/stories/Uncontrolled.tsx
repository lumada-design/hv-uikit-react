import {
  HvFilterGroup,
  HvFilterGroupProps,
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
      { id: "category4", name: "Category 4" },
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
      { id: "subcategory4", name: "Sub Category 4" },
    ],
  },
];

export const Uncontrolled = () => (
  <HvFilterGroup aria-label="Uncontrolled filter group" filters={filters} />
);
