import React, { useState } from "react";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import HvButton from "../../Button";
import HvTable from "../../Table";
import HvLoading from "../Loading";

export default {
  title: "Components/Loading",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvLoading } from '@hv/uikit-react-core/dist'"
  },
  component: HvLoading
};

export const Main = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvLoading isActive />
      <HvLoading isActive small />
    </div>
  );
};

export const SpecificColor = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        width: "150px",
        height: "50px",
        backgroundColor: theme.hv.palette.semantic.sema1
      }}
    >
      <HvLoading isActive color="base1" />
    </div>
  );
};

SpecificColor.story = {
  parameters: {
    docs: {
      storyDescription:
        "It is possible to define a specific color to be used in the bars, for the cases where the color must be maintain, independently of the theme"
    }
  }
};

const Table = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ",
      status: "Open"
    },
    {
      id: 13,
      name: "Event 2",
      createdDate: "10/14/2018",
      eventType: "Risk of failure profile",
      status: "Pending"
    },
    {
      id: 12,
      name: "Event 3",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed"
    },
    {
      id: 11,
      name: "Event 4",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open"
    },
    {
      id: 10,
      name: "Event 5",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending"
    },
    {
      id: 8,
      name: "Event 6",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed"
    },
    {
      id: 7,
      name: "Event 7",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open"
    },
    {
      id: 6,
      name: "Event 8",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending"
    },
    {
      id: 5,
      name: "Event 9",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open"
    },
    {
      id: 4,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed"
    },
    {
      id: 3,
      name: "Event 10",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open"
    }
  ];

  const getColumns = () => [
    {
      headerText: "Title",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left"
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: value => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric"
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: value => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    },
    {
      headerText: "Status",
      accessor: "status",
      format: value => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric"
    }
  ];

  return (
    <div style={{ padding: "10px" }}>
      <HvTable
        data={data}
        id="test"
        columns={getColumns()}
        defaultPageSize={10}
        resizable={false}
      />
    </div>
  );
};

export const Hoc = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <HvButton id="buttonLoading" onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? "Disable" : "Activate"}
      </HvButton>
      <HvLoading isActive={isLoading} text="Loading">
        <div>
          <Table />
        </div>
      </HvLoading>
    </>
  );
};

Hoc.story = {
  parameters: {
    docs: {
      storyDescription:
        "If a children is passed the component works as a HOC (High Order Component), wrapping the children and creating a overlay."
    }
  }
};

export const Inline = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <HvButton style={{ width: "150px" }} onClick={() => setIsLoading(!isLoading)}>
      {(!isLoading && "Submit") || <HvLoading small isActive={isLoading} color="base1" />}
    </HvButton>
  );
};

Inline.story = {
  parameters: {
    docs: {
      storyDescription: "If no children is passed the component behaves as a normal component"
    }
  }
};
