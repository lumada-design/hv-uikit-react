import React from "react";

import Grid from "@material-ui/core/Grid";
import {
  Level2Average,
  Add,
  Delete,
  Level3Bad,
  Tool,
  Level1,
  Preview,
  Upload,
  MoreOptionsVertical,
} from "@hitachivantara/uikit-react-icons";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvButton, HvCard, HvKpi, HvTypography, HvContainer } from "../..";
import { HvCardMedia, HvCardFooter, HvCardHeader, HvCardContent } from "..";
import compressor from "./resources/compressor.png";
import leaf from "./resources/leaf.png";

export default {
  title: "Components/Card",
  parameters: {
    componentSubtitle: null,
    usage:
      'import { HvCard, HvCardHeader, HvCardFooter, HvCardMedia, HvCardContent } from "@hitachivantara/uikit-react-core";',
  },
  component: HvCard,
  subcomponents: { HvCardHeader, HvCardFooter, HvCardMedia, HvCardContent },
};

export const Main = () => {
  const textStyles = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const SingleContent = () => (
    <>
      <div style={{ marginTop: "15px" }}>
        <HvTypography variant="labelText">ID</HvTypography>
        <HvTypography variant="normalText" style={textStyles}>
          2101cad3-7cd4-1000-bdp95-d8c497176e7c
        </HvTypography>
      </div>
      <div style={{ marginTop: "15px" }}>
        <HvTypography variant="labelText">Last connected</HvTypography>
        <HvTypography variant="normalText" style={textStyles}>
          Aug 30, 2017 12:27:53 PM
        </HvTypography>
      </div>
    </>
  );

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle="Asset Avatar L90"
        subheader="Compressor"
        id="test"
        cardButtonProps={{ "aria-label": "Compressor" }}
        headerProps={{ "aria-label": "Compressor" }}
        footerProps={{ "aria-label": "Compressor" }}
        innerCardContent={<SingleContent />}
        mediaPath={compressor}
        mediaHeight={186}
        mediaTitle="Compressor"
      />
    </div>
  );
};

