import styled from "@emotion/styled";
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
import { theme } from "@hitachivantara/uikit-styles";
import { Grid } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvTypography,
  HvCard,
  HvCardProps,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvActionBar,
  HvCheckBox,
  HvActionsGeneric,
  HvKpi,
  HvToggleButton,
} from "components";
import { isKeypress, keyboardCodes } from "utils";
import { useEffect, useState } from "react";
import compressor from "./assets/compressor.png";
import leaf from "./assets/leaf.png";

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
          aria-label="Compressor"
        />
        <HvCardMedia
          component="img"
          alt="Compressor"
          height={140}
          image={compressor}
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
        icon={<Level3Bad semantic="negative" />}
        statusColor="negative"
        selected={checked}
        selectable
        // @ts-ignore
        onClick={(event) => console.log(`my value is ${event.target.value}`)}
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
              <HvTypography variant="sTitle">{cells[2].content}</HvTypography>
            </StyledBottomItem>
            <StyledBottomItem item xs={7}>
              <HvTypography variant="label">{cells[3].title}</HvTypography>
              <HvTypography variant="sTitle">{cells[3].content}</HvTypography>
            </StyledBottomItem>
          </Grid>
        </HvCardContent>
        <HvCardMedia
          component="img"
          alt="leafy leaf"
          height={160}
          image={leaf}
        />
        <HvActionBar aria-label="Leaf">
          <HvCheckBox
            id="controller"
            onChange={() => setChecked(!checked)}
            checked={checked}
            value="value"
            inputProps={{ "aria-label": "leaf input" }}
          />
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            actions={myActions}
            maxVisibleActions={1}
            actionsCallback={(e, id, a) => alert(`You have pressed ${a.label}`)}
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

    const getKpiLabels = (score) => ({
      title: "Confidence score",
      indicator: `${score}%`,
    });

    const CardContent = ({ value, icon }) => (
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

    const CardFooter = ({ n }) => (
      <HvActionBar aria-label="Leaf">
        <HvCheckBox
          onChange={() => setChecked(n)}
          checked={checked === n}
          value="value"
          inputProps={{ "aria-label": "leaf input" }}
        />
        <div style={{ flex: 1 }} />
      </HvActionBar>
    );

    return (
      <Grid container>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <StyledCard statusColor="neutral" selectable selected={checked === 1}>
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent value="85" icon={<Level1 semantic="neutral" />} />
            <CardFooter n={1} />
          </StyledCard>
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <StyledCard statusColor="warning" selectable selected={checked === 2}>
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent
              value="45"
              icon={<Level2Average semantic="warning" />}
            />
            <CardFooter n={2} />
          </StyledCard>
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <StyledCard
            statusColor="negative"
            selectable
            selected={checked === 3}
          >
            <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
            <CardContent value="19" icon={<Level3Bad semantic="negative" />} />
            <CardFooter n={3} />
          </StyledCard>
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

    const CardClickableContent = ({ children }) => {
      return (
        <StyledButton
          type="button"
          onClick={() => setChecked(!checked)}
          aria-label="Asset Avatar L90 press enter or space to select this card"
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
            image={compressor}
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
            inputProps={{ "aria-label": "leaf input" }}
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
    /*
    `aria-selected` is explicitly unset because cards
    are normally used in groups, however this being an isolated card
    the proper role for it is a button/toggle-button with `aria-pressed`
  */
    return (
      <HvCard
        bgcolor="atmo1"
        style={{ width: 360, cursor: "pointer" }}
        selectable
        selected={selected}
        tabIndex={0}
        role="button"
        onKeyDown={(event) => {
          if (
            isKeypress(event, keyboardCodes.Enter) ||
            isKeypress(event, keyboardCodes.SpaceBar)
          ) {
            setSelected(!selected);
          }
        }}
        aria-pressed={selected}
        aria-selected={undefined}
        onClick={() => setSelected(!selected)}
        statusColor="negative"
      >
        <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
        <SingleContent />
      </HvCard>
    );
  },
};
