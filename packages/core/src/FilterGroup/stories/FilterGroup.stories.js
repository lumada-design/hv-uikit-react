import React, { useState } from "react";
import HvFilterGroup from "../FilterGroup";

export default {
  title: "Widgets/Filter Group",
  parameters: {
    componentSubtitle:
      "This component implements one potential use-case of the Filter Group pattern Design System Specifies. Due to the enormous variety of capabilities required for this, we strongly recommend checking the code of the component and extend it yourself, while we do not provide a better approach for building this component with smaller and more composable parts.",
    dsVersion: "3.6.0",
  },
  component: HvFilterGroup,
  decorators: [
    (Story) => (
      <div style={{ height: 550 }}>
        <Story />
      </div>
    ),
  ],
};

const filters = [
  {
    id: "category",
    name: "Category",
    data: [
      { id: "category1", name: "Categoryyyyyyyyyyyyyyyyyyyyyyyyy is a very long string 1" },
      { id: 2, name: "Category 2" },
      { id: "category3", name: "Category 3" },
      { id: "category4", name: "Category 4" },
    ],
  },
  {
    id: "subcategory",
    name: "Sub-Category",
    data: [
      { id: "subcategory1", name: "Sub Category Categoryyyyyyyyy is a very long string 1" },
      { id: "subcategory2", name: "Sub Category 2" },
      { id: "subcategory3", name: "Sub Category 3" },
      { id: "subcategory4", name: "Sub Category 4" },
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
  const [value, setValue] = useState([
    ["category1", 2],
    [],
    [1, "subsubcategory2", "subsubcategory8"],
  ]);

  return (
    <div style={{ width: 180 }}>
      <HvFilterGroup
        id="example"
        value={value}
        filters={filters}
        onChange={(evt, values) => setValue(values)}
      />
    </div>
  );
};

export const ResetToDefault = () => {
  const [value, setValue] = useState([["category1", 2], ["subcategory1"], [1]]);
  const [defaultValue] = useState([["category1"], [], []]);

  return (
    <div style={{ width: 180 }}>
      <HvFilterGroup
        id="example"
        value={value}
        defaultValue={defaultValue}
        filters={filters}
        labels={{
          clearLabel: "Reset",
        }}
        onChange={(evt, values) => setValue(values)}
      />
    </div>
  );
};
