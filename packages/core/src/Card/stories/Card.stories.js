import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import {
  Add,
  Delete,
  Level1,
  Level2Average,
  Level3Bad,
  Tool,
  Favorite,
  FavoriteSelected,
  Preview,
  Upload,
} from "@hv/uikit-react-icons";
import {
  HvActionContainer,
  HvActionsGeneric,
  HvCard,
  HvCheckBox,
  HvKpi,
  HvToggleButton,
  HvTypography,
} from "../..";
import { HvCardMedia, HvCardHeader, HvCardFooter, HvCardContent } from "..";

import compressor from "./resources/compressor.png";
import leaf from "./resources/leaf.png";

export default {
  title: "Components/Card",
  parameters: {
    componentSubtitle: null,
    usage:
      "import { HvCard, HvCardHeader, HvCardFooter, HvCardMedia, HvCardContent } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.0",
  },
  component: HvCard,
  subcomponents: { HvCardHeader, HvCardFooter, HvCardMedia, HvCardContent },
  decorators: [
    (Story) => (
      <div style={{ margin: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <HvCard bgcolor="atmo1" style={{ width: 360 }}>
    <HvCardHeader title="Asset Avatar L90" subheader="Compressor" aria-label="Compressor" />
    <HvCardMedia component="img" alt="Compressor" height={140} image={compressor} />
    <HvCardContent>
      <div style={{ paddingTop: "20px" }}>
        <HvTypography variant="highlightText">ID</HvTypography>
        <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
      </div>
      <div style={{ marginTop: "20px" }}>
        <HvTypography variant="highlightText">Last connected</HvTypography>
        <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
      </div>
    </HvCardContent>
  </HvCard>
);

export const AllComponents = () => {
  const [checked, setChecked] = useState(false);

  const cells = [
    { title: "Priority", content: "High" },
    { title: "Main Asset", content: "California wonder grain of wonderfulness" },
    { title: "Probability score", content: "98%" },
    { title: "Est. date of failure", content: "30-60 days" },
  ];

  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.spacing(0, 0, "sm", 0),
    },
    bottomItem: {
      padding: 0,
    },
    subtitleLeft: {
      borderRight: `1px solid ${theme.palette.acce1}`,
      paddingRight: theme.spacing("xs"),
      marginRight: theme.spacing("xs"),
    },
  }));

  const classes = useStyles();

  const myActions = [
    { id: "post", label: "Upload", iconCallback: () => <Upload />, disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Add", iconCallback: () => <Add color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  return (
    <HvCard
      style={{ width: 360 }}
      bgcolor="atmo1"
      icon={<Level3Bad semantic="sema4" />}
      semantic="sema4"
      selected={checked}
      selectable
      onClick={(event) => console.log(`my value is ${event.target.value}`)}
    >
      <HvCardHeader
        title="Leaves appear wilted and scorched"
        subheader={
          <div>
            <span className={classes.subtitleLeft}>Just now</span>
            <span>L20</span>
          </div>
        }
      />
      <HvCardContent>
        <Grid container>
          <Grid item xs={5} className={classes.item}>
            <HvTypography variant="highlightText">{cells[0].title}</HvTypography>
            <HvTypography noWrap>{cells[0].content}</HvTypography>
          </Grid>
          <Grid item xs={7} className={classes.item}>
            <HvTypography variant="highlightText">{cells[1].title}</HvTypography>
            <HvTypography noWrap>{cells[1].content}</HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} className={classes.bottomItem}>
            <HvTypography variant="highlightText">{cells[2].title}</HvTypography>
            <HvTypography variant="sTitle" noWrap>
              {cells[2].content}
            </HvTypography>
          </Grid>
          <Grid item xs={7} className={classes.bottomItem}>
            <HvTypography variant="highlightText">{cells[3].title}</HvTypography>
            <HvTypography variant="sTitle" noWrap>
              {cells[3].content}
            </HvTypography>
          </Grid>
        </Grid>
      </HvCardContent>
      <HvCardMedia component="img" alt="leafy leaf" height={160} image={leaf} />
      <HvActionContainer aria-label="Leaf">
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
      </HvActionContainer>
    </HvCard>
  );
};

