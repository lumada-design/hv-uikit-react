import { useState } from "react";
import ReactChart from "react-google-charts";
import { css, CSSInterpolation, cx } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  cardClasses,
  HvCard,
  HvKpi,
  HvKpiProps,
  HvLoading,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Blocked,
  Caution,
  Fail,
  Level0Good,
  Level2Average,
  Level3Bad,
  Severity1,
  Severity2,
  Severity3,
  Severity4,
  Severity5,
  Success,
  TopXS,
  Train,
} from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvKpi> = {
  title: "Visualizations/KPI",
  component: HvKpi,
};
export default meta;

export const Main: StoryObj<HvKpiProps> = {
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
      control: { type: "select" },
      options: ["display", "title1", "title2"],
    },
    indicatorUnitTextVariant: {
      control: { type: "select" },
      options: ["title2", "body"],
    },
    classes: { control: { disable: true } },
  },
  parameters: {
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: (args) => {
    return <HvKpi {...args} />;
  },
};

export const AverageService: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: { story: "A KPI showing the average service time." },
    },
  },
  render: () => {
    const styles: { [key: string]: CSSInterpolation } = {
      root: { width: 280 },
      contentContainer: {
        padding: "12px 16px 22px 16px",
      },
      valueContainer: {
        display: "flex",
        alignItems: "center",
      },
      title: { padding: "0px 24px 16px 0px" },
      value: { paddingRight: "10px" },
    };

    return (
      <HvCard
        className={css(styles.root)}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" color="positive" />}
      >
        <div className={css(styles.contentContainer)}>
          <HvTypography className={css(styles.title)} variant="label">
            Avg. service time
          </HvTypography>
          <div className={css(styles.valueContainer)}>
            <HvTypography className={css(styles.value)} variant="title2">
              12 414
            </HvTypography>
            <TopXS title="Up" color="positive" />
            <HvTypography>10%</HvTypography>
          </div>
        </div>
      </HvCard>
    );
  },
};

export const IOPS: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: { story: "A KPI sample showcasing the total IOPS." },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const styles: { [key: string]: CSSInterpolation } = {
      trendChartContainer: {
        pointerEvents: "none",
        marginRight: -8,
        marginBottom: -1,
      },
      root: { width: 280, cursor: "pointer" },
      title: { padding: "0px 24px 16px 0px" },
      time: { color: theme.colors.secondary_80 },
      trendTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingLeft: "4px",
      },
      trendContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      },
      valueContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      contentContainer: { padding: "12px 16px 22px 16px" },
    };

    const TrendChart = () => (
      <div className={css(styles.trendChartContainer)}>
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
        className={css(styles.root)}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "Space") {
            setSelected(!selected);
          }
        }}
        aria-pressed={selected}
        statusColor="negative"
        icon={<Level2Average title="Bad" color="negative" />}
      >
        <div className={css(styles.contentContainer)}>
          <HvTypography className={css(styles.title)} variant="label">
            Total IOPS
          </HvTypography>
          <div className={css(styles.valueContainer)}>
            <HvTypography variant="title2">113 227</HvTypography>
            <div className={css(styles.trendContainer)}>
              <TrendChart />
              <div className={css(styles.trendTextContainer)}>
                <HvTypography variant="caption2">-0,15%</HvTypography>
                <HvTypography variant="caption2" className={css(styles.time)}>
                  Last 24h
                </HvTypography>
              </div>
            </div>
          </div>
        </div>
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
        story: "A selectable KPI with the total numbers of event.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const styles: { [key: string]: CSSInterpolation } = {
      trendChartContainer: {
        pointerEvents: "none",
        marginRight: -8,
        marginBottom: -1,
      },
      root: { width: 280, cursor: "pointer" },
      title: {
        padding: "0px 24px 8px 24px",
      },
      time: { color: theme.colors.secondary_80 },
      trendTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingLeft: "4px",
      },
      trendContainer: {
        paddingTop: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 16px 22px 16px",
      },
    };

    const TrendChart = () => (
      <div className={css(styles.trendChartContainer)}>
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
        className={css(styles.root)}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "Space") {
            setSelected(!selected);
          }
        }}
        aria-pressed={selected}
        statusColor="sema0"
      >
        <div className={css(styles.contentContainer)}>
          <HvTypography className={css(styles.title)} variant="label">
            Total number of events
          </HvTypography>
          <HvTypography variant="title2">508K</HvTypography>
          <div className={css(styles.trendContainer)}>
            <TrendChart />
            <div className={css(styles.trendTextContainer)}>
              <HvTypography variant="caption2">+82,15%</HvTypography>
              <HvTypography variant="caption2" className={css(styles.time)}>
                Last 24h
              </HvTypography>
            </div>
          </div>
        </div>
      </HvCard>
    );
  },
};

