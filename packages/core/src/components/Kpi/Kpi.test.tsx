import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TopXS } from "@hitachivantara/uikit-react-icons";

import { HvKpi } from "@core/components";

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
        trendIndicator={<TopXS role="img" title="Trend indicator" />}
        visualIndicator={<TopXS role="img" title="Visual indicator" />}
      />
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Indicator")).toBeInTheDocument();
    expect(screen.getByText("Unit")).toBeInTheDocument();
    expect(screen.getByText("Comparison indicator info")).toBeInTheDocument();
    expect(screen.getByText("Visual comparison")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Trend indicator" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Visual indicator" })
    ).toBeInTheDocument();
  });
});
