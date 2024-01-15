import React, { useEffect, useState } from "react";
import moment from "moment";
import HvTable from "../../Table";
import HvButton from "../../Button";
import HvLoading from "../Loading";
import Typography from "../../Typography";

export default {
  title: "Components/Loading",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvLoading } from "@hitachivantara/uikit-react-core";',
  },
  component: HvLoading,
};

export const Main = () => {
  return (
    <div style={{ display: "flex" }}>
      <HvLoading isActive />
    </div>
  );
};

export const IndeterminateLoading = () => {
  // eslint-disable-next-line react/prop-types
  const ExampleBox = ({ text, children }) => (
    <div>
      <Typography>{text}</Typography>
      {children}
    </div>
  );
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox text="Large Loading">
        <HvLoading isActive />
      </ExampleBox>
      <ExampleBox text="Large Loading w/ label">
        <HvLoading isActive text="Loading" />
      </ExampleBox>
      <ExampleBox text="Small Loading">
        <HvLoading isActive small />
      </ExampleBox>
    </div>
  );
};

export const IndeterminateLoadingOnButtons = () => {
  // eslint-disable-next-line react/prop-types
  const ExampleBox = ({ text, category, color }) => {
    const [isLoading, setIsLoading] = useState(false);

    const activateTimer = () => {
      if (!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Typography style={{ paddingBottom: "5px" }}>{text}</Typography>
        <HvButton category={category} onClick={activateTimer}>
          {(!isLoading && "Submit") || <HvLoading small isActive={isLoading} color={color} />}
        </HvButton>
      </div>
    );
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox category="primary" text="Primary button" color="base1" />
      <ExampleBox category="secondary" text="Secondary button" />
      <ExampleBox category="ghost" text="Ghost button" />
    </div>
  );
};

export const DeterminateLoading = () => {
  // eslint-disable-next-line react/prop-types
  const ExampleBox = ({ text, children }) => (
    <div>
      <Typography>{text}</Typography>
      {children}
    </div>
  );

  const Progress = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 75 ? 0 : Math.round((v + 1.3) * 100) / 100));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return <HvLoading isActive text={`${value}M/75M`} />;
  };

  const Percentage = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v === 100 ? 0 : v + 5));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return <HvLoading isActive text={`${value}%`} />;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ExampleBox text="Determine w/ percentages">
        <Percentage />
      </ExampleBox>
      <ExampleBox text="Determine w/ progress">
        <Progress />
      </ExampleBox>
    </div>
  );
};

const Table = () => {
  const data = [
    {
      id: 14,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection ",
      status: "Open",
    },
    {
      id: 13,
      name: "Event 2",
      createdDate: "10/14/2018",
      eventType: "Risk of failure profile",
      status: "Pending",
    },
    {
      id: 12,
      name: "Event 3",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 11,
      name: "Event 4",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 10,
      name: "Event 5",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
    },
    {
      id: 8,
      name: "Event 6",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 7,
      name: "Event 7",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 6,
      name: "Event 8",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Pending",
    },
    {
      id: 5,
      name: "Event 9",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
    {
      id: 4,
      name: "Event 1",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Closed",
    },
    {
      id: 3,
      name: "Event 10",
      createdDate: "10/14/2018",
      eventType: "Anomaly detection",
      status: "Open",
    },
  ];

  const getColumns = () => [
    {
      headerText: "Title",
      accessor: "name",
      cellType: "alpha-numeric",
      fixed: "left",
    },
    {
      headerText: "Time",
      accessor: "createdDate",
      format: (value) => moment(new Date(value.original.createdDate)).format("MM/DD/YYYY"),
      cellType: "numeric",
    },
    {
      headerText: "Event Type",
      accessor: "eventType",
      format: (value) => value.original.eventType.replace("_", " ").toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
    },
    {
      headerText: "Status",
      accessor: "status",
      format: (value) => value.original.status.toLowerCase(),
      style: { textTransform: "capitalize" },
      cellType: "alpha-numeric",
    },
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
        "If a children is passed the component works as a HOC (High Order Component), wrapping the children and creating a overlay.",
    },
  },
};
