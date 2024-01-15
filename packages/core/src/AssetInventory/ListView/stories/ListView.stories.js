import React from "react";
import { withStyles } from "@material-ui/core";
import {
  Level1,
  Level2Average,
  Level3Bad,
  Level4,
  Level5,
} from "@hitachivantara/uikit-react-icons";
import { HvListView, HvListViewCell, HvListViewRow, HvTypography } from "../../..";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Asset Inventory/List View",
  parameters: {
    componentSubtitle: null,
    usage:
      'import { HvListView, HvListViewRow, HvListViewCell } from "@hitachivantara/uikit-react-core";',
  },
  component: HvListView,
  subcomponents: { HvListViewRow, HvListViewCell },
};

export const Main = () => {
  const values = [
    {
      id: "1",
      status: 3,
      event: {
        description: "Risk of downtime on Truck 12",
        timestamp: "Just now",
        schedule: "Fix 3rd shift",
      },
      probability: "88%",
      timeHorizon: "23h",
      relatedAssets: "Track A, Load 1 Brake",
    },
    {
      id: "2",
      status: 5,
      event: {
        description: "Track severe breakdown",
        timestamp: "2 minutes ago",
        schedule: "Fix now",
      },
      probability: "92%",
      timeHorizon: "8h",
      relatedAssets: "Track A, Zone 15 Brake",
    },
    {
      id: "3",
      status: 1,
      event: {
        description: "Risk of downtime associated",
        timestamp: "2 hours ago",
        schedule: "Fix 3rd shift",
      },
      probability: "90%",
      timeHorizon: "20h",
      relatedAssets: "Track B, Load 2 Brake",
    },
  ];

  const Row = ({ classes, status, value, id }) => {
    const { Icon, sema } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{
          value: value.id,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      >
        <HvListViewCell semantic={sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon semantic={sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell id={`description${id}`} key={`description${id}`}>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp} variant="sText">
              {value.event.timestamp}
            </HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography style={{ paddingTop: "2px" }} variant="sText">
              {value.event.schedule}
            </HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
          <HvTypography variant="normalText">{value.probability}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
          <HvTypography variant="normalText">{value.timeHorizon}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
          <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const styles = (theme) => ({
    timestamp: {
      padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: "10px",
    },
    icon: {
      paddingLeft: "3px",
    },
  });

  const StyledRow = withStyles(styles)(Row);

  const getStatus = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return { Icon: Level1, sema: "sema10" };
      case 2:
        return { Icon: Level2Average, sema: "sema11" };
      case 3:
        return { Icon: Level3Bad, sema: "sema12" };
      case 4:
        return { Icon: Level4, sema: "sema13" };
      case 5:
        return { Icon: Level5, sema: "sema14" };
      default:
        return { Icon: null, sema: "sema1" };
    }
  };

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      key={value.id + index}
      id={value.id}
    />
  );

  const configuration = {
    onSelection: (event) => alert(`this ${event.target.value}`),
    isSelectable: true,
    columnConfiguration: [
      {
        title: "Status",
        style: { paddingLeft: "8px", width: "52px" },
        align: "left",
        tooltipProps: {
          title: "The long status description",
        },
      },
      {
        title: "Event",
        style: { width: "370px" },
        align: "left",
        tooltipProps: {
          title: "The long event description",
        },
      },
      {
        title: "Probability",
        style: { width: "93px" },
        align: "right",
      },
      {
        title: "Time horizon",
        style: { width: "108px" },
        align: "right",
      },
      {
        title: "Related Assets",
        style: { width: "195px", paddingLeft: "30px" },
        align: "left",
      },
    ],
    actions: [{ id: "1", label: "Dismiss", disabled: false }],
    actionsCallback: (e, id, action) => alert(`You have pressed ${id} with action ${action.label}`),
  };

  return (
    <HvListView
      id="list"
      icon={<Level1 />}
      values={values}
      renderer={rowRenderer}
      viewConfiguration={configuration}
    />
  );
};