AllComponents.story = {
  parameters: {
    docs: {
      storyDescription: "A card that has all it's component defined.",
    },
  },
};

export const NoActions = () => {
  const cells = [
    { title: "Priority", content: "High" },
    { title: "Main Asset", content: "California wonder grain of wonderfulness" },
    { title: "Probability score", content: "98%" },
    { title: "Est. date of failure", content: "30-60 days" },
    { title: "UUID", content: "2101caf3-7cd4-1000-bdp95-d8c4971767c" },
  ];

  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.spacing(0, 0, "sm", 0),
    },
    bottomItem: {
      padding: 0,
    },
  }));

  const classes = useStyles();

  const Content = () => (
    <>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <HvTypography variant="highlightText">{cells[0].title}</HvTypography>
          <HvTypography noWrap>{cells[0].content}</HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.item}>
          <HvTypography variant="highlightText">{cells[1].title}</HvTypography>
          <HvTypography noWrap>{cells[1].content}</HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <HvTypography variant="highlightText">{cells[2].title}</HvTypography>
          <HvTypography noWrap>{cells[2].content}</HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.bottomItem}>
          <HvTypography variant="highlightText">{cells[3].title}</HvTypography>
          <HvTypography noWrap>{cells[3].content}</HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.bottomItem}>
          <HvTypography variant="highlightText">{cells[4].title}</HvTypography>
          <HvTypography noWrap>{cells[4].content}</HvTypography>
        </Grid>
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
};

NoActions.story = {
  parameters: {
    docs: {
      storyDescription: "A Card without any actions.",
    },
  },
};

export const OnlyTitle = () => (
  <HvCard bgcolor="atmo1" style={{ width: "500px" }}>
    <HvCardHeader title="Advanced Server DS120" />
  </HvCard>
);

OnlyTitle.story = {
  parameters: {
    docs: {
      storyDescription: "A Card that only has a title.",
    },
  },
};

export const KPICard = () => {
  const [checked, setChecked] = useState(0);

  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.spacing("sm", 0),
    },
    bottomItem: {
      padding: 0,
    },
    card: {
      margin: theme.spacing("sm"),
      backgroundColor: theme.palette.atmo1,
    },
  }));

  const classes = useStyles();

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

  /* eslint-disable react/prop-types */
  const CardContent = ({ value, icon }) => (
    <HvCardContent>
      <Grid container>
        <HvKpi labels={getKpiLabels(value)} visualIndicator={icon} />
      </Grid>
      <Grid container>
        <Grid item className={classes.item} xs={4} sm={8} md={12} lg={12} xl={12}>
          <HvTypography variant="highlightText">{data.firstTitle}</HvTypography>
          <HvTypography>{data.firstContent}</HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
          <HvTypography variant="highlightText">{data.secondTitle}</HvTypography>
          <HvTypography>{data.secondContent}</HvTypography>
        </Grid>
      </Grid>
    </HvCardContent>
  );

  const CardFooter = ({ n }) => (
    <HvActionContainer aria-label="Leaf">
      <HvCheckBox
        onChange={() => setChecked(n)}
        checked={checked === n}
        value="value"
        inputProps={{ "aria-label": "leaf input" }}
      />
      <div style={{ flex: 1 }} />
    </HvActionContainer>
  );

  return (
    <Grid container>
      <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
        <HvCard className={classes.card} semantic="sema2" selectable selected={checked === 1}>
          <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
          <CardContent value="85" icon={<Level1 semantic="sema2" />} />
          <CardFooter n={1} />
        </HvCard>
      </Grid>
      <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
        <HvCard className={classes.card} semantic="sema3" selectable selected={checked === 2}>
          <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
          <CardContent value="45" icon={<Level2Average semantic="sema3" />} />
          <CardFooter n={2} />
        </HvCard>
      </Grid>
      <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
        <HvCard className={classes.card} semantic="sema4" selectable selected={checked === 3}>
          <HvCardHeader title="Replace contaminated oil" icon={<Tool />} />
          <CardContent value="19" icon={<Level3Bad semantic="sema4" />} />
          <CardFooter n={3} />
        </HvCard>
      </Grid>
    </Grid>
  );
};

