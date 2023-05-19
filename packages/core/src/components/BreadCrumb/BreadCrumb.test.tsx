import { render } from "@testing-library/react";
import { HvProvider } from "@core/providers";
import { describe, expect, it } from "vitest";
import { HvBreadCrumb } from "./BreadCrumb";

const data = [
  { label: "Label 1", path: "route1" },
  { label: "Label 2", path: "route2" },
  { label: "Label 3", path: "route3" },
  { label: "Label 4", path: "route4" },
  { label: "Label 5", path: "route5" },
  { label: "Label 6", path: "route6" },
  { label: "Label 7", path: "route7" },
];

describe("BreadCrumb", () => {
  it("should be defined", () => {
    const { container } = render(<HvBreadCrumb />);
    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(<HvBreadCrumb listRoute={data} />);
    expect(container).toMatchSnapshot();
  });

  it("should render the correct number of items", () => {
    const { queryAllByRole } = render(<HvBreadCrumb listRoute={data} />);
    expect(queryAllByRole("listitem").length).toBe(7);
  });

  it("should render the correct number of items if maxVisible is specified", () => {
    const { queryAllByRole } = render(
      <HvProvider>
        <HvBreadCrumb listRoute={data} maxVisible={2} />
      </HvProvider>
    );
    expect(queryAllByRole("listitem").length).toBe(3);
  });
});