export const SelectableSemantic: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "A selectable KPI with the total numbers of event.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const styles: { [key: string]: CSSInterpolation } = {
      trendChartContainer: {
        pointerEvents: "none",
        marginRight: -8,
        marginBottom: -1,
      },
      root: { width: 280, cursor: "pointer" },
      title: {
        padding: "0px 24px 8px 24px",
      },
      time: { color: theme.colors.secondary_80 },
      trendTextContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingLeft: "4px",
      },
      trendContainer: {
        paddingTop: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 16px 22px 16px",
      },
    };

    const TrendChart = () => (
      <div className={css(styles.trendChartContainer)}>
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
        className={css(styles.root)}
        selectable
        selected={selected}
        onClick={() => setSelected(!selected)}
        tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "Space") {
            setSelected(!selected);
          }
        }}
        aria-pressed={selected}
        statusColor="negative"
      >
        <div className={css(styles.contentContainer)}>
          <HvTypography className={css(styles.title)} variant="label">
            Total number of events
          </HvTypography>
          <HvTypography variant="title2">508K</HvTypography>
          <div className={css(styles.trendContainer)}>
            <TrendChart />
            <div className={css(styles.trendTextContainer)}>
              <HvTypography variant="caption2">-82,15%</HvTypography>
              <HvTypography className={css(styles.time)} variant="caption2">
                Last 24h
              </HvTypography>
            </div>
          </div>
        </div>
      </HvCard>
    );
  },
};

export const Gauge: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "A KPI with a gauge.",
      },
    },
  },
  render: () => {
    const styles: { [key: string]: CSSInterpolation } = {
      root: { width: 222 },
      title: {
        padding: "0px 24px 10px 24px",
        textAlign: "center",
      },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 16px 22px 16px",
      },
      gaugeContainer: {
        position: "relative",
      },
      gaugeOuterSemiCircle: {
        position: "relative",
        width: "122px",
        height: "61px",
        borderRadius: "61px 61px 0px 0px",
        backgroundColor: theme.colors.positive,
        overflow: "hidden",
      },
      gaugeInnerSemiCircle: {
        position: "absolute",
        width: "110px",
        height: "55px",
        borderRadius: "55px 55px 0px 0px",
        backgroundColor: theme.colors.atmo2,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      },
      gaugeMask: {
        position: "absolute",
        width: "122px",
        height: "61px",
        borderRadius: "61px 61px 0px 0px",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        backgroundColor: theme.colors.atmo4,
        transformOrigin: "bottom center",
      },
      gaugeIndicatorContainer: {
        position: "absolute",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        margin: "auto",
        bottom: -8,
      },
    };

    const GaugeChart = ({
      indicator,
      unit,
      percentage,
    }: Record<string, React.ReactNode>) => (
      <div className={css(styles.gaugeContainer)}>
        <div className={css(styles.gaugeOuterSemiCircle)}>
          <div
            className={cx(
              css(styles.gaugeMask),
              css({
                transform: `rotate(${percentage}deg)`,
              }),
            )}
          />
          <div className={css(styles.gaugeInnerSemiCircle)} />
        </div>
        <div className={css(styles.gaugeIndicatorContainer)}>
          <HvTypography variant="title2">{indicator}</HvTypography>
          {unit && (
            <HvTypography
              style={{ marginLeft: "2px", marginTop: "6px" }}
              variant="caption1"
            >
              {unit}
            </HvTypography>
          )}
        </div>
      </div>
    );

    return (
      <HvCard
        className={css(styles.root)}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" color="positive" />}
      >
        <div className={css(styles.contentContainer)}>
          <HvTypography className={css(styles.title)} variant="label">
            KPI description
          </HvTypography>
          <GaugeChart indicator="3,460" unit="t/h" percentage={125} />
        </div>
      </HvCard>
    );
  },
};

