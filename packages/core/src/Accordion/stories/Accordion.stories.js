import React, { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import {
  HvAccordion,
  HvListContainer,
  HvListItem,
  HvInput,
  HvButton,
  HvTable,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableBody,
  HvTableCell,
  useHvData,
  useHvTableSticky,
} from "../..";

export default {
  title: "Display/Accordion",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvAccordion } from '@hitachivantara/uikit-react-core'",
  },

  component: HvAccordion,
};

export const Main = () => {
  const useStyles = makeStyles(() => ({
    accordionSpacing: {
      "& > li": {
        paddingLeft: 32,
      },
    },
    accordionContainer: {
      maxWidth: 300,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.accordionContainer}>
      <HvAccordion id="item1" label="Analytics" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item2" label="System" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="item3" label="Data" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Storage</HvListItem>
          <HvListItem>Memory</HvListItem>
        </HvListContainer>
      </HvAccordion>
    </div>
  );
};

export const Disabled = () => {
  const useStyles = makeStyles(() => ({
    accordionSpacing: {
      "& > li": {
        paddingLeft: 32,
      },
    },
    accordionContainer: {
      maxWidth: 300,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.accordionContainer}>
      <HvAccordion id="disabled-item1" label="Analytics" headingLevel={3} disabled>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Views</HvListItem>
          <HvListItem>Parameters</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="disabled-item2" label="System" headingLevel={3}>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Settings</HvListItem>
          <HvListItem>Network</HvListItem>
        </HvListContainer>
      </HvAccordion>
      <HvAccordion id="disabled-item3" label="Data" headingLevel={3} disabled>
        <HvListContainer className={classes.accordionSpacing} interactive condensed>
          <HvListItem>Storage</HvListItem>
          <HvListItem>Memory</HvListItem>
        </HvListContainer>
      </HvAccordion>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: { story: "A common accordion with disable items. " },
  },
};

export const Controlled = () => {
  const useStyles = makeStyles((theme) => ({
    accordionSpacing: {
      "& > li": {
        paddingLeft: 32,
      },
    },
    accordionContainer: {
      maxWidth: 300,
    },
    buttonContainer: {
      "& button": {
        marginRight: theme.hvSpacing("xs"),
        marginBottom: theme.hvSpacing("md"),
      },
    },
  }));
  const classes = useStyles();
  const [expandedState, setExpandedState] = useState({ analytics: true, system: true, data: true });
  const handleToggle = (key) => {
    const newValue = { ...expandedState };
    newValue[key] = !newValue[key];
    setExpandedState(newValue);
  };
  const handleAll = (option) => {
    setExpandedState({ analytics: option, system: option, data: option });
  };
  return (
    <>
      <div className={classes.buttonContainer}>
        <HvButton category="secondary" onClick={() => handleToggle("analytics")}>
          Toggle Analytics
        </HvButton>
        <HvButton category="secondary" onClick={() => handleToggle("system")}>
          Toggle System
        </HvButton>
        <HvButton category="secondary" onClick={() => handleToggle("data")}>
          Toggle Data
        </HvButton>
        <HvButton category="secondary" onClick={() => handleAll(false)}>
          Close all
        </HvButton>
        <HvButton category="secondary" onClick={() => handleAll(true)}>
          Expand all
        </HvButton>
      </div>
      <div className={classes.accordionContainer}>
        <HvAccordion
          id="controlled-item1"
          label="Analytics"
          onChange={() => handleToggle("analytics")}
          expanded={expandedState.analytics}
        >
          <HvListContainer className={classes.accordionSpacing} interactive condensed>
            <HvListItem>Views</HvListItem>
            <HvListItem>Parameters</HvListItem>
          </HvListContainer>
        </HvAccordion>
        <HvAccordion
          id="controlled-item2"
          label="System"
          onChange={() => handleToggle("system")}
          expanded={expandedState.system}
        >
          <HvListContainer className={classes.accordionSpacing} interactive condensed>
            <HvListItem>Settings</HvListItem>
            <HvListItem>Network</HvListItem>
          </HvListContainer>
        </HvAccordion>
        <HvAccordion
          id="controlled-item3"
          label="Data"
          onChange={() => handleToggle("data")}
          expanded={expandedState.data}
        >
          <HvListContainer className={classes.accordionSpacing} interactive condensed>
            <HvListItem>Storage</HvListItem>
            <HvListItem>Memory</HvListItem>
          </HvListContainer>
        </HvAccordion>
      </div>
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: { story: "An accordion controlled externally forcing expansion." },
  },
};

export const Form = () => {
  const useStyles = makeStyles(() => ({
    accordionContainer: {
      maxWidth: 300,
    },
    formContainer: {
      padding: "0 32px",
      "& > div": {
        paddingTop: 17,
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.accordionContainer}>
      <HvAccordion id="personal" label="Personal Information" headingLevel={3}>
        <div className={classes.formContainer}>
          <HvInput id="input-name" label="Name" placeholder="Insert first name" required />
          <HvInput id="input-email" label="Email" placeholder="Insert your email" required />
          <HvInput id="input-phone" label="Phone" placeholder="Insert your phone number" />
          <HvInput id="input-extension" label="Extension" placeholder="Insert phone extension" />
          <HvInput id="input-country" label="Country" placeholder="Insert country name" />
          <HvInput id="input-province" label="City/Province" placeholder="Insert province name" />
        </div>
      </HvAccordion>
      <HvAccordion id="billing" label="Billing Address" headingLevel={3}>
        <div className={classes.formContainer}>
          <HvInput id="input-address" label="Address 1" placeholder="Insert first name" />
          <HvInput id="input-address2" label="Address 2" placeholder="Insert address" />
          <HvInput id="input-city" label="City" placeholder="Insert city name" />
          <HvInput id="input-state" label="State" placeholder="Insert state" />
          <HvInput id="input-code" label="Zip Code" placeholder="Insert code" />
        </div>
      </HvAccordion>
      <HvAccordion id="shipping" label="Shipping Address" headingLevel={3}>
        <div className={classes.formContainer}>
          <HvInput id="input-address-bill" label="Address 1" placeholder="Insert first name" />
          <HvInput id="input-address2-bill" label="Address 2" placeholder="Insert address" />
          <HvInput id="input-city-bill" label="City" placeholder="Insert city name" />
          <HvInput id="input-state-bill" label="State" placeholder="Insert state" />
          <HvInput id="input-code-bill" label="Zip Code" placeholder="Insert code" />
        </div>
      </HvAccordion>
    </div>
  );
};

Form.parameters = {
  docs: {
    description: { story: "An accordion composition with forms." },
  },
};

export const Typography = () => {
  const useStyles = makeStyles(() => ({
    accordionContainer: {
      width: "100%",
    },
  }));
  const classes = useStyles();

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

  const getColumns = () => [
    {
      Header: "Title",
      accessor: "title",
      sticky: "left",
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

  const { getTableProps, getTableHeadProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData(
      {
        columns,
        data,
        stickyHeader: true,
      },
      useHvTableSticky
    );

  return (
    <div className={classes.accordionContainer}>
      <HvAccordion id="film" label="Films" headingLevel={2}>
        <HvTable id="accordion-table" {...getTableProps()}>
          <HvTableHead {...getTableHeadProps()}>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>{col.render("Header")}</HvTableHeader>
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
                    <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                  ))}
                </HvTableRow>
              );
            })}
          </HvTableBody>
        </HvTable>
      </HvAccordion>
    </div>
  );
};

Typography.parameters = {
  docs: {
    description: { story: "An accordion with a different button typography." },
  },
};