export const AllComponents = () => {
  const configuration = {
    title: "Leaves Appear wilted and scorched",
    subtitleLeft: "Just now",
    subtitleRight: "L20",
  };

  const strings = {
    cellATitle: "Priority",
    cellAContent: "High",
    cellCTitle: "Probability score",
    cellCContent: "98%",
    cellBTitle: "Main Asset",
    cellBContent: "California wonder grain of wonderfullness",
    cellDTitle: "Est. date of failure",
    cellDContent: "30-60 days",
  };

  const mediaStyles = {
    content: {
      padding: `0 20px 0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
    bottomItem: {
      padding: "0",
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const MultipleActionsWithMedia = () => {
    const {
      cellATitle,
      cellAContent,
      cellBTitle,
      cellBContent,
      cellCTitle,
      cellCContent,
      cellDTitle,
      cellDContent,
    } = strings;

    return (
      <>
        <Grid container>
          <Grid item xs={5} style={mediaStyles.item}>
            <HvTypography variant="labelText">{cellATitle}</HvTypography>
            <HvTypography variant="normalText" style={mediaStyles.text}>
              {cellAContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={mediaStyles.item}>
            <HvTypography variant="labelText">{cellBTitle}</HvTypography>
            <HvTypography variant="normalText" style={mediaStyles.text}>
              {cellBContent}
            </HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} style={mediaStyles.bottomItem}>
            <HvTypography variant="labelText">{cellCTitle}</HvTypography>
            <HvTypography variant="sTitle" style={mediaStyles.text}>
              {cellCContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={mediaStyles.bottomItem}>
            <HvTypography variant="labelText">{cellDTitle}</HvTypography>
            <HvTypography variant="sTitle" style={mediaStyles.text}>
              {cellDContent}
            </HvTypography>
          </Grid>
        </Grid>
      </>
    );
  };
  // eslint-disable-next-line react/prop-types
  const SubHeader = ({ classes }) => (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <span className={classes.subtitleLeft}>{configuration.subtitleLeft}</span>
      <span>{configuration.subtitleRight}</span>
    </div>
  );

  const SubHeaderStyle = (theme) => ({
    subtitleLeft: {
      borderRight: `1px solid ${theme.hv.palette.accent.acce1}`,
      paddingRight: "10px",
      marginRight: "10px",
    },
  });

  const StyledSubheader = withStyles(SubHeaderStyle)(SubHeader);

  const myActions = [
    {
      id: "post",
      label: "Upload",
      iconCallback: () => <Upload />,
      disabled: false,
    },
    {
      id: "get",
      label: "Preview",
      iconCallback: () => <Preview color="atmo7" />,
      disabled: true,
    },
    {
      id: "put",
      label: "Add",
      iconCallback: () => <Add color="atmo7" />,
      disabled: true,
    },
    {
      id: "delete",
      label: "Delete",
      iconCallback: () => <Delete />,
      disabled: false,
    },
  ];

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        icon={<Level3Bad semantic="sema4" />}
        headerTitle={configuration.title}
        subheader={<StyledSubheader />}
        innerCardContent={<MultipleActionsWithMedia />}
        actions={myActions}
        actionsCallback={(e, id, a) => alert(`You have pressed ${a.label}`)}
        actionsAlignment="left"
        semantic="sema4"
        isSelectable
        cardButtonProps={{
          "aria-label": "leaf",
        }}
        headerProps={{
          "aria-label": "leaf",
        }}
        footerProps={{
          "aria-label": "leaf",
          actionsProps: {
            dropDownMenuProps: {
              disablePortal: true,
              popperProps: {
                modifiers: {
                  preventOverflow: {
                    enabled: false,
                  },
                },
              },
            },
          },
        }}
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "leaf input",
          },
        }}
        mediaPath={leaf}
        mediaHeight={160}
        mediaTitle="leafy leaf"
        mediaProps={{
          "aria-label": "leafy leaf",
        }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
      />
    </div>
  );
};

AllComponents.story = {
  parameters: {
    docs: {
      storyDescription:
        "A card that has all it's component defined and extending the actions dropdown menu default values.",
    },
  },
};

export const MultipleActions = () => {
  const configurationNoMedia = {
    title: "Advanced Server DS120",
    subtitle: "QTFCR27520007",
  };

  const strings = {
    cellATitle: "Priority",
    cellAContent: "High",
    cellCTitle: "Probability score",
    cellCContent: "98%",
    cellBTitle: "Main Asset",
    cellBContent: "California wonder grain of wonderfullness",
    cellDTitle: "Est. date of failure",
    cellDContent: "30-60 days",
    cellETitle: "UUID",
    cellEContent: "2101caf3-7cd4-1000-bdp95-d8c4971767c",
  };

  const MultipleActionsStyles = {
    content: {
      padding: `0 20px 0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
    bottomItem: {
      padding: "0",
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const Content = () => {
    const {
      cellATitle,
      cellAContent,
      cellBTitle,
      cellBContent,
      cellCTitle,
      cellCContent,
      cellDTitle,
      cellDContent,
      cellETitle,
      cellEContent,
    } = strings;

    return (
      <>
        <Grid container>
          <Grid item xs={5} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellATitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellAContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellBTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellBContent}
            </HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellCTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellCContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={MultipleActionsStyles.bottomItem}>
            <HvTypography variant="labelText">{cellDTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellDContent}
            </HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={MultipleActionsStyles.bottomItem}>
            <HvTypography variant="labelText">{cellETitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellEContent}
            </HvTypography>
          </Grid>
        </Grid>
      </>
    );
  };

  const myActions = [
    { id: "view", label: "View", disabled: false },
    { id: "share", label: "Share", disabled: false },
  ];

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle={configurationNoMedia.title}
        subheader={configurationNoMedia.subtitle}
        innerCardContent={<Content />}
        actions={myActions}
        actionsAlignment="right"
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "leaf input",
          },
        }}
        maxVisibleActions={2}
        cardButtonProps={{
          "aria-label": "leaf",
        }}
        headerProps={{
          "aria-label": "leaf",
        }}
        footerProps={{
          "aria-label": "leaf",
        }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
      />
    </div>
  );
};

MultipleActions.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample that shows how to use multiple actions.",
    },
  },
};

