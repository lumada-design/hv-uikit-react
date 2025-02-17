import { useState } from "react";
import ReactChart from "react-google-charts";
import { css, cx } from "@emotion/css";
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

import { Selectable as SelectableStory } from "./stories/Selectable";
import SelectableStoryRaw from "./stories/Selectable?raw";

const meta: Meta<typeof HvKpi> = {
  title: "Visualizations/KPI",
  component: HvKpi,
  parameters: {
    a11y: {
      config: {
        rules: [
          // disable react-google-chart's labelling elements without role
          { id: "aria-allowed-attr", enabled: false },
          { id: "aria-prohibited-attr", enabled: false },
        ],
      },
    },
  },
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
    const classes = {
      root: css({ width: 280 }),
      contentContainer: css({
        padding: "12px 16px 22px 16px",
      }),
      valueContainer: css({
        display: "flex",
        alignItems: "center",
      }),
      title: css({ padding: "0px 24px 16px 0px" }),
      value: css({ paddingRight: "10px" }),
    };

    return (
      <HvCard
        className={classes.root}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" color="positive" />}
      >
        <div className={classes.contentContainer}>
          <HvTypography className={classes.title} variant="label">
            Avg. service time
          </HvTypography>
          <div className={classes.valueContainer}>
            <HvTypography className={classes.value} variant="title2">
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

    const classes = {
      trendChartContainer: css({
        pointerEvents: "none",
        marginRight: -8,
        marginBottom: -1,
      }),
      root: css({ width: 280, cursor: "pointer" }),
      title: css({ padding: "0px 24px 16px 0px" }),
      time: css({ color: theme.colors.secondary_80 }),
      trendTextContainer: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingLeft: "4px",
      }),
      trendContainer: css({
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }),
      valueContainer: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }),
      contentContainer: css({ padding: "12px 16px 22px 16px" }),
    };

    const TrendChart = () => (
      <div className={classes.trendChartContainer}>
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
        className={classes.root}
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
        <div className={classes.contentContainer}>
          <HvTypography className={classes.title} variant="label">
            Total IOPS
          </HvTypography>
          <div className={classes.valueContainer}>
            <HvTypography variant="title2">113 227</HvTypography>
            <div className={classes.trendContainer}>
              <TrendChart />
              <div className={classes.trendTextContainer}>
                <HvTypography variant="caption2">-0,15%</HvTypography>
                <HvTypography variant="caption2" className={classes.time}>
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

export const Selectable: StoryObj<HvKpiProps> = {
  parameters: {
    docs: {
      source: { code: SelectableStoryRaw },
      description: {
        story: "A selectable KPI with the total numbers of events.",
      },
    },
  },
  render: () => <SelectableStory />,
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
    const classes = {
      root: css({ width: 222 }),
      title: css({
        padding: "0px 24px 10px 24px",
        textAlign: "center",
      }),
      contentContainer: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px 16px 22px 16px",
      }),
      gaugeContainer: css({
        position: "relative",
      }),
      gaugeOuterSemiCircle: css({
        position: "relative",
        width: "122px",
        height: "61px",
        borderRadius: "61px 61px 0px 0px",
        backgroundColor: theme.colors.positive,
        overflow: "hidden",
      }),
      gaugeInnerSemiCircle: css({
        position: "absolute",
        width: "110px",
        height: "55px",
        borderRadius: "55px 55px 0px 0px",
        backgroundColor: theme.colors.atmo2,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      }),
      gaugeMask: css({
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
      }),
      gaugeIndicatorContainer: css({
        position: "absolute",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        margin: "auto",
        bottom: -8,
      }),
    };

    const GaugeChart = ({
      indicator,
      unit,
      percentage,
    }: Record<string, React.ReactNode>) => (
      <div className={classes.gaugeContainer}>
        <div className={classes.gaugeOuterSemiCircle}>
          <div
            className={cx(
              classes.gaugeMask,
              css({
                transform: `rotate(${percentage}deg)`,
              }),
            )}
          />
          <div className={classes.gaugeInnerSemiCircle} />
        </div>
        <div className={classes.gaugeIndicatorContainer}>
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
        className={classes.root}
        statusColor="positive"
        bgcolor="atmo2"
        icon={<Level0Good title="Good" color="positive" />}
      >
        <div className={classes.contentContainer}>
          <HvTypography className={classes.title} variant="label">
            KPI description
          </HvTypography>
          <GaugeChart indicator="3,460" unit="t/h" percentage={125} />
        </div>
      </HvCard>
    );
  },
};