export const NotSelectable = () => {
  const values = [
    {
      id: "1",
      status: 3,
      event: {
        description: "Risk of downtime on Truck 12",
        timestamp: "Just now",
        schedule: "Fix 3rd shift",
      },
      probability: "88%",
      timeHorizon: "23h",
      relatedAssets: "Track A, Load 1 Brake",
    },
    {
      id: "2",
      status: 5,
      event: {
        description: "Track severe breakdown",
        timestamp: "2 minutes ago",
        schedule: "Fix now",
      },
      probability: "92%",
      timeHorizon: "8h",
      relatedAssets: "Track A, Zone 15 Brake",
    },
    {
      id: "3",
      status: 1,
      event: {
        description: "Risk of downtime associated",
        timestamp: "2 hours ago",
        schedule: "Fix 3rd shift",
      },
      probability: "90%",
      timeHorizon: "20h",
      relatedAssets: "Track B, Load 2 Brake",
    },
  ];

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{
          value: value.id,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell id={`description${id}`} key={`description${id}`}>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp} variant="sText">
              {value.event.timestamp}
            </HvTypography>
            <HvTypography style={{ paddingTop: "2px" }} variant="sText">
              {value.event.schedule}
            </HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
          <HvTypography variant="normalText">{value.probability}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
          <HvTypography variant="normalText">{value.timeHorizon}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
          <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const styles = (theme) => ({
    timestamp: {
      padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
      marginRight: "10px",
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
    },
    icon: {
      marginLeft: "3px",
    },
  });

  const StyledRow = withStyles(styles)(Row);

  const getStatus = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return { Icon: Level1, sema: "sema10" };
      case 2:
        return { Icon: Level2Average, sema: "sema11" };
      case 3:
        return { Icon: Level3Bad, sema: "sema12" };
      case 4:
        return { Icon: Level4, sema: "sema13" };
      case 5:
        return { Icon: Level5, sema: "sema14" };
      default:
        return { Icon: null, sema: "sema1" };
    }
  };

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      key={value.id + index}
      id={value.id}
    />
  );

  const configuration = {
    onSelection: (event) => alert(`this ${event.target.value}`),
    isSelectable: false,
    columnConfiguration: [
      { title: "Status", style: { paddingLeft: "8px", width: "52px" }, align: "left" },
      { title: "Event", style: { width: "370px" }, align: "left" },
      { title: "Probability", style: { width: "93px" }, align: "right" },
      { title: "Time horizon", style: { width: "108px" }, align: "right" },
      { title: "Related Assets", style: { width: "195px", paddingLeft: "30px" }, align: "left" },
    ],
    actions: [{ id: "1", label: "Dismiss", disabled: false }],
    actionsCallback: (e, id, action) => alert(`You have pressed${id}with action${action.label}`),
  };

  return (
    <HvListView
      icon={<Level1 />}
      values={values}
      renderer={rowRenderer}
      viewConfiguration={configuration}
    />
  );
};

