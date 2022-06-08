/* eslint-env jest */

import React from "react";
import { render } from "testing-utils";
import HvControls from "../Controls";

export default {
  title: "Tests/Controls",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

const data = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 29,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "derek",
    lastName: "perkins",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "bergevin",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

function App(props) {
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
            Header: "Status",
            accessor: "status",
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

  return <HvControls columns={columns} data={data} {...props} />;
}

describe("Controls", () => {
  it("should render the component without customization", () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
  it("should render the component without left controls", () => {
    const { container } = render(<App leftControls={() => null} />);

    expect(container).toMatchSnapshot();
  });
  it("should render the component without right controls", () => {
    const { container } = render(<App rightControls={() => null} />);

    expect(container).toMatchSnapshot();
  });

  it("should render the component with the custom right controls", () => {
    const { getByTestId } = render(
      <App
        rightControls={(props) => <div data-testid={props?.testid}>{props?.customProp}</div>}
        rightControlsProps={{
          testid: "custom-right",
          customProp: "test",
        }}
      />
    );

    expect(getByTestId("custom-right")).toHaveTextContent("test");
    expect(getByTestId("custom-right")).toHaveAttribute("data-testid");
  });

  it("should render the component with the custom left controls", () => {
    const { getByTestId } = render(
      <App
        leftControls={(props) => <div data-testid={props?.testid}>{props?.customProp}</div>}
        leftControlsProps={{
          testid: "custom-left",
          customProp: "test",
        }}
      />
    );

    expect(getByTestId("custom-left")).toHaveTextContent("test");
    expect(getByTestId("custom-left")).toHaveAttribute("data-testid");
  });
});