export const NoActions = () => {
  const configurationNoMedia = {
    title: "Advanced Server DS120",
    subtitle: "QTFCR27520007",
  };

  const strings = {
    cellATitle: "Priority",
    cellAContent: "High",
    cellCTitle: "Probability score",
    cellCContent: "98%",
    cellBTitle: "Main Asset",
    cellBContent: "California wonder grain of wonderfullness",
    cellDTitle: "Est. date of failure",
    cellDContent: "30-60 days",
    cellETitle: "UUID",
    cellEContent: "2101caf3-7cd4-1000-bdp95-d8c4971767c",
  };

  const MultipleActionsStyles = {
    content: {
      padding: `0 20px 0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
    bottomItem: {
      padding: "0",
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const Content = () => {
    const {
      cellATitle,
      cellAContent,
      cellBTitle,
      cellBContent,
      cellCTitle,
      cellCContent,
      cellDTitle,
      cellDContent,
      cellETitle,
      cellEContent,
    } = strings;

    return (
      <>
        <Grid container>
          <Grid item xs={5} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellATitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellAContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellBTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellBContent}
            </HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5} style={MultipleActionsStyles.item}>
            <HvTypography variant="labelText">{cellCTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellCContent}
            </HvTypography>
          </Grid>
          <Grid item xs={7} style={MultipleActionsStyles.bottomItem}>
            <HvTypography variant="labelText">{cellDTitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellDContent}
            </HvTypography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={MultipleActionsStyles.bottomItem}>
            <HvTypography variant="labelText">{cellETitle}</HvTypography>
            <HvTypography variant="normalText" style={MultipleActionsStyles.text}>
              {cellEContent}
            </HvTypography>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div style={{ width: "500px" }}>
      <HvCard
        headerTitle={configurationNoMedia.title}
        subheader={configurationNoMedia.subtitle}
        innerCardContent={<Content />}
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "leaf input",
          },
        }}
        cardButtonProps={{
          "aria-label": "leaf",
        }}
        headerProps={{
          "aria-label": "leaf",
        }}
        footerProps={{
          "aria-label": "leaf",
        }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
      />
    </div>
  );
};

NoActions.story = {
  parameters: {
    docs: {
      storyDescription: "A Card without any actions.",
    },
  },
};

export const OnlyTitle = () => {
  const configurationNoMedia = {
    title: "Advanced Server DS120",
    subtitle: "QTFCR27520007",
  };

  return (
    <div style={{ width: "500px" }}>
      <HvCard
        headerTitle={configurationNoMedia.title}
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "leaf input",
          },
        }}
        cardButtonProps={{
          "aria-label": "leaf",
        }}
        headerProps={{
          "aria-label": "leaf",
        }}
        footerProps={{
          "aria-label": "leaf",
        }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
      />
    </div>
  );
};

OnlyTitle.story = {
  parameters: {
    docs: {
      storyDescription: "A Card that only has a title.",
    },
  },
};

export const KPICard = () => {
  const kpiStyles = {
    content: {
      padding: `0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
  };

  const data = {
    firstTitle: "Related assets",
    firstContent: "Primary asset to be worked on, other asset, other asset",
    secondTitle: "Description",
    secondContent:
      "Shaft may be bent, check for bends. Straighten if possible and replace shaft if necessary.",
  };

  const ThroughputKpiTextConfiguration = (score) => ({
    title: "Confidence score",
    indicator: `${score}%`,
  });

  /* eslint react/prop-types: 0 */
  const Content = ({ value, icon }) => (
    <>
      <Grid container>
        <HvKpi labels={ThroughputKpiTextConfiguration(value)} visualIndicator={icon} />
      </Grid>
      <Grid container>
        <Grid item style={kpiStyles.item} xs={4} sm={8} md={12} lg={12} xl={12}>
          <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
          <HvTypography variant="normalText">{data.firstContent}</HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
          <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
          <HvTypography variant="normalText">{data.secondContent}</HvTypography>
        </Grid>
      </Grid>
    </>
  );

  const ContentWithStyles = withStyles(kpiStyles)(Content);

  return (
    <HvContainer>
      <Grid container spacing={4}>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <HvCard
            icon={<Tool />}
            headerTitle="Replace contaminated oil"
            innerCardContent={<ContentWithStyles value="85" icon={<Level1 semantic="sema2" />} />}
            semantic="sema2"
            isSelectable
            checkboxProps={{
              value: "value",
              inputProps: { "aria-label": "leaf input" },
            }}
            cardButtonProps={{ "aria-label": "leaf" }}
            headerProps={{ "aria-label": "leaf" }}
            footerProps={{ "aria-label": "leaf" }}
            onChange={(event) => console.log(`my value is ${event.target.value}`)}
          />
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <HvCard
            icon={<Tool />}
            headerTitle="Replace contaminated oil"
            innerCardContent={
              <ContentWithStyles value="45" icon={<Level2Average semantic="sema3" />} />
            }
            semantic="sema3"
            isSelectable
            checkboxProps={{
              value: "value",
              inputProps: { "aria-label": "leaf input" },
            }}
            cardButtonProps={{ "aria-label": "leaf" }}
            headerProps={{ "aria-label": "leaf" }}
            footerProps={{ "aria-label": "leaf" }}
            onChange={(event) => console.log(`my value is ${event.target.value}`)}
          />
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={4} xl={4}>
          <HvCard
            icon={<Tool />}
            headerTitle="Replace contaminated oil"
            innerCardContent={
              <ContentWithStyles value="19" icon={<Level3Bad semantic="sema4" />} />
            }
            semantic="sema4"
            isSelectable
            checkboxProps={{
              value: "value",
              inputProps: { "aria-label": "leaf input" },
            }}
            cardButtonProps={{ "aria-label": "leaf" }}
            headerProps={{ "aria-label": "leaf" }}
            footerProps={{ "aria-label": "leaf" }}
            onChange={(event) => console.log(`my value is ${event.target.value}`)}
          />
        </Grid>
      </Grid>
    </HvContainer>
  );
};

KPICard.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample combined with a kpi as content.",
    },
  },
};

