import { ReactNode } from "react";
import { css } from "@emotion/css";
import {
  HvCard,
  HvCardContent,
  HvCardProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Level0Good } from "@hitachivantara/uikit-react-icons";

const styles = {
  root: css({}),
  title: css({
    padding: theme.spacing(0, 3, 1),
    textAlign: "center",
  }),
  contentContainer: css({
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    paddingTop: theme.space.xs,
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
    alignItems: "baseline",
    justifyContent: "center",
    gap: 2,
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
  <div className={styles.gaugeOuterSemiCircle}>
    <div
      className={styles.gaugeMask}
      style={{ transform: `rotate(${percentage}deg)` }}
    />
    <div className={styles.gaugeInnerSemiCircle} />
    <div className={styles.gaugeIndicatorContainer}>
      <HvTypography variant="title2">{indicator}</HvTypography>
      {unit && <HvTypography variant="caption1">{unit}</HvTypography>}
    </div>
  </div>
);

interface KpiProps extends HvCardProps {
  title: string;
  value: ReactNode;
  unit?: ReactNode;
  color: HvCardProps["statusColor"];
}

export const Kpi = ({ title, value, color, unit = "t/h" }: KpiProps) => {
  return (
    <HvCard
      className={styles.root}
      statusColor={color}
      bgcolor="atmo2"
      icon={<Level0Good title="Good" color="positive" />}
    >
      <HvCardContent className={styles.contentContainer}>
        <HvTypography className={styles.title} variant="label">
          {title}
        </HvTypography>
        <GaugeChart indicator={value} unit={unit} percentage={125} />
      </HvCardContent>
    </HvCard>
  );
};
