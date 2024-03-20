import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvActionBar,
  HvActionsGeneric,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvCardProps,
  HvCheckBox,
  HvKpi,
  HvToggleButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Add,
  Delete,
  Favorite,
  FavoriteSelected,
  Level1,
  Level2Average,
  Level3Bad,
  Preview,
  Tool,
  Upload,
} from "@hitachivantara/uikit-react-icons";

// #region Styled Components

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

const StyledCard = styled(HvCard)({
  margin: theme.space.sm,
  backgroundColor: theme.colors.atmo1,
});

const StyledButton = styled("button")({
  cursor: "pointer",
  textAlign: "inherit",
  backgroundColor: "transparent",
  margin: 0,
  border: 0,
  padding: 0,
  width: "100%",
  "&:focus": {
    outline: "none",
  },
});

// #endregion

const meta: Meta<typeof HvCard> = {
  title: "Components/Card",
  component: HvCard,
  // @ts-expect-error https://github.com/storybookjs/storybook/issues/20782
  subcomponents: { HvCardHeader, HvCardContent, HvCardMedia },
  decorators: [(Story) => <div style={{ margin: 20 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvCardProps> = {
  args: {
    bgcolor: "atmo1",
    statusColor: "negative",
    selectable: false,
    selected: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
    icon: { control: { disable: true } },
  },
  render: ({ bgcolor, statusColor, selectable, selected }) => {
    return (
      <HvCard
        bgcolor={bgcolor}
        statusColor={statusColor}
        style={{ width: 360 }}
        selectable={selectable}
        selected={selected}
      >
        <HvCardHeader
          title="Asset Avatar L90"
          subheader="Compressor"
          icon={<Level2Average color={statusColor} />}
        />
        <HvCardMedia
          component="img"
          alt="Compressor"
          height={140}
          image="https://i.imgur.com/bxPPTD3.png"
        />
        <HvCardContent>
          <div style={{ paddingTop: "20px" }}>
            <HvTypography variant="label">ID</HvTypography>
            <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
      </HvCard>
    );
  },
};

export const AllComponents: StoryObj<HvCardProps> = {
  render: () => {
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
              "aria-label":
                "Tick to select the wilted and scorched leaves card.",
            }}
          />
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            actions={myActions}
            maxVisibleActions={1}
            onAction={(e, a) => alert(`You have pressed ${a.label}.`)}
          />
        </HvActionBar>
      </HvCard>
    );
  },
};

export const NoActions: StoryObj<HvCardProps> = {
  render: () => {
    const cells = [
      { title: "Priority", content: "High" },
      {
        title: "Main Asset",
        content: "California wonder grain of wonderfulness",
      },
      { title: "Probability score", content: "98%" },
      { title: "Est. date of failure", content: "30-60 days" },
      { title: "UUID", content: "2101caf3-7cd4-1000-bdp95-d8c4971767c" },
    ];

    const Content = () => (
      <>
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
          <StyledItem item xs={5}>
            <HvTypography variant="label">{cells[2].title}</HvTypography>
            <HvTypography>{cells[2].content}</HvTypography>
          </StyledItem>
          <StyledBottomItem item xs={7}>
            <HvTypography variant="label">{cells[3].title}</HvTypography>
            <HvTypography>{cells[3].content}</HvTypography>
          </StyledBottomItem>
        </Grid>
        <Grid container>
          <StyledBottomItem item xs={12}>
            <HvTypography variant="label">{cells[4].title}</HvTypography>
            <HvTypography>{cells[4].content}</HvTypography>
          </StyledBottomItem>
        </Grid>
      </>
    );

    return (
      <HvCard bgcolor="atmo1" style={{ width: "500px" }}>
        <HvCardHeader title="Advanced Server DS120" subheader="QTFCR27520007" />
        <HvCardContent>
          <Content />
        </HvCardContent>
      </HvCard>
    );
  },
};

export const OnlyTitle: StoryObj<HvCardProps> = {
  render: () => {
    return (
      <HvCard bgcolor="atmo1" style={{ width: "500px" }}>
        <HvCardHeader title="Advanced Server DS120" />
      </HvCard>
    );
  },
};

export const KPICard: StoryObj<HvCardProps> = {
  render: () => {
    const [checked, setChecked] = useState(0);
    const data = {
      firstTitle: "Related assets",
      firstContent: "Primary asset to be worked on, other asset, other asset",
      secondTitle: "Description",
      secondContent:
        "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary.",
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
          <StyledItem item xs={4} sm={8} md={12} lg={12} xl={12}>
            <HvTypography variant="label">{data.firstTitle}</HvTypography>
            <HvTypography>{data.firstContent}</HvTypography>
          </StyledItem>
        </Grid>
        <Grid container>
          <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
            <HvTypography variant="label">{data.secondTitle}</HvTypography>
            <HvTypography>{data.secondContent}</HvTypography>
          </Grid>
        </Grid>
      </HvCardContent>
    );

    const CardFooter = ({ n, value }: { n: number; value: string }) => (
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
            <StyledCard
              statusColor="neutral"
              selectable
              selected={checked === 1}
              role="gridcell"
              aria-selected={checked === 1}
            >
              <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
              <CardContent value="85" icon={<Level1 color="neutral" />} />
              <CardFooter n={1} value="85" />
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard
              statusColor="warning"
              selectable
              selected={checked === 2}
              role="gridcell"
              aria-selected={checked === 2}
            >
              <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
              <CardContent
                value="45"
                icon={<Level2Average color="warning" />}
              />
              <CardFooter n={2} value="84" />
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard
              statusColor="negative"
              selectable
              selected={checked === 3}
              role="gridcell"
              aria-selected={checked === 3}
            >
              <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
              <CardContent value="19" icon={<Level3Bad color="negative" />} />
              <CardFooter n={3} value="19" />
            </StyledCard>
          </Grid>
        </Grid>
      </Grid>
    );
  },
};

export const Selectable: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A card sample showcasing the ability to select in the content and click action.",
      },
    },
  },
  render: () => {
    const [checked, setChecked] = useState(false);

    const SingleContent = () => (
      <HvCardContent>
        <div style={{ marginTop: "20px" }}>
          <HvTypography variant="label">ID</HvTypography>
          <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
        </div>
        <div style={{ marginTop: "20px" }}>
          <HvTypography variant="label">Last connected</HvTypography>
          <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
        </div>
      </HvCardContent>
    );

    const CardClickableContent = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      return (
        <StyledButton
          type="button"
          onClick={() => setChecked(!checked)}
          aria-label="Press enter or space to select the asset avatar L90 card."
          tabIndex={-1}
        >
          {children}
        </StyledButton>
      );
    };

    return (
      <HvCard
        bgcolor="atmo1"
        style={{ width: 360 }}
        selectable
        selected={checked}
      >
        <CardClickableContent>
          <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
          <HvCardMedia
            component="img"
            image="https://i.imgur.com/bxPPTD3.png"
            height={140}
            alt="Compressor"
          />
          <SingleContent />
        </CardClickableContent>
        <HvActionBar>
          <HvCheckBox
            onChange={() => setChecked(!checked)}
            checked={checked}
            value="value"
            inputProps={{
              "aria-label": "Tick to select the asset avatar L90 card.",
            }}
          />
          <div style={{ width: 32, height: 32 }}>
            <HvToggleButton
              aria-label="Star"
              selectedIcon={<FavoriteSelected />}
              notSelectedIcon={<Favorite />}
            />
          </div>
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            actions={[
              { id: "view", label: "View" },
              { id: "dismiss", label: "Dismiss" },
            ]}
          />
        </HvActionBar>
      </HvCard>
    );
  },
};

export const SelectableNoFooter: StoryObj<HvCardProps> = {
  parameters: {
    docs: {
      description: {
        story: "A card sample showcasing the ability to select in the content.",
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState(false);

    const SingleContent = () => (
      <HvCardContent>
        <div>
          <HvTypography variant="label">ID</HvTypography>
          <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
        </div>
        <div style={{ marginTop: "20px" }}>
          <HvTypography variant="label">Last connected</HvTypography>
          <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
        </div>
      </HvCardContent>
    );

    return (
      <HvCard
        bgcolor="atmo1"
        style={{ width: 360, cursor: "pointer" }}
        selectable
        selected={selected}
        tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (event.code === "Enter" || event.code === "Space") {
            setSelected(!selected);
          }
        }}
        aria-pressed={selected}
        onClick={() => setSelected(!selected)}
        statusColor="negative"
      >
        <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
        <SingleContent />
      </HvCard>
    );
  },
};
