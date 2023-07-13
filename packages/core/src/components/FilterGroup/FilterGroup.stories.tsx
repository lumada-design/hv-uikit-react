import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  HvEmptyState,
  HvLoading,
  HvSwitch,
  HvTypography,
} from "@core/components";
import { Info } from "@hitachivantara/uikit-react-icons";
import { HvFilterGroup, HvFilterGroupProps } from "./FilterGroup";
import { HvFilterGroupValue } from "./types";

const meta: Meta<typeof HvFilterGroup> = {
  title: "Widgets/Filter Group",
  component: HvFilterGroup,
  decorators: [(storyFn) => <div style={{ height: 550 }}>{storyFn()}</div>],
};

export default meta;

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
      { id: "category4", name: "Category 4" },
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

export const Main: StoryObj<HvFilterGroupProps> = {
  render: () => {
    const [value, setValue] = useState<HvFilterGroupValue | undefined>([
      ["category1", 2],
      [],
      [1, "subsubcategory2", "subsubcategory8"],
    ]);

    return (
      <div style={{ width: 180 }}>
        <HvFilterGroup
          id="filter-group-main"
          value={value}
          filters={filters}
          onChange={(_, values) => setValue(values)}
        />
      </div>
    );
  },
};

export const ResetToDefault: StoryObj<HvFilterGroupProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: () => {
    const [value, setValue] = useState<HvFilterGroupValue | undefined>([
      ["category1", 2],
      ["subcategory1"],
      [1],
    ]);

    return (
      <div style={{ width: 180 }}>
        <HvFilterGroup
          id="filter-group-reset-default"
          value={value}
          defaultValue={[["category1"], [], []]}
          filters={filters}
          labels={{
            clearLabel: "Reset",
          }}
          onChange={(_, values) => setValue(values)}
        />
      </div>
    );
  },
};

export const Uncontrolled: StoryObj<HvFilterGroupProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: () => {
    return (
      <div style={{ width: 180 }}>
        <HvFilterGroup id="filter-group-uncontrolled" filters={filters} />
      </div>
    );
  },
};

const EmptyFiltersStory = () => {
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
          filters={myFilters}
          filterContentProps={{ leftEmptyElement, rightEmptyElement }}
        />
      </div>
      <HvSwitch
        checked={hasFilters}
        onChange={(_, checked) => setHasFilters(checked)}
      />
      <HvTypography>
        {hasFilters ? "Filters in loaded state" : "Filters in loading state"}
      </HvTypography>
    </div>
  );
};

export const EmptyFilters: StoryObj<HvFilterGroupProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: {
        code: `
const [hasFilters, setHasFilters] = useState<boolean>(true);
const myFilters: HvFilterGroupProps["filters"] = hasFilters
    ? [
        {
        id: "1",
        name: "Filter with data",
        data: Array.from(Array(5), (el, i) => ({
            id: \`opt\${i}\`,
            name: \`Option \${i}\`,
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
        filters={myFilters}
        filterContentProps={{ leftEmptyElement, rightEmptyElement }}
        />
    </div>
    <HvSwitch
        checked={hasFilters}
        onChange={(_, checked) => setHasFilters(checked)}
    />
    <HvTypography>
        {hasFilters ? "Filters in loaded state" : "Filters in loading state"}
    </HvTypography>
    </div>
);`,
      },
    },
  },
  render: () => {
    return <EmptyFiltersStory />;
  },
};
