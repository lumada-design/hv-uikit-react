import { Meta, StoryObj } from "@storybook/react";
import { HvCard, HvKpi, HvKpiProps, HvTypography } from "components";
import {
  Level0Good,
  TopXS,
  Level2Average,
} from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvAtmosphereColorKeys, HvSemanticColorKeys } from "types/tokens";
import { useState } from "react";
import ReactChart from "react-google-charts";
import styled from "@emotion/styled";

const meta: Meta<typeof HvKpi> = {
  title: "Visualizations/KPI",
  component: HvKpi,
};
export default meta;

export const Main: StoryObj<HvKpiProps> = {
  parameters: {
    eyes: {
      waitBeforeCapture: 5000,
    },
  },
  args: {
    indicatorTextVariant: "title1",
    indicatorUnitTextVariant: "title2",
    labels: {
      title: "Title",
      indicator: "9.99",
      unit: "Units",
    },
  },
  argTypes: {
    trendIndicator: { control: { disable: true } },
    visualIndicator: { control: { disable: true } },
    visualComparison: { control: { disable: true } },
    labels: { control: { disable: true } },
    indicatorTextVariant: {
      control: {
        type: "select",
        options: ["display", "title1", "title2"],
      },
    },
    indicatorUnitTextVariant: {
      control: {
        type: "select",
        options: ["title2", "body"],
      },
    },
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvKpi {...args} />;
  },
};

export const AverageService: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: { story: "A kpi showing the average service time." },
    },
  },
  render: () => {
    const StyledContainer = styled("div")({
      padding: "12px 16px 22px 16px",
    });

    const StyledBottomContainer = styled("div")({
      display: "flex",
      alignItems: "center",
    });

    return (
      <HvCard
        style={{ width: 280 }}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" semantic="positive" />}
      >
        <StyledContainer>
          <HvTypography
            style={{
              padding: "0px 24px 16px 0px",
            }}
            variant="label"
          >
            Avg. service time
          </HvTypography>
          <StyledBottomContainer>
            <HvTypography
              variant="title2"
              style={{
                paddingRight: "10px",
              }}
            >
              12 414
            </HvTypography>
            <TopXS title="Up" semantic="positive" />
            <HvTypography>10%</HvTypography>
          </StyledBottomContainer>
        </StyledContainer>
      </HvCard>
    );
  },
};

export const IOPS: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: { story: "A Kpi sample showcasing the total IOPS." },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const StyledContainer = styled("div")({
      padding: "12px 16px 22px 16px",
    });

    const StyledBottomContainer = styled("div")({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    });

    const StyledTrendContainer = styled("div")({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    });

    const StyledTrendDataContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingLeft: "4px",
    });

    const TrendChart = () => (
      <div style={{ pointerEvents: "none", marginRight: -8, marginBottom: -1 }}>
        <ReactChart
          width="40px"
          height="30px"
          chartType="AreaChart"
          data={[
            ["Year", "Sales"],
            ["2019", 3000],
            ["2020", 2170],
            ["2021", 760],
            ["2022", 630],
          ]}
          options={{
            legend: "none",
            colors: ["red"],
            tooltip: {
              trigger: "none",
            },
            hAxis: {
              minValue: 0,
              maxValue: 10,
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
            backgroundColor: "transparent",
            vAxis: {
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
          }}
        />
      </div>
    );

    return (
      <HvCard
        style={{ width: 280, cursor: "pointer" }}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        statusColor="negative"
        icon={<Level2Average title="Bad" semantic="negative" />}
      >
        <StyledContainer>
          <HvTypography
            style={{
              padding: "0px 24px 16px 0px",
            }}
            variant="label"
          >
            Total IOPS
          </HvTypography>
          <StyledBottomContainer>
            <HvTypography variant="title2">113 227</HvTypography>
            <StyledTrendContainer>
              <TrendChart />
              <StyledTrendDataContainer>
                <HvTypography variant="caption2">-0,15%</HvTypography>
                <HvTypography
                  variant="caption2"
                  style={{ color: theme.colors.secondary_80 }}
                >
                  Last 24h
                </HvTypography>
              </StyledTrendDataContainer>
            </StyledTrendContainer>
          </StyledBottomContainer>
        </StyledContainer>
      </HvCard>
    );
  },
};

export const StorageArray: StoryObj<HvKpiProps> = {
  args: {
    indicatorTextVariant: "title1",
    indicatorUnitTextVariant: "title2",
    labels: {
      title: "# of Storage arrays",
      indicator: "27",
      comparisonIndicatorInfo: "vs last 24h",
    },
    visualComparison: "-5 units",
  },
  render: (args) => {
    return <HvKpi {...args} />;
  },
};

