import { useMemo } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { css, CSSInterpolation } from "@emotion/css";

import {
  HvAccordionProps,
  HvAccordion,
  HvBox,
  HvListContainer,
  HvListItem,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  useHvData,
  useHvTableSticky,
} from "@hitachivantara/uikit-react-core";

import {
  Disabled as DisabledStory,
  Controlled as ControlledStory,
} from "samples/Accordion";
import DisabledRaw from "samples/Accordion/Disabled?raw";

import ControlledRaw from "samples/Accordion/Controlled?raw";

import FacetSearchRaw from "./stories/FacetSearchSample?raw";
import { FacetSearch } from "./stories/FacetSearchSample";

const styles: { [key: string]: CSSInterpolation } = {
  listContainer: {
    "& > li": {
      paddingLeft: 32,
    },
  },
  formContainer: {
    padding: "0 32px",
    "& > div": {
      paddingTop: 17,
    },
  },
};

const meta: Meta<typeof HvAccordion> = {
  title: "Components/Accordion",
  component: HvAccordion,
};
export default meta;

export const Main: StoryObj<HvAccordionProps> = {
  args: {
    label: "Analytics",
    headingLevel: 1,
    disabled: false,
    expanded: true,
    defaultExpanded: false,
    labelVariant: "label",
  },
  argTypes: {
    classes: { control: { disable: true } },
    containerProps: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvBox sx={{ maxWidth: 300 }}>
        <HvAccordion {...args}>
          <HvListContainer
            className={css(styles.listContainer)}
            interactive
            condensed
          >
            <HvListItem>Views</HvListItem>
            <HvListItem>Parameters</HvListItem>
          </HvListContainer>
        </HvAccordion>
      </HvBox>
    );
  },
};

export const Disabled: StoryObj = {
  parameters: {
    docs: {
      source: { code: DisabledRaw },
    },
  },
  render: () => <DisabledStory />,
};

export const Controlled: StoryObj = {
  parameters: {
    eyes: { include: false },
    docs: {
      source: { code: ControlledRaw },
    },
  },
  render: () => <ControlledStory />,
};

interface SampleDataProps {
  id: number;
  title: string;
  director: string;
  producer: string;
  release: string;
}

export const Typography: StoryObj<HvAccordionProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "An accordion with a different button typography.",
      },
    },
  },
  render: () => {
    const getData = () => [
      {
        id: 1,
        title: "A new hope",
        director: "George Lucas",
        producer: "Gary Kurzt",
        release: "1977-05-25",
      },
      {
        id: 2,
        title: "Empires strike back",
        director: "Irvin Kershner",
        producer: "Gary Kurzt",
        release: "1980-05-17",
      },
      {
        id: 3,
        title: "Return of the jedi",
        director: "Richard Marquand",
        producer: "Howard Kazanjian",
        release: "1983-05-25",
      },
    ];

    const getColumns = (): HvTableColumnConfig<SampleDataProps, string>[] => [
      {
        Header: "Title",
        accessor: "title",
        width: 150,
        style: { textTransform: "capitalize" },
      },
      {
        Header: "Director",
        accessor: "director",
      },
      {
        Header: "Producer",
        accessor: "producer",
      },
      {
        Header: "Release Date",
        accessor: "release",
      },
    ];

    const data = useMemo(() => getData(), []);
    const columns = useMemo(() => getColumns(), []);

    const {
      getTableProps,
      getTableHeadProps,
      getTableBodyProps,
      prepareRow,
      headerGroups,
      rows,
    } = useHvData<SampleDataProps, string>(
      {
        columns,
        data,
        stickyHeader: true,
      },
      useHvTableSticky
    );

    return (
      <HvBox sx={{ width: "100%" }}>
        <HvAccordion
          label="Films"
          labelVariant="title4"
          headingLevel={2}
          expanded
        >
          <HvTable {...getTableProps()}>
            <HvTableHead {...getTableHeadProps?.()}>
              {headerGroups.map((headerGroup) => (
                <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader {...col.getHeaderProps()}>
                      {col.render("Header")}
                    </HvTableHeader>
                  ))}
                </HvTableRow>
              ))}
            </HvTableHead>
            <HvTableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })}
            </HvTableBody>
          </HvTable>
        </HvAccordion>
      </HvBox>
    );
  },
};

export const FacetSearchSample: StoryObj = {
  parameters: {
    docs: {
      source: { code: FacetSearchRaw },
      description: {
        story:
          "A Sample of an example implementation of the Facet Search design pattern.",
      },
    },
  },
  render: () => <FacetSearch />,
};
