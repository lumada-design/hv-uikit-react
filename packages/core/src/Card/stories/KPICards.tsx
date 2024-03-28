import { useState } from "react";
import { css } from "@emotion/css";
import { Grid } from "@mui/material";
import {
  HvActionBar,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCheckBox,
  HvKpi,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Level1,
  Level2Average,
  Level3Bad,
  Tool,
} from "@hitachivantara/uikit-react-icons";

const data = {
  firstTitle: "Related assets",
  firstContent: "Primary asset to be worked on, other asset, other asset",
  secondTitle: "Description",
  secondContent:
    "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary.",
};

const classes = {
  grid: css({
    paddingTop: theme.space.sm,
    paddingRight: 0,
    paddingBottom: theme.space.sm,
    paddingLeft: 0,
  }),
  card: css({ margin: theme.space.sm, backgroundColor: theme.colors.atmo1 }),
};

const getKpiLabels = (score: string) => ({
  title: "Confidence score",
  indicator: `${score}%`,
});

const CardContent = ({
  value,
  icon,
}: {
  value: string;
  icon: React.ReactNode;
}) => (
  <HvCardContent>
    <Grid container>
      <HvKpi labels={getKpiLabels(value)} visualIndicator={icon} />
    </Grid>
    <Grid container>
      <Grid className={classes.grid} item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="label">{data.firstTitle}</HvTypography>
        <HvTypography>{data.firstContent}</HvTypography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <HvTypography variant="label">{data.secondTitle}</HvTypography>
        <HvTypography>{data.secondContent}</HvTypography>
      </Grid>
    </Grid>
  </HvCardContent>
);

export const KPICards = () => {
  const [checked, setChecked] = useState(0);

  const renderFooter = ({ n, value }: { n: number; value: string }) => (
    <HvActionBar>
      <HvCheckBox
        onChange={() => setChecked(n)}
        checked={checked === n}
        value="value"
        inputProps={{
          "aria-label": `Tick to select the replace contaminated oil card with confidence score of ${value}%`,
        }}
      />
      <div style={{ flex: 1 }} />
    </HvActionBar>
  );

  return (
    <Grid container role="grid" aria-label="Select one card">
      <Grid container role="row">
        <Grid item xs={12} md={4}>
          <HvCard
            className={classes.card}
            statusColor="neutral"
            selectable
            selected={checked === 1}
            role="gridcell"
            aria-selected={checked === 1}
          >
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent value="85" icon={<Level1 color="neutral" />} />
            {renderFooter({ n: 1, value: "85" })}
          </HvCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <HvCard
            className={classes.card}
            statusColor="warning"
            selectable
            selected={checked === 2}
            role="gridcell"
            aria-selected={checked === 2}
          >
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent value="45" icon={<Level2Average color="warning" />} />
            {renderFooter({ n: 2, value: "84" })}
          </HvCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <HvCard
            className={classes.card}
            statusColor="negative"
            selectable
            selected={checked === 3}
            role="gridcell"
            aria-selected={checked === 3}
          >
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent value="19" icon={<Level3Bad color="negative" />} />
            {renderFooter({ n: 3, value: "19" })}
          </HvCard>
        </Grid>
      </Grid>
    </Grid>
  );
};