export const NotSelectableWithMenu = () => {
  const values = [
    {
      id: "1",
      status: 3,
      event: {
        description: "Risk of downtime on Truck 12",
        timestamp: "Just now",
        schedule: "Fix 3rd shift",
      },
      probability: "88%",
      timeHorizon: "23h",
      relatedAssets: "Track A, Load 1 Brake",
    },
    {
      id: "2",
      status: 5,
      event: {
        description: "Track severe breakdown",
        timestamp: "2 minutes ago",
        schedule: "Fix now",
      },
      probability: "92%",
      timeHorizon: "8h",
      relatedAssets: "Track A, Zone 15 Brake",
    },
    {
      id: "3",
      status: 1,
      event: {
        description: "Risk of downtime associated",
        timestamp: "2 hours ago",
        schedule: "Fix 3rd shift",
      },
      probability: "90%",
      timeHorizon: "20h",
      relatedAssets: "Track B, Load 2 Brake",
    },
  ];

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{
          value: value.id,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell id={`description${id}`} key={`description${id}`}>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp} variant="sText">
              {value.event.timestamp}
            </HvTypography>
            <HvTypography style={{ paddingTop: "2px" }} variant="sText">
              {value.event.schedule}
            </HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
          <HvTypography variant="normalText">{value.probability}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
          <HvTypography variant="normalText">{value.timeHorizon}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
          <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const styles = (theme) => ({
    timestamp: {
      padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
      marginRight: "10px",
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
    },
    icon: {
      marginLeft: "3px",
    },
  });

  const StyledRow = withStyles(styles)(Row);

  const getStatus = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return { Icon: Level1, sema: "sema10" };
      case 2:
        return { Icon: Level2Average, sema: "sema11" };
      case 3:
        return { Icon: Level3Bad, sema: "sema12" };
      case 4:
        return { Icon: Level4, sema: "sema13" };
      case 5:
        return { Icon: Level5, sema: "sema14" };
      default:
        return { Icon: null, sema: "sema1" };
    }
  };

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      key={value.id + index}
      id={value.id}
    />
  );

  const configuration = {
    onSelection: (event) => alert(`this ${event.target.value}`),
    isSelectable: false,
    columnConfiguration: [
      { title: "Status", style: { paddingLeft: "8px", width: "52px" }, align: "left" },
      { title: "Event", style: { width: "370px" }, align: "left" },
      { title: "Probability", style: { width: "93px" }, align: "right" },
      { title: "Time horizon", style: { width: "108px" }, align: "right" },
      { title: "Related Assets", style: { width: "195px", paddingLeft: "30px" }, align: "left" },
    ],
    actions: [
      { id: "1", label: "Dismiss", disabled: false },
      { id: "2", label: "Accept", disabled: false },
      { id: "3", label: "Decline", disabled: false },
      { id: "4", label: "Eject", disabled: false },
    ],
    maxVisibleActions: 2,
    actionsCallback: (e, id, action) => alert(`You have pressed${id}with action${action.label}`),
  };

  return (
    <HvListView
      icon={<Level1 />}
      values={values}
      renderer={rowRenderer}
      viewConfiguration={configuration}
    />
  );
};

NotSelectableWithMenu.story = {
  parameters: {
    docs: {
      storyDescription:
        "List View that is not selectable with many actions, collapsed into a DropDownMenu",
    },
  },
};

export const NotStyled = () => {
  const values = [
    {
      id: "1",
      status: 3,
      event: {
        description: "Risk of downtime on Truck 12",
        timestamp: "Just now",
        schedule: "Fix 3rd shift",
      },
      probability: "88%",
      timeHorizon: "23h",
      relatedAssets: "Track A, Load 1 Brake",
    },
    {
      id: "2",
      status: 5,
      event: {
        description: "Track severe breakdown",
        timestamp: "2 minutes ago",
        schedule: "Fix now",
      },
      probability: "92%",
      timeHorizon: "8h",
      relatedAssets: "Track A, Zone 15 Brake",
    },
    {
      id: "3",
      status: 1,
      event: {
        description: "Risk of downtime associated",
        timestamp: "2 hours ago",
        schedule: "Fix 3rd shift",
      },
      probability: "90%",
      timeHorizon: "20h",
      relatedAssets: "Track B, Load 2 Brake",
    },
  ];

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{
          value: value.id,
          inputProps: { "aria-label": `Select Asset ${value.id + 1}` },
        }}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon />
        </HvListViewCell>

        <HvListViewCell id={`description${id}`} key={`description${id}`}>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp} variant="sText">
              {value.event.timestamp}
            </HvTypography>
            <HvTypography style={{ paddingTop: "2px" }} variant="sText">
              {value.event.schedule}
            </HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
          <HvTypography variant="normalText">{value.probability}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
          <HvTypography variant="normalText">{value.timeHorizon}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
          <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const styles = (theme) => ({
    timestamp: {
      padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
      marginRight: "10px",
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
    },
  });

  const StyledRow = withStyles(styles)(Row);

  const getStatus = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return { Icon: Level1, sema: "sema10" };
      case 2:
        return { Icon: Level2Average, sema: "sema11" };
      case 3:
        return { Icon: Level3Bad, sema: "sema12" };
      case 4:
        return { Icon: Level4, sema: "sema13" };
      case 5:
        return { Icon: Level5, sema: "sema14" };
      default:
        return { Icon: null, sema: "sema1" };
    }
  };

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      key={value.id + index}
      id={value.id}
    />
  );

  return <HvListView icon={<Level1 />} values={values} renderer={rowRenderer} />;
};

NotStyled.story = {
  parameters: {
    docs: {
      storyDescription: "Default ListView without style overrides",
    },
  },
};