export const Selectable: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "A selectable kpi with the total numbers of event.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const StyledContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "12px 16px 22px 16px",
    });

    const StyledTrendContainer = styled("div")({
      paddingTop: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    });

    const StyledTrendDataContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      paddingLeft: "4px",
    });

    const TrendChart = () => (
      <div style={{ pointerEvents: "none", marginRight: -8, marginBottom: -1 }}>
        <ReactChart
          width="40px"
          height="30px"
          chartType="AreaChart"
          data={[
            ["Year", "Sales"],
            ["2019", 1200],
            ["2020", 2100],
            ["2021", 3200],
            ["2022", 3500],
          ]}
          options={{
            legend: "none",
            colors: ["green"],
            tooltip: {
              trigger: "none",
            },
            hAxis: {
              minValue: 0,
              maxValue: 10,
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
            backgroundColor: "transparent",
            vAxis: {
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
          }}
        />
      </div>
    );

    return (
      <HvCard
        style={{ width: 280, cursor: "pointer" }}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        statusColor="sema0"
      >
        <StyledContainer>
          <HvTypography
            style={{
              padding: "0px 24px 8px 24px",
            }}
            variant="label"
          >
            Total number of events
          </HvTypography>
          <HvTypography variant="title2">508K</HvTypography>
          <StyledTrendContainer>
            <TrendChart />
            <StyledTrendDataContainer>
              <HvTypography variant="caption2">+82,15%</HvTypography>
              <HvTypography
                variant="caption2"
                style={{ color: theme.colors.secondary_80 }}
              >
                Last 24h
              </HvTypography>
            </StyledTrendDataContainer>
          </StyledTrendContainer>
        </StyledContainer>
      </HvCard>
    );
  },
};

export const SelectableSemantic: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "A selectable kpi with the total numbers of event.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const StyledContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "12px 16px 22px 16px",
    });

    const StyledTrendContainer = styled("div")({
      paddingTop: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    });

    const StyledTrendDataContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      paddingLeft: "4px",
    });

    const TrendChart = () => (
      <div style={{ pointerEvents: "none", marginRight: -8, marginBottom: -1 }}>
        <ReactChart
          width="40px"
          height="30px"
          chartType="AreaChart"
          data={[
            ["Year", "Sales"],
            ["2019", 3500],
            ["2020", 3200],
            ["2021", 2100],
            ["2022", 1200],
          ]}
          options={{
            legend: "none",
            colors: ["red"],
            tooltip: {
              trigger: "none",
            },
            hAxis: {
              minValue: 0,
              maxValue: 10,
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
            backgroundColor: "transparent",
            vAxis: {
              gridlines: {
                color: "transparent",
              },
              baselineColor: "transparent",
            },
          }}
        />
      </div>
    );

    return (
      <HvCard
        style={{ width: 280, cursor: "pointer" }}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        statusColor="negative"
      >
        <StyledContainer>
          <HvTypography
            style={{
              padding: "0px 24px 8px 24px",
            }}
            variant="label"
          >
            Total number of events
          </HvTypography>
          <HvTypography variant="title2">508K</HvTypography>
          <StyledTrendContainer>
            <TrendChart />
            <StyledTrendDataContainer>
              <HvTypography variant="caption2">-82,15%</HvTypography>
              <HvTypography
                variant="caption2"
                style={{ color: theme.colors.secondary_80 }}
              >
                Last 24h
              </HvTypography>
            </StyledTrendDataContainer>
          </StyledTrendContainer>
        </StyledContainer>
      </HvCard>
    );
  },
};

export const Gauge: StoryObj<HvKpiProps> = {
  render: () => {
    const StyledContainer = styled("div")({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "12px 16px 22px 16px",
    });

    const StyledGaugeContainer = styled("div")({
      position: "relative",
    });

    const StyledOuterSemiCircle = styled("div")(
      ({
        statusColor,
      }: {
        statusColor: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
      }) => ({
        position: "relative",
        width: "122px",
        height: "61px",
        borderRadius: "61px 61px 0px 0px",
        backgroundColor: theme.colors[statusColor],
        overflow: "hidden",
      })
    );

    const StyledInnerSemiCircle = styled("div")(
      ({
        bgcolor,
      }: {
        bgcolor: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
      }) => ({
        position: "absolute",
        width: "110px",
        height: "55px",
        borderRadius: "55px 55px 0px 0px",
        backgroundColor: theme.colors[bgcolor],
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      })
    );

    const StyledGaugeMask = styled("div")(
      ({ percentage }: { percentage: number }) => ({
        position: "absolute",
        width: "122px",
        height: "61px",
        borderRadius: "61px 61px 0px 0px",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        backgroundColor: theme.colors.atmo4,
        transform: `rotate(${percentage}deg)`,
        transformOrigin: "bottom center",
      })
    );

    const StyledIndicatorContainer = styled("div")({
      position: "absolute",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      right: 0,
      margin: "auto",
      bottom: -8,
    });

    const GaugeChart = ({
      indicator,
      unit,
      percentage,
      statusColor = "sema0",
      bgcolor = "atmo1",
    }: {
      indicator: string;
      unit?: string;
      percentage?: number;
      statusColor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
      bgcolor?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
    }) => (
      <StyledGaugeContainer>
        <StyledOuterSemiCircle statusColor={statusColor}>
          <StyledGaugeMask percentage={percentage ?? 0} />
          <StyledInnerSemiCircle bgcolor={bgcolor} />
        </StyledOuterSemiCircle>
        <StyledIndicatorContainer>
          <HvTypography variant="title2">{indicator}</HvTypography>
          {unit && (
            <HvTypography
              style={{ marginLeft: "2px", marginTop: "6px" }}
              variant="caption1"
            >
              {unit}
            </HvTypography>
          )}
        </StyledIndicatorContainer>
      </StyledGaugeContainer>
    );

    return (
      <HvCard
        style={{ width: 222 }}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" semantic="positive" />}
      >
        <StyledContainer>
          <HvTypography
            style={{
              padding: "0px 24px 10px 24px",
              textAlign: "center",
            }}
            variant="label"
          >
            KPI description
          </HvTypography>
          <GaugeChart
            indicator="3,460"
            unit="t/h"
            percentage={125}
            statusColor="positive"
            bgcolor="atmo2"
          />
        </StyledContainer>
      </HvCard>
    );
  },
};
