import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  Breakpoint,
  HvBox,
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
} from "~/components";
import { useMemo, useState } from "react";
import { HvAccordionProps, HvAccordion } from "./Accordion";

const StyledListContainer = styled(HvListContainer)({
  "& > li": {
    paddingLeft: 32,
  },
});

const StyledFormContainer = styled("div")({
  padding: "0 32px",
  "& > div": {
    paddingTop: 17,
  },
});

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
    expanded: false,
    defaultExpanded: false,
    labelVariant: "label",
  },
  argTypes: {
    classes: { control: { disable: true } },
    containerProps: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <HvBox sx={{ maxWidth: 300 }}>
        <HvAccordion id="item1" {...args}>
          <StyledListContainer interactive condensed>
            <HvListItem>Views</HvListItem>
            <HvListItem>Parameters</HvListItem>
          </StyledListContainer>
        </HvAccordion>
      </HvBox>
    );
  },
};

export const Disabled: StoryObj<HvAccordionProps> = {
  render: ({}) => {
    return (
      <HvBox sx={{ maxWidth: 300 }}>
        <HvAccordion id="item1" label="Analytics" headingLevel={3} disabled>
          <StyledListContainer interactive condensed>
            <HvListItem>Views</HvListItem>
            <HvListItem>Parameters</HvListItem>
          </StyledListContainer>
        </HvAccordion>
        <HvAccordion id="item2" label="System" headingLevel={3}>
          <StyledListContainer interactive condensed>
            <HvListItem>Settings</HvListItem>
            <HvListItem>Network</HvListItem>
          </StyledListContainer>
        </HvAccordion>
        <HvAccordion id="item3" label="Data" headingLevel={3} disabled>
          <StyledListContainer interactive condensed>
            <HvListItem>Storage</HvListItem>
            <HvListItem>Memory</HvListItem>
          </StyledListContainer>
        </HvAccordion>
      </HvBox>
    );
  },
};

export const Controlled: StoryObj<HvAccordionProps> = {
  parameters: {
    eyes: { include: false },
  },
  render: ({}) => {
    const [expandedState, setExpandedState] = useState({
      personalInformation: true,
      billingAddress: false,
      shippingAddress: false,
    });
    const handleToggle = (key) => {
      const newValue = { ...expandedState };
      newValue[key] = !newValue[key];
      setExpandedState(newValue);
    };
    const handleAll = (option) => {
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
        <HvSimpleGrid
          // cols={5}
          spacing="sm"
          style={{ maxWidth: 1050 }}
          breakpoints={brk}
        >
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
        <HvBox sx={{ maxWidth: 300 }}>
          <HvAccordion
            id="controlled-item1"
            label="Personal Information"
            onChange={() => handleToggle("personalInformation")}
            expanded={expandedState.personalInformation}
          >
            <StyledFormContainer>
              <HvInput
                id="input-name"
                label="Name"
                placeholder="Insert first name"
                required
              />
              <HvInput
                id="input-email"
                label="Email"
                placeholder="Insert your email"
                required
              />
              <HvInput
                id="input-phone"
                label="Phone"
                placeholder="Insert your phone number"
              />
              <HvInput
                id="input-extension"
                label="Extension"
                placeholder="Insert phone extension"
              />
              <HvInput
                id="input-country"
                label="Country"
                placeholder="Insert country name"
              />
              <HvInput
                id="input-province"
                label="City/Province"
                placeholder="Insert province name"
              />
            </StyledFormContainer>
          </HvAccordion>
          <HvAccordion
            id="controlled-item2"
            label="Billing Address"
            onChange={() => handleToggle("billingAddress")}
            expanded={expandedState.billingAddress}
          >
            <StyledFormContainer>
              <HvInput
                id="input-address"
                label="Address 1"
                placeholder="Insert first name"
              />
              <HvInput
                id="input-address2"
                label="Address 2"
                placeholder="Insert address"
              />
              <HvInput
                id="input-city"
                label="City"
                placeholder="Insert city name"
              />
              <HvInput
                id="input-state"
                label="State"
                placeholder="Insert state"
              />
              <HvInput
                id="input-code"
                label="Zip Code"
                placeholder="Insert code"
              />
            </StyledFormContainer>
          </HvAccordion>
          <HvAccordion
            id="controlled-item3"
            label="Shipping Address"
            onChange={() => handleToggle("shippingAddress")}
            expanded={expandedState.shippingAddress}
          >
            <StyledFormContainer>
              <HvInput
                id="input-address-bill"
                label="Address 1"
                placeholder="Insert first name"
              />
              <HvInput
                id="input-address2-bill"
                label="Address 2"
                placeholder="Insert address"
              />
              <HvInput
                id="input-city-bill"
                label="City"
                placeholder="Insert city name"
              />
              <HvInput
                id="input-state-bill"
                label="State"
                placeholder="Insert state"
              />
              <HvInput
                id="input-code-bill"
                label="Zip Code"
                placeholder="Insert code"
              />
            </StyledFormContainer>
          </HvAccordion>
        </HvBox>
      </>
    );
  },
};

export const Typography: StoryObj<HvAccordionProps> = {
  parameters: {
    eyes: { include: false },
    docs: {
      description: {
        story: "An accordion with a different button typography.",
      },
    },
  },
  render: ({}) => {
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

    type SampleDataProps = {
      id: number;
      title: string;
      director: string;
      producer: string;
      release: string;
    };

    type SampleColumn = HvTableColumnConfig<SampleDataProps>;

    const getColumns = (): SampleColumn[] => [
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
    } = useHvData(
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
          id="item1"
          label="Films"
          labelVariant={"title4"}
          headingLevel={2}
          expanded
        >
          <HvTable id="accordion-table" {...getTableProps()}>
            <HvTableHead {...getTableHeadProps()}>
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
