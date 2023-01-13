import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HvKpi } from "components";
import { TopXS } from "@hitachivantara/uikit-icons";

describe("Kpi", () => {
  it("should be defined", () => {
    const { container } = render(<HvKpi />);

    expect(container).toBeDefined();
  });

  it("should render correctly", () => {
    const { container } = render(
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
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render all components", () => {
    const { getByText, getByTitle } = render(
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
        trendIndicator={<TopXS title="Trend indicator" />}
        visualIndicator={<TopXS title="Visual indicator" />}
      />
    );

    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Indicator")).toBeInTheDocument();
    expect(getByText("Unit")).toBeInTheDocument();
    expect(getByText("Comparison indicator info")).toBeInTheDocument();
    expect(getByText("Visual comparison")).toBeInTheDocument();
    expect(getByTitle("Trend indicator")).toBeInTheDocument();
    expect(getByTitle("Visual indicator")).toBeInTheDocument();
  });
});
