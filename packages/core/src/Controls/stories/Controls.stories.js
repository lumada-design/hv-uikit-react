/* eslint-disable react/no-array-index-key */
import React from "react";
import ControlsRoot from "..";
import makedata from "./makedata";
import SimpleGrid from "../../SimpleGrid";
import HvCard, { HvCardHeader, HvCardContent } from "../../Card";

export default {
  title: "Components/Controls",
  parameters: {
    componentSubtitle: "",
    usage: 'import { HvControls } from "@hitachivantara/uikit-react-core"',
  },
  component: ControlsRoot,
};

export const Controls = () => {
  const [data, setData] = React.useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const onSearchChange = (newData) => {
    setData(newData);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
      data-testid="ancestor"
    >
      <ControlsRoot
        columns={columns}
        data={React.useMemo(() => makedata(5), [])}
        onSearchChange={onSearchChange}
      >
        <ControlsRoot.LeftControls placeholder="Search" onSearchChange={onSearchChange} />
        <ControlsRoot.RightControls
          values={[
            { id: "age", label: "Age" },
            { id: "visits", label: "Visits" },
          ]}
        />
      </ControlsRoot>
      <SimpleGrid cols={3}>
        {data?.map((row, index) => {
          return (
            <HvCard bgcolor="atmo1" key={`${index}-row`} style={{ width: "100%" }}>
              <HvCardHeader title={index} />
              <HvCardContent>Age: {row?.values?.age}</HvCardContent>
              <HvCardContent>Visits: {row?.values?.visits}</HvCardContent>
            </HvCard>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export const CustomControls = () => {
  const [data, setData] = React.useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const onSearchChange = (newData) => {
    setData(newData);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <ControlsRoot
        columns={columns}
        data={React.useMemo(() => makedata(5), [])}
        onSearchChange={onSearchChange}
      >
        <ControlsRoot.LeftControls
          placeholder="Search"
          onSearchChange={onSearchChange}
          search={false}
        >
          Custom left control
        </ControlsRoot.LeftControls>
        <ControlsRoot.RightControls
          values={[
            { id: "age", label: "Age" },
            { id: "visits", label: "Visits" },
          ]}
          viewSelect={false}
        >
          Custom right control
        </ControlsRoot.RightControls>
      </ControlsRoot>
      <SimpleGrid cols={3}>
        {data?.map((row, index) => {
          return (
            <HvCard bgcolor="atmo1" key={`${index}-row`} style={{ width: "100%" }}>
              <HvCardHeader title={index} />
              <HvCardContent>Age: {row?.values?.age}</HvCardContent>
              <HvCardContent>Visits: {row?.values?.visits}</HvCardContent>
            </HvCard>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
