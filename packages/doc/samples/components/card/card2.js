import React from "react";
import HvCard from "@hv/uikit-react-core/dist/Card";
import FailureIcon from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import Upload from "@hv/uikit-react-icons/dist/Generic/Upload";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import DeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import PreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import Grid from "@material-ui/core/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import leaf from "./resources/leaf.png";
import withStyles from "@material-ui/core/styles/withStyles";

const configuration = {
  title: "Leaves Appear wilted and scorched",
  subtitleLeft: "Just now",
  subtitleRight: "L20"
};

const strings = {
  cellATitle: "Priority",
  cellAContent: "High",
  cellCTitle: "Probability score",
  cellCContent: "98%",
  cellBTitle: "Main Asset",
  cellBContent: "California wonder grain of wonderfullness",
  cellDTitle: "Est. date of failure",
  cellDContent: "30-60 days"
};

const MultipleActionsWithMediaStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  bottomItem: {
    padding: "0"
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const MultipleActionsWithMedia = ({ classes }) => {
  const {
    cellATitle,
    cellAContent,
    cellBTitle,
    cellBContent,
    cellCTitle,
    cellCContent,
    cellDTitle,
    cellDContent
  } = strings;

  return (
    <>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <HvTypography variant="labelText">{cellATitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellAContent}
          </HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.item}>
          <HvTypography variant="labelText">{cellBTitle}</HvTypography>
          <HvTypography variant="normalText" className={classes.text}>
            {cellBContent}
          </HvTypography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={classes.bottomItem}>
          <HvTypography variant="labelText">{cellCTitle}</HvTypography>
          <HvTypography variant="sTitle" className={classes.text}>
            {cellCContent}
          </HvTypography>
        </Grid>
        <Grid item xs={7} className={classes.bottomItem}>
          <HvTypography variant="labelText">{cellDTitle}</HvTypography>
          <HvTypography variant="sTitle" className={classes.text}>
            {cellDContent}
          </HvTypography>
        </Grid>
      </Grid>
    </>
  );
};

const MultipleActionsWithMediaWithStyles = withStyles(
  MultipleActionsWithMediaStyles,
  {
    withTheme: true
  }
)(MultipleActionsWithMedia);

const iconStyles = {
  width: "30px",
  height: "30px"
};

const StyledFailureIcon = () => (
  <FailureIcon
    semantic="sema4"
    boxStyles={iconStyles}
    style={{ display: "block", margin: "auto" }}
  />
);

const SubHeader = ({ classes }) => {
  return (
    <div>
      <span className={classes.subtitleLeft}>{configuration.subtitleLeft}</span>
      <span>{configuration.subtitleRight}</span>
    </div>
  );
};

const SubHeaderStyle = theme => ({
  subtitleLeft: {
    borderRight: `1px solid ${theme.hv.palette.accent.acce1}`,
    paddingRight: "10px",
    marginRight: "10px"
  }
});

const StyledSubheader = withStyles(SubHeaderStyle, {
  withTheme: true
})(SubHeader);

const myActions = [
  {
    id: "post",
    label: "Upload",
    iconCallback: () => <Upload />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <PreviewIcon />,
    disabled: true
  },
  { id: "put", label: "Add", iconCallback: () => <AddIcon />, disabled: true },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <DeleteIcon />,
    disabled: false
  }
];

export default (
  <div style={{ width: "360px" }}>
    <HvCard
      icon={<StyledFailureIcon />}
      headerTitle={configuration.title}
      subheader={<StyledSubheader />}
      innerCardContent={<MultipleActionsWithMediaWithStyles />}
      actions={myActions}
      actionsCallback={(id, a) =>{ debugger;alert("You have pressed " + a.label);}}
      actionsAlignment="left"
      semantic="sema4"
      isSelectable
      checkboxValue="value"
      mediaPath={leaf}
      mediaHeight={160}
      mediaTitle="leafy leaf"
      mediaAriaLabel="leafy leaf"
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