export const WithComposition = () => {
  const styles = (theme) => ({
    root: {
      width: "100%",
      paddingBottom: "0px",
      borderLeft: `1px solid ${theme.palette.grey.plain}`,
      borderRight: `1px solid ${theme.palette.grey.plain}`,
    },
    media: {
      height: "100%",
      width: "100%",
    },
  });

  const CustomMedia = withStyles(styles)(HvCardMedia);

  const myActions = [
    {
      id: "post",
      label: "Upload",
      iconCallback: () => <Upload />,
      disabled: false,
    },
    {
      id: "get",
      label: "Preview",
      iconCallback: () => <Preview />,
      disabled: true,
    },
    {
      id: "put",
      label: "Add",
      iconCallback: () => <Add />,
      disabled: true,
    },
    {
      id: "delete",
      label: "Delete",
      iconCallback: () => <Delete />,
      disabled: false,
    },
  ];

  return (
    <div style={{ width: "500px" }}>
      <HvCard>
        <CustomMedia mediaPath={leaf} mediaHeight={160} aria-label="leafy leaf" />
        <HvCardFooter
          aria-label="Composed card"
          checkboxProps={{
            value: "value",
            inputProps: {
              "aria-label": "composed input",
            },
          }}
          actions={myActions}
          isSelectable
          onChange={(event) => console.log(`my value is ${event.target.value}`)}
        />
      </HvCard>
    </div>
  );
};

WithComposition.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample that shows how to compose card with subcomponents.",
    },
  },
};

