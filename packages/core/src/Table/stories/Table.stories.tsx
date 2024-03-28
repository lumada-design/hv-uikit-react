import { StoryObj } from "@storybook/react";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableProps,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";

import { GroupedRows as GroupedRowsStory } from "./TableSamples/GroupedRows";
import GroupedRowsRaw from "./TableSamples/GroupedRows?raw";
import { ListRow as ListRowStory } from "./TableSamples/ListRow";
import ListRowRaw from "./TableSamples/ListRow?raw";
import { Main as MainStory } from "./TableSamples/Main";
import MainRaw from "./TableSamples/Main?raw";
import { NoData as NoDataStory } from "./TableSamples/NoData";
import NoDataRaw from "./TableSamples/NoData?raw";
import { ResponsiveTable as ResponsiveTableStory } from "./TableSamples/ResponsiveTable";
import ResponsiveTableRaw from "./TableSamples/ResponsiveTable?raw";
import { SimpleTable as SimpleTableStory } from "./TableSamples/SimpleTable";
import SimpleTableRaw from "./TableSamples/SimpleTable?raw";

export default {
  title: "Visualizations/Table",
  component: HvTable,
  subcomponents: {
    HvTableContainer,
    HvTableRow,
    HvTableHead,
    HvTableHeader,
    HvTableBody,
    HvTableCell,
  },
};

export const Main: StoryObj<HvTableProps> = {
  args: {
    stickyColumns: false,
    stickyHeader: false,
    variant: "default",
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
  },
  parameters: {
    docs: {
      source: { code: MainRaw },
    },
  },
  render: (args) => <MainStory {...args} />,
};

export const NoData: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: NoDataRaw },
      description: {
        story: "Table with no data available.",
      },
    },
  },
  render: () => <NoDataStory />,
};

export const SimpleTable: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: SimpleTableRaw },
      description: {
        story:
          "Simple table that uses `HvTable` features in order to style checkbox and secondary actions columns.",
      },
    },
  },
  render: () => <SimpleTableStory />,
};

export const GroupedRows: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: GroupedRowsRaw },
      description: {
        story: "A table example with grouped rows.",
      },
    },
  },
  render: () => <GroupedRowsStory />,
};

export const ResponsiveTable: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: ResponsiveTableRaw },
      description: {
        story:
          "A table with non-table elements and responsive layout (try resizing your browser).",
      },
    },
  },
  render: () => <ResponsiveTableStory />,
};

export const ListRow: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: ListRowRaw },
      description: {
        story: "List row variant of the table.",
      },
    },
  },
  render: () => <ListRowStory />,
};
