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
  title: "Widgets/Asset Inventory/List View",
  parameters: {
    componentSubtitle: null,
    usage:
      'import { HvListView, HvListViewRow, HvListViewCell } from "@hitachivantara/uikit-react-core"',
  },
  component: HvListView,
  subcomponents: { HvListViewRow, HvListViewCell },
};

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
          <Icon semantic={sema} />
        </HvListViewCell>

        <HvListViewCell id={`description${id}`} key={`description${id}`}>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
          <HvTypography>{value.probability}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
          <HvTypography>{value.timeHorizon}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const styles = (theme) => ({
    timestamp: {
      padding: theme.hvSpacing(0, "xs", 0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: "10px",
    },
  });

  const StyledRow = withStyles(styles)(Row);

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
        style: { paddingLeft: "8px", width: "40px" },
        tooltipProps: { title: "Status tooltip" },
      },
      {
        title: "Event",
        style: { minWidth: "370px", paddingLeft: "30px" },
        tooltipProps: { title: "Event tooltip" },
      },
      {
        title: "Probability",
        style: { minWidth: "93px" },
        tooltipProps: { title: "Probability tooltip" },
      },
      {
        title: "Time horizon",
        style: { minWidth: "108px" },
        tooltipProps: { title: "Time tooltip" },
      },
      {
        title: "Related Assets",
        style: { minWidth: "195px", paddingLeft: "30px" },
        tooltipProps: { title: "Related tooltip" },
      },
    ],
    actions: [
      { id: "1", label: "Dismiss", disabled: false },
      { id: "2", label: "Accept", disabled: false },
      { id: "3", label: "Decline", disabled: false },
      { id: "4", label: "Eject", disabled: false },
    ],
    maxVisibleActions: 2,
    actionsCallback: (e, id, action) => alert(`You have pressed ${id} with action ${action.label}`),
  };

  return (
    <HvListView
      id="list"
      values={values}
      renderer={rowRenderer}
      viewConfiguration={configuration}
    />
  );
};