export const WithFooterComposition = () => {
  const MultipleActionsWithMediaButtons = () => (
    <>
      <HvButton category="ghost">
        <Upload />
        Update
      </HvButton>
      <HvButton category="icon" aria-label="more options">
        <MoreOptionsVertical />
      </HvButton>
    </>
  );

  const headerStyles = (theme) => ({
    root: {
      borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`,
    },
  });

  const footerStyles = {
    root: {
      borderTop: "none",
    },
  };

  const HeaderWithStyles = withStyles(headerStyles)(HvCardHeader);

  return (
    <div style={{ width: "500px" }}>
      <HvCard>
        <HvCardFooter
          style={footerStyles.root}
          actions={<MultipleActionsWithMediaButtons />}
          isSelectable
          checkboxProps={{
            value: "value",
            inputProps: {
              "aria-label": "composed input",
            },
          }}
          onChange={(event) => console.log(`my value is ${event.target.value}`)}
        />
        <HeaderWithStyles headerTitle="Asset Avatar L90" subheader="Compressor" />
      </HvCard>
    </div>
  );
};

WithFooterComposition.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample that shows how to compose card with subcomponents.",
    },
  },
};

export const AutomaticActions = () => {
  const configurationNoMedia = {
    title: "Advanced Server DS120",
    subtitle: "QTFCR27520007",
  };

  const myActions = [
    {
      id: "post",
      label: "Add",
      iconCallback: () => <Add />,
      disabled: false,
    },
    {
      id: "get",
      label: "Preview",
      iconCallback: () => <Preview color="atmo7" />,
      disabled: true,
    },
    {
      id: "put",
      label: "Upload",
      iconCallback: () => <Upload color="atmo7" />,
      disabled: true,
    },
    {
      id: "delete",
      label: "Delete",
      iconCallback: () => <Delete />,
      disabled: false,
    },
  ];

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle={configurationNoMedia.title}
        subheader={configurationNoMedia.subtitle}
        isSelectable
        actions={myActions}
        actionsCallback={(e, id, a) => alert(`You have pressed ${a.label}`)}
        actionsAlignment="left"
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "composed input",
          },
        }}
        cardButtonProps={{
          "aria-label": "composed",
        }}
        headerProps={{
          "aria-label": "composed",
        }}
        footerProps={{
          "aria-label": "composed",
        }}
        onChange={(event) => console.log(`my value is ${event.target.value}`)}
        id="card"
      />
    </div>
  );
};

AutomaticActions.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample that shows how to construct the options of the footer.",
    },
  },
};

export const Selectable = () => {
  const styles = {
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const data = {
    firstTitle: "ID",
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondTitle: "Last connected",
    secondContent: "Aug 30, 2017 12:27:53 PM",
  };

  const SingleContent = () => (
    <>
      <div>
        <div>
          <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.firstContent}
          </HvTypography>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <div>
          <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.secondContent}
          </HvTypography>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle="Asset Avatar L90"
        subheader="Compressor"
        id="test"
        innerCardContent={<SingleContent />}
        onClick={() => {
          console.log("CLICK");
        }}
        isSelectable
        selectOnClickAction
        mediaPath={compressor}
        mediaHeight={186}
        mediaProps={{
          "aria-label": "Compressor",
        }}
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "composed input",
          },
        }}
        cardButtonProps={{
          "aria-label": "Asset Avatar L90 press enter or space to select this card",
        }}
        headerProps={{
          "aria-label": "leaf",
        }}
        footerProps={{
          "aria-label": "leaf",
        }}
      />
    </div>
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
  const styles = {
    content: {
      padding: `0 20px 0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const data = {
    firstTitle: "ID",
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondTitle: "Last connected",
    secondContent: "Aug 30, 2017 12:27:53 PM",
  };

  const SingleContent = () => (
    <>
      <div>
        <div>
          <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.firstContent}
          </HvTypography>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <div>
          <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.secondContent}
          </HvTypography>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle="Asset Avatar L90"
        subheader="Compressor"
        id="test"
        innerCardContent={<SingleContent />}
        onClick={() => {
          console.log("CLICK");
        }}
        noFooter
        isSelectable
        selectOnClickAction
        semantic="sema4"
        cardButtonProps={{
          "aria-label": "Compressor",
        }}
        headerProps={{
          "aria-label": "Compressor",
        }}
        footerProps={{
          "aria-label": "Compressor",
        }}
      />
    </div>
  );
};

SelectableNoFooter.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample showcasing the ability to select in the content.",
    },
  },
};

export const WithClickAction = () => {
  const styles = {
    content: {
      padding: `0 20px 0 20px`,
    },
    item: {
      padding: `0 0 20px 0`,
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  };

  const data = {
    firstTitle: "ID",
    firstContent: "2101cad3-7cd4-1000-bdp95-d8c497176e7c",
    secondTitle: "Last connected",
    secondContent: "Aug 30, 2017 12:27:53 PM",
  };

  const SingleContent = () => (
    <>
      <div>
        <div>
          <HvTypography variant="labelText">{data.firstTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.firstContent}
          </HvTypography>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <div>
          <HvTypography variant="labelText">{data.secondTitle}</HvTypography>
        </div>
        <div>
          <HvTypography variant="normalText" style={styles.text}>
            {data.secondContent}
          </HvTypography>
        </div>
      </div>
    </>
  );

  return (
    <div style={{ width: "360px" }}>
      <HvCard
        headerTitle="Asset Avatar L90"
        subheader="Compressor"
        id="test"
        innerCardContent={<SingleContent classes={styles} />}
        onClick={() => {
          alert("Action activated");
        }}
        isSelectable
        mediaPath={compressor}
        mediaHeight={186}
        mediaProps={{
          "aria-label": "Compressor",
        }}
        cardButtonProps={{
          "aria-label": "Asset Avatar L90 press enter or space to use this card main action",
        }}
        headerProps={{
          "aria-label": "Compressor",
        }}
        footerProps={{
          "aria-label": "Compressor",
        }}
        checkboxProps={{
          value: "value",
          inputProps: {
            "aria-label": "leaf input",
          },
        }}
      />
    </div>
  );
};

WithClickAction.story = {
  parameters: {
    docs: {
      storyDescription: "A card sample showcasing the ability to click the content.",
    },
  },
};
