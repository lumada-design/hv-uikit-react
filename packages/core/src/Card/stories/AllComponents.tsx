import { useState } from "react";
import { css } from "@emotion/css";
import { Grid } from "@mui/material";
import {
  HvActionBar,
  HvActionsGeneric,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCheckBox,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Delete,
  Level3Bad,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";

const classes = {
  grid: css({
    paddingTop: theme.space.sm,
    paddingRight: 0,
    paddingBottom: theme.space.sm,
    paddingLeft: 0,
  }),
  gridBottom: css({ padding: 0 }),
  span: css({
    borderRight: `1px solid ${theme.colors.secondary}`,
    paddingRight: theme.space.xs,
    marginRight: theme.space.xs,
  }),
};

const actions = [
  { id: "post", label: "Upload", icon: <Upload />, disabled: false },
  {
    id: "get",
    label: "Preview",
    icon: <Preview color="secondary_60" />,
    disabled: true,
  },
  {
    id: "put",
    label: "Add",
    icon: <Add color="secondary_60" />,
    disabled: true,
  },
  { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
];

const cells = [
  { title: "Priority", content: "High" },
  {
    title: "Main Asset",
    content: "California wonder grain of wonderfulness",
  },
  { title: "Probability score", content: "98%" },
  { title: "Est. date of failure", content: "30-60 days" },
];

export const AllComponents = () => {
  const [checked, setChecked] = useState(false);

  return (
    <HvCard
      style={{ width: 360 }}
      bgcolor="atmo1"
      icon={<Level3Bad color="negative" />}
      statusColor="negative"
      selected={checked}
      selectable
    >
      <HvCardHeader
        title="Leaves appear wilted and scorched"
        subheader={
          <div>
            <span className={classes.span}>Just now</span>
            <span>L20</span>
          </div>
        }
      />
      <HvCardContent>
        <Grid container>
          <Grid className={classes.grid} item xs={5}>
            <HvTypography variant="label">{cells[0].title}</HvTypography>
            <HvTypography>{cells[0].content}</HvTypography>
          </Grid>
          <Grid className={classes.grid} item xs={7}>
            <HvTypography variant="label">{cells[1].title}</HvTypography>
            <HvTypography>{cells[1].content}</HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid className={classes.gridBottom} item xs={5}>
            <HvTypography variant="label">{cells[2].title}</HvTypography>
            <HvTypography>{cells[2].content}</HvTypography>
          </Grid>
          <Grid className={classes.gridBottom} item xs={7}>
            <HvTypography variant="label">{cells[3].title}</HvTypography>
            <HvTypography>{cells[3].content}</HvTypography>
          </Grid>
        </Grid>
      </HvCardContent>
      <HvCardMedia
        component="img"
        alt="Leaves"
        height={160}
        image="https://i.imgur.com/qv0dKdf.png"
      />
      <HvActionBar>
        <HvCheckBox
          onChange={() => setChecked(!checked)}
          checked={checked}
          value="value"
          inputProps={{
            "aria-label": "Tick to select the wilted and scorched leaves card.",
          }}
        />
        <div style={{ flex: 1 }} />
        <HvActionsGeneric
          actions={actions}
          maxVisibleActions={1}
          onAction={(e, a) => alert(`You have pressed ${a.label}.`)}
        />
      </HvActionBar>
    </HvCard>
  );
};