const alarmTypes = ["fail", "warning", "good", "neutral", "train"] as const;
type AlarmType = (typeof alarmTypes)[number];

export const StatusTrain: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "Status train KPI example.",
      },
    },
  },
  render: () => {
    const dataAlarms: { type: AlarmType; value: number }[] = [
      {
        type: "fail",
        value: 1,
      },
      {
        type: "warning",
        value: 2,
      },
      {
        type: "good",
        value: 8,
      },
      {
        type: "neutral",
        value: 4,
      },
    ];
    const dataTransport: { type: AlarmType; value: number }[] = [
      {
        type: "fail",
        value: 1,
      },
      {
        type: "train",
        value: 2,
      },
    ];

    const styles: { [key: string]: CSSInterpolation } = {
      storyRoot: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: theme.space.sm,
      },
      root: { width: 280 },
      dataContainer: {
        marginTop: theme.space.sm,
        display: "flex",
        flexWrap: "wrap",
        gap: theme.space.sm,
      },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: theme.space.xs,
      },
      alarmContainer: {
        display: "flex",
        alignItems: "center",
      },
    };

    const renderAlarm = (type: AlarmType, value: number) => {
      let icon;
      switch (type) {
        case "fail":
          icon = <Fail color="negative" />;
          break;
        case "good":
          icon = <Success color="positive" />;
          break;
        case "neutral":
          icon = <Blocked color="acce1" />;
          break;
        case "warning":
          icon = <Caution color="warning" />;
          break;
        case "train":
          icon = <Train color="acce1" />;
          break;
        default:
          break;
      }

      return (
        <div className={css(styles.alarmContainer)}>
          {icon}
          <HvTypography variant="caption1">{value}</HvTypography>
        </div>
      );
    };

    return (
      <div className={css(styles.storyRoot)}>
        <HvCard
          className={css(styles.root)}
          statusColor="positive"
          bgcolor="atmo2"
          icon={<Level0Good color="positive" />}
        >
          <div className={css(styles.contentContainer)}>
            <HvTypography variant="label">Alarms</HvTypography>
            <div className={css(styles.dataContainer)}>
              {dataAlarms.map((obj) => renderAlarm(obj.type, obj.value))}
            </div>
          </div>
        </HvCard>
        <HvCard
          className={css(styles.root)}
          statusColor="negative"
          bgcolor="atmo2"
          icon={<Level3Bad color="negative" />}
        >
          <div className={css(styles.contentContainer)}>
            <HvTypography variant="label">Transport</HvTypography>
            <div className={css(styles.dataContainer)}>
              {dataTransport.map((obj) => renderAlarm(obj.type, obj.value))}
            </div>
          </div>
        </HvCard>
      </div>
    );
  },
};

