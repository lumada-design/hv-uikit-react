import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { HvProvider } from "@core/providers";

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
  it("should render the correct number of items", () => {
    render(<HvBreadCrumb listRoute={data} />);
    expect(screen.queryAllByRole("listitem").length).toBe(7);
    expect(screen.getByText("Label 1")).toBeInTheDocument();
    expect(screen.getByText("Label 7")).toBeInTheDocument();
  });

  it("should render the correct number of items if maxVisible is specified", () => {
    render(
      <HvProvider>
        <HvBreadCrumb listRoute={data} maxVisible={3} />
      </HvProvider>
    );
    expect(screen.queryAllByRole("listitem").length).toBe(4);
    expect(screen.getByText("Label 1")).toBeInTheDocument();
    expect(screen.queryByText("Label 2")).toBeNull();
    expect(screen.queryByText("Label 5")).toBeNull();
    expect(screen.getByText("Label 6")).toBeInTheDocument();
    expect(screen.getByText("Label 7")).toBeInTheDocument();
  });
});
