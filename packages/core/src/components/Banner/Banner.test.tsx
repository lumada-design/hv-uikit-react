import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvBanner } from "./Banner";

describe("Banner", () => {
  it("should be defined", () => {
    const { container } = render(<HvBanner open />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvBanner open />);
    expect(container).toMatchSnapshot();
  });

  it("should render the close button", () => {
    const { getByLabelText } = render(
      <HvBanner open variant="success" showIcon />
    );
    expect(getByLabelText("Close")).toBeInTheDocument();
  });

  it("it should render the actions", () => {
    const { getAllByRole } = render(
      <HvBanner
        id="banner1"
        variant="default"
        open
        label="label"
        actions={[
          {
            id: "testButton",
            label: "test",
          },
          {
            id: "testButton2",
            label: "test",
          },
        ]}
        actionsPosition="inline"
        onClose={() => {}}
      />
    );
    expect(getAllByRole("button").length).toBe(3);
  });
});