type AlarmType = "fail" | "warning" | "good" | "neutral" | "train";

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

    const classes = {
      storyRoot: css({
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: theme.space.sm,
      }),
      root: css({ width: 280 }),
      dataContainer: css({
        marginTop: theme.space.sm,
        display: "flex",
        flexWrap: "wrap",
        gap: theme.space.sm,
      }),
      contentContainer: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: theme.space.xs,
      }),
      alarmContainer: css({
        display: "flex",
        alignItems: "center",
      }),
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
        <div className={classes.alarmContainer}>
          {icon}
          <HvTypography variant="caption1">{value}</HvTypography>
        </div>
      );
    };

    return (
      <div className={classes.storyRoot}>
        <HvCard
          className={classes.root}
          statusColor="positive"
          bgcolor="atmo2"
          icon={<Level0Good color="positive" />}
        >
          <div className={classes.contentContainer}>
            <HvTypography variant="label">Alarms</HvTypography>
            <div className={classes.dataContainer}>
              {dataAlarms.map((obj) => renderAlarm(obj.type, obj.value))}
            </div>
          </div>
        </HvCard>
        <HvCard
          className={classes.root}
          statusColor="negative"
          bgcolor="atmo2"
          icon={<Level3Bad color="negative" />}
        >
          <div className={classes.contentContainer}>
            <HvTypography variant="label">Transport</HvTypography>
            <div className={classes.dataContainer}>
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

    const classes = {
      storyRoot: css({
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: theme.space.sm,
      }),
      root: css({
        width: 280,
        cursor: "pointer",
        backgroundColor: theme.colors.atmo1,

        ":hover": {
          backgroundColor: theme.colors.primary_20,

          [`& .${cardClasses.semanticBar}`]: {
            backgroundColor: theme.colors.primary_20,
          },
        },
      }),
      semanticBar: css({
        height: 1,
      }),
      selectable: css({
        "&:hover": {
          outline: `1px solid ${theme.colors.primary_20}`,
        },
      }),
      contentContainer: css({
        display: "flex",
        padding: theme.space.xs,
      }),
      textContainer: css({
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.space.xs,
      }),
      valueContainer: css({ display: "flex", alignItems: "flex-end" }),
      caption: css({ color: theme.colors.secondary_80 }),
      unit: css({
        padding: "0px 2px 5px 2px",
      }),
      rootLoading: css({
        width: 280,
      }),
      loadingContainer: css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.space.md,
        gap: theme.space.xs,
      }),
    };

    return (
      <div className={classes.storyRoot}>
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
            semanticBar: classes.semanticBar,
            selectable: classes.selectable,
            root: classes.root,
          }}
        >
          <div className={classes.contentContainer}>
            <Level3Bad color="negative" />
            <div className={classes.textContainer}>
              <div className={classes.valueContainer}>
                <HvTypography variant="title2">7</HvTypography>
                <HvTypography
                  variant="caption1"
                  className={cx(classes.caption, classes.unit)}
                >
                  %
                </HvTypography>
              </div>
              <HvTypography variant="caption1" className={classes.caption}>
                Invalid services
              </HvTypography>
            </div>
          </div>
        </HvCard>
        <HvCard
          className={classes.rootLoading}
          bgcolor="atmo2"
          classes={{
            semanticBar: classes.semanticBar,
          }}
        >
          <div className={classes.loadingContainer}>
            <HvLoading small />
            <HvTypography>Loading data...</HvTypography>
          </div>
        </HvCard>
      </div>
    );
  },
};

type SeverityType = "1" | "2" | "3" | "4" | "5";

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

    const classes = {
      root: css({ width: "fit-content" }),
      contentContainer: css({
        display: "flex",
        flexDirection: "column",
        padding: theme.space.sm,

        "& > *:not(:last-child)": {
          paddingBottom: theme.space.xs,
        },
      }),
      semanticBar: css({
        height: 1,
      }),
      severityContainer: css({
        display: "flex",
        justifyContent: "space-between",
      }),
      valueContainer: css({
        display: "flex",
        paddingLeft: theme.space.md,
        alignItems: "flex-end",
      }),
      unit: css({
        color: theme.colors.secondary_80,
        padding: "0px 2px 5px 2px",
      }),
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
        <div className={classes.severityContainer}>
          {icon}
          <div className={classes.valueContainer}>
            <HvTypography variant="title2">{value}</HvTypography>
            <HvTypography variant="caption1" className={classes.unit}>
              GB
            </HvTypography>
          </div>
        </div>
      );
    };

    return (
      <HvCard
        className={classes.root}
        bgcolor="atmo1"
        classes={{
          semanticBar: classes.semanticBar,
        }}
      >
        <div className={classes.contentContainer}>
          {data.map((obj) => renderSeverity(obj.value, obj.severity))}
        </div>
      </HvCard>
    );
  },
};