KPICard.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample combined with a kpi as content.",
    },
  },
};

export const WithComposition = () => (
  <HvCard bgcolor="atmo1" style={{ width: "500px" }}>
    <HvCardMedia
      style={{ paddingBottom: 0 }}
      component="img"
      image={leaf}
      height={160}
      alt="leafy leaf"
    />
    <HvActionContainer aria-label="Composed card">
      <HvCheckBox
        value="value"
        inputProps={{ "aria-label": "leaf input" }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
      />
      <div style={{ flex: 1 }} />
      <HvActionsGeneric
        actions={[
          { id: "post", label: "Upload", iconCallback: () => <Upload />, disabled: false },
          { id: "get", label: "Preview", iconCallback: () => <Preview />, disabled: true },
          { id: "put", label: "Add", iconCallback: () => <Add />, disabled: true },
          { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
        ]}
        maxVisibleActions={1}
        actionsCallback={(e, id, a) => alert(`You have pressed ${a.label}`)}
      />
    </HvActionContainer>
  </HvCard>
);

WithComposition.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample that shows how to compose card with subcomponents.",
    },
  },
};

export const Selectable = () => {
  const [checked, setChecked] = useState(false);

  const useStyles = makeStyles(() => ({
    button: {
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
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  }));

  const classes = useStyles();

  const SingleContent = () => (
    <HvCardContent>
      <div style={{ marginTop: "20px" }}>
        <HvTypography variant="highlightText">ID</HvTypography>
        <HvTypography className={classes.text}>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
      </div>
      <div style={{ marginTop: "20px" }}>
        <HvTypography variant="highlightText">Last connected</HvTypography>
        <HvTypography className={classes.text}>Aug 30, 2017 12:27:53 PM</HvTypography>
      </div>
    </HvCardContent>
  );

  const CardClickableContent = ({ children }) => {
    return (
      <button
        type="button"
        category="semantic"
        className={classes.button}
        onClick={() => setChecked(!checked)}
        aria-label="Asset Avatar L90 press enter or space to select this card"
        tabIndex={-1}
      >
        {children}
      </button>
    );
  };

  return (
    <HvCard bgcolor="atmo1" style={{ width: 360 }} selectable selected={checked}>
      <CardClickableContent>
        <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
        <HvCardMedia component="img" image={compressor} height={140} alt="Compressor" />
        <SingleContent />
      </CardClickableContent>
      <HvActionContainer>
        <HvCheckBox
          onChange={() => setChecked(!checked)}
          checked={checked}
          value="value"
          inputProps={{ "aria-label": "leaf input" }}
        />
        <HvToggleButton
          aria-label="Star"
          selectedIcon={<FavoriteSelected />}
          notSelectedIcon={<Favorite />}
        />
        <div style={{ flex: 1 }} />
        <HvActionsGeneric
          actions={[
            { id: "view", label: "View" },
            { id: "dismiss", label: "Dismiss" },
          ]}
        />
      </HvActionContainer>
    </HvCard>
  );
};

Selectable.story = {
  parameters: {
    docs: {
      storyDescription:
        "A card sample showcasing the ability to select in the content and click action.",
    },
  },
};

export const SelectableNoFooter = () => {
  const [selected, setSelected] = useState(false);

  const SingleContent = () => (
    <HvCardContent>
      <div>
        <HvTypography variant="highlightText">ID</HvTypography>
        <HvTypography noWrap>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
      </div>
      <div style={{ marginTop: "20px" }}>
        <HvTypography variant="highlightText">Last connected</HvTypography>
        <HvTypography noWrap>Aug 30, 2017 12:27:53 PM</HvTypography>
      </div>
    </HvCardContent>
  );

  return (
    <HvCard
      bgcolor="atmo1"
      style={{ width: 360, cursor: "pointer" }}
      selectable
      selected={selected}
      onClick={() => setSelected(!selected)}
      semantic="sema4"
    >
      <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
      <SingleContent />
    </HvCard>
  );
};

SelectableNoFooter.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample showcasing the ability to select in the content.",
    },
  },
};
