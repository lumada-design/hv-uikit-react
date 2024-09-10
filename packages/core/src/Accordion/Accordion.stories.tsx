import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  Breakpoint,
  HvAccordion,
  HvAccordionProps,
  HvButton,
  HvInput,
  HvListContainer,
  HvListItem,
  HvSimpleGrid,
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

import { FacetSearch } from "./stories/FacetSearchSample";
import FacetSearchRaw from "./stories/FacetSearchSample?raw";

const classes = {
  listContainer: css({
    "& > li": {
      paddingLeft: 32,
    },
  }),
  formContainer: css({
    padding: "0 32px",
    "& > div": {
      paddingTop: 17,
    },
  }),
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
      <HvAccordion {...args}>
        <HvListContainer
          className={classes.listContainer}
          interactive
          condensed
        >
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
    );
  },
};

export const Disabled: StoryObj<HvAccordionProps> = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <HvAccordion label="Analytics" headingLevel={3} disabled>
        <HvListContainer
          className={classes.listContainer}
          interactive
          condensed
        >
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion label="System" headingLevel={3}>
        <HvListContainer
          className={classes.listContainer}
          interactive
          condensed
        >
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion label="Data" headingLevel={3} disabled>
        <HvListContainer
          className={classes.listContainer}
          interactive
          condensed
        >
          <HvListItem>Storage</HvListItem>
          <HvListItem>Memory</HvListItem>
        </HvListContainer>
      </HvAccordion>
    </div>
  ),
};

export const Controlled: StoryObj<HvAccordionProps> = {
  render: () => {
    const [expandedState, setExpandedState] = useState({
      personalInformation: true,
      billingAddress: false,
      shippingAddress: false,
    });
    const handleToggle = (key: keyof typeof expandedState) => {
      const newValue = { ...expandedState };
      newValue[key] = !newValue[key];
      setExpandedState(newValue);
    };
    const handleAll = (option: boolean) => {
      setExpandedState({
        personalInformation: option,
        billingAddress: option,
        shippingAddress: option,
      });
    };

    const brk: Breakpoint[] = [
      {
        cols: 5,
        minWidth: 680,
        spacing: "sm",
      },
      {
        cols: 3,
        minWidth: 500,
        spacing: "sm",
      },
      {
        cols: 2,
        minWidth: 450,
        spacing: "sm",
      },
      {
        cols: 1,
        minWidth: 100,
        spacing: "sm",
      },
    ];

    return (
      <>
        <HvSimpleGrid spacing="sm" style={{ maxWidth: 1050 }} breakpoints={brk}>
          <HvButton
            variant="secondarySubtle"
            onClick={() => handleToggle("personalInformation")}
          >
            Personal Information
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => handleToggle("billingAddress")}
          >
            Billing Address
          </HvButton>
          <HvButton
            variant="secondarySubtle"
            onClick={() => handleToggle("shippingAddress")}
          >
            Shipping Address
          </HvButton>
          <HvButton variant="secondarySubtle" onClick={() => handleAll(false)}>
            Close all
          </HvButton>
          <HvButton variant="secondarySubtle" onClick={() => handleAll(true)}>
            Expand all
          </HvButton>
        </HvSimpleGrid>
        <div style={{ maxWidth: 300 }}>
          <HvAccordion
            label="Personal Information"
            onChange={() => handleToggle("personalInformation")}
            expanded={expandedState.personalInformation}
          >
            <div className={classes.formContainer}>
              <HvInput label="Name" placeholder="Insert first name" required />
              <HvInput label="Email" placeholder="Insert your email" required />
              <HvInput label="Phone" placeholder="Insert your phone number" />
              <HvInput label="Extension" placeholder="Insert phone extension" />
              <HvInput label="Country" placeholder="Insert country name" />
              <HvInput
                label="City/Province"
                placeholder="Insert province name"
              />
            </div>
          </HvAccordion>
          <HvAccordion
            label="Billing Address"
            onChange={() => handleToggle("billingAddress")}
            expanded={expandedState.billingAddress}
          >
            <div className={classes.formContainer}>
              <HvInput label="Address 1" placeholder="Insert first name" />
              <HvInput label="Address 2" placeholder="Insert address" />
              <HvInput label="City" placeholder="Insert city name" />
              <HvInput label="State" placeholder="Insert state" />
              <HvInput label="Zip Code" placeholder="Insert code" />
            </div>
          </HvAccordion>
          <HvAccordion
            label="Shipping Address"
            onChange={() => handleToggle("shippingAddress")}
            expanded={expandedState.shippingAddress}
          >
            <div className={classes.formContainer}>
              <HvInput label="Address 1" placeholder="Insert first name" />
              <HvInput label="Address 2" placeholder="Insert address" />
              <HvInput label="City" placeholder="Insert city name" />
              <HvInput label="State" placeholder="Insert state" />
              <HvInput label="Zip Code" placeholder="Insert code" />
            </div>
          </HvAccordion>
        </div>
      </>
    );
  },
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
      useHvTableSticky,
    );

    return (
      <div style={{ width: "100%" }}>
        <HvAccordion
          label="Films"
          labelVariant="title4"
          headingLevel={2}
          expanded
        >
          <HvTable {...getTableProps()}>
            <HvTableHead {...getTableHeadProps?.()}>
              {headerGroups.map((headerGroup) => (
                <HvTableRow
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.getHeaderGroupProps().key}
                >
                  {headerGroup.headers.map((col) => (
                    <HvTableHeader
                      {...col.getHeaderProps()}
                      key={col.getHeaderProps().key}
                    >
                      {col.render("Header")}
                    </HvTableHeader>
                  ))}
                </HvTableRow>
              ))}
            </HvTableHead>
            <HvTableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps();

                return (
                  <HvTableRow key={key} {...rowProps}>
                    {row.cells.map((cell) => (
                      <HvTableCell
                        {...cell.getCellProps()}
                        key={cell.getCellProps().key}
                      >
                        {cell.render("Cell")}
                      </HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })}
            </HvTableBody>
          </HvTable>
        </HvAccordion>
      </div>
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
