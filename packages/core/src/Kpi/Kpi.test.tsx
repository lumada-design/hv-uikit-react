import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HvKpi } from "./Kpi";

describe("Kpi", () => {
  it("should render all components", () => {
    render(
      <HvKpi
        indicatorTextVariant="title1"
        indicatorUnitTextVariant="title2"
        labels={{
          title: "Title",
          indicator: "Indicator",
          unit: "Unit",
          comparisonIndicatorInfo: "Comparison indicator info",
        }}
        visualComparison="Visual comparison"
        trendIndicator={<div data-testid="trendIndicator" />}
        visualIndicator={<div data-testid="visualIndicator" />}
      />,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Indicator")).toBeInTheDocument();
    expect(screen.getByText("Unit")).toBeInTheDocument();
    expect(screen.getByText("Comparison indicator info")).toBeInTheDocument();
    expect(screen.getByText("Visual comparison")).toBeInTheDocument();
    expect(screen.getByTestId("trendIndicator")).toBeInTheDocument();
    expect(screen.getByTestId("visualIndicator")).toBeInTheDocument();
  });
});
