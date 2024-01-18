import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Add,
  Delete,
  Level3Bad,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";
import { Grid } from "@mui/material";
import {
  HvTypography,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvActionBar,
  HvCheckBox,
  HvActionsGeneric,
  theme,
} from "@hitachivantara/uikit-react-core";

const StyledSubtitleLeft = styled("span")({
  borderRight: `1px solid ${theme.colors.secondary}`,
  paddingRight: theme.space.xs,
  marginRight: theme.space.xs,
});

const StyledBottomItem = styled(Grid)({
  padding: 0,
});

const StyledItem = styled(Grid)({
  paddingTop: theme.space.sm,
  paddingRight: 0,
  paddingBottom: theme.space.sm,
  paddingLeft: 0,
});

export const AllComponents = () => {
  const [checked, setChecked] = useState(false);
  const [myActions, setMyActions] = useState<any[]>([]);

  // Note: Fixes an issue with Storybook where the screen will freeze if the state is already
  // initialized. Thus, we initialized it here in useEffect when the component mounts.
  useEffect(() => {
    setMyActions([
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
    ]);
  }, []);

  const cells = [
    { title: "Priority", content: "High" },
    {
      title: "Main Asset",
      content: "California wonder grain of wonderfulness",
    },
    { title: "Probability score", content: "98%" },
    { title: "Est. date of failure", content: "30-60 days" },
  ];

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
            <StyledSubtitleLeft>Just now</StyledSubtitleLeft>
            <span>L20</span>
          </div>
        }
      />
      <HvCardContent>
        <Grid container>
          <StyledItem item xs={5}>
            <HvTypography variant="label">{cells[0].title}</HvTypography>
            <HvTypography>{cells[0].content}</HvTypography>
          </StyledItem>
          <StyledItem item xs={7}>
            <HvTypography variant="label">{cells[1].title}</HvTypography>
            <HvTypography>{cells[1].content}</HvTypography>
          </StyledItem>
        </Grid>
        <Grid container>
          <StyledBottomItem item xs={5}>
            <HvTypography variant="label">{cells[2].title}</HvTypography>
            <HvTypography>{cells[2].content}</HvTypography>
          </StyledBottomItem>
          <StyledBottomItem item xs={7}>
            <HvTypography variant="label">{cells[3].title}</HvTypography>
            <HvTypography>{cells[3].content}</HvTypography>
          </StyledBottomItem>
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
          actions={myActions}
          maxVisibleActions={1}
          actionsCallback={(e, id, a) => alert(`You have pressed ${a.label}.`)}
        />
      </HvActionBar>
    </HvCard>
  );
};