export const Small: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "Small KPI example.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const styles: { [key: string]: CSSInterpolation } = {
      storyRoot: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: theme.space.sm,
      },
      root: {
        width: 280,
        cursor: "pointer",
        backgroundColor: theme.colors.atmo1,

        ":hover": {
          backgroundColor: theme.colors.primary_20,

          [`& .${cardClasses.semanticBar}`]: {
            backgroundColor: theme.colors.primary_20,
          },
        },
      },
      semanticBar: {
        height: 1,
      },
      selectable: {
        "&:hover": {
          outline: `1px solid ${theme.colors.primary_20}`,
        },
      },
      contentContainer: {
        display: "flex",
        padding: theme.space.xs,
      },
      textContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.space.xs,
      },
      valueContainer: { display: "flex", alignItems: "flex-end" },
      caption: { color: theme.colors.secondary_80 },
      unit: {
        padding: "0px 2px 5px 2px",
      },
      rootLoading: {
        width: 280,
      },
      loadingContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.space.md,
        gap: theme.space.xs,
      },
    };

    return (
      <div className={css(styles.storyRoot)}>
        <HvCard
          selectable
          selected={selected}
          onClick={() => setSelected(!selected)}
          tabIndex={0}
          role="button"
          onKeyDown={(event) => {
            if (event.code === "Enter" || event.code === "Space") {
              setSelected(!selected);
            }
          }}
          aria-pressed={selected}
          classes={{
            semanticBar: css(styles.semanticBar),
            selectable: css(styles.selectable),
            root: css(styles.root),
          }}
        >
          <div className={css(styles.contentContainer)}>
            <Level3Bad color="negative" />
            <div className={css(styles.textContainer)}>
              <div className={css(styles.valueContainer)}>
                <HvTypography variant="title2">7</HvTypography>
                <HvTypography
                  variant="caption1"
                  className={cx(css(styles.caption), css(styles.unit))}
                >
                  %
                </HvTypography>
              </div>
              <HvTypography variant="caption1" className={css(styles.caption)}>
                Invalid services
              </HvTypography>
            </div>
          </div>
        </HvCard>
        <HvCard
          className={css(styles.rootLoading)}
          bgcolor="atmo2"
          classes={{
            semanticBar: css(styles.semanticBar),
          }}
        >
          <div className={css(styles.loadingContainer)}>
            <HvLoading small />
            <HvTypography>Loading data...</HvTypography>
          </div>
        </HvCard>
      </div>
    );
  },
};

const severityTypes = ["1", "2", "3", "4", "5"] as const;
type SeverityType = (typeof severityTypes)[number];

export const Column: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      description: {
        story: "Column KPI example.",
      },
    },
  },
  render: () => {
    const data: { value: number; severity: SeverityType }[] = [
      { value: 1220, severity: "1" },
      { value: 32, severity: "2" },
      { value: 2098, severity: "3" },
      { value: 230, severity: "4" },
      { value: 3980, severity: "5" },
    ];

    const styles: { [key: string]: CSSInterpolation } = {
      root: { width: "fit-content" },
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        padding: theme.space.sm,

        "& > *:not(:last-child)": {
          paddingBottom: theme.space.xs,
        },
      },
      semanticBar: {
        height: 1,
      },
      severityContainer: {
        display: "flex",
        justifyContent: "space-between",
      },
      valueContainer: {
        display: "flex",
        paddingLeft: theme.space.md,
        alignItems: "flex-end",
      },
      unit: {
        color: theme.colors.secondary_80,
        padding: "0px 2px 5px 2px",
      },
    };

    const renderSeverity = (value: number, type: SeverityType) => {
      let icon;
      switch (type) {
        case "1":
          icon = <Severity1 color="sema2h" />;
          break;
        case "2":
          icon = <Severity2 color="negative_80" />;
          break;
        case "3":
          icon = <Severity3 color="negative" />;
          break;
        case "4":
          icon = <Severity4 color="warning" />;
          break;
        case "5":
          icon = <Severity5 color="neutral" />;
          break;
        default:
          break;
      }

      return (
        <div className={css(styles.severityContainer)}>
          {icon}
          <div className={css(styles.valueContainer)}>
            <HvTypography variant="title2">{value}</HvTypography>
            <HvTypography variant="caption1" className={css(styles.unit)}>
              GB
            </HvTypography>
          </div>
        </div>
      );
    };

    return (
      <HvCard
        className={css(styles.root)}
        bgcolor="atmo1"
        classes={{
          semanticBar: css(styles.semanticBar),
        }}
      >
        <div className={css(styles.contentContainer)}>
          {data.map((obj) => renderSeverity(obj.value, obj.severity))}
        </div>
      </HvCard>
    );
  },
};
