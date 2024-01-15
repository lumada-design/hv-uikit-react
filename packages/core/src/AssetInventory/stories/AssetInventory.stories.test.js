/* eslint-disable no-console, react/prop-types */

import {
  Cards,
  Delete,
  Level1,
  Level2Average,
  Level3Bad,
  Level4,
  Level5,
  List,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";
import { withStyles } from "@material-ui/core";
import React from "react";

import {
  HvAssetInventory,
  HvCard,
  HvCardView,
  HvGrid,
  HvKpi,
  HvListView,
  HvListViewCell,
  HvListViewRow,
  HvTypography,
} from "../..";

export default {
  title: "Tests/Asset Inventory",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended pa11y test scenarios

export const AccessibilityList = () => {
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

  // Card Renderer

  const kpiStyles = (theme) => ({
    content: {
      padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`,
    },
    item: {
      padding: `0 0 ${theme.hv.spacing.sm}px 0`,
    },
    text: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: `${theme.hv.spacing.xs}px`,
      marginRight: "10px",
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
    },
  });

  const CardContent = ({ classes, values }) => (
    <HvGrid container className={classes.container}>
      <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvTypography className={classes.timestamp} variant="sText">
            {values.event.timestamp}
          </HvTypography>
          <HvTypography variant="sText">{values.event.schedule}</HvTypography>
        </div>
      </HvGrid>

      <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvKpi labels={{ title: "Probability", indicator: `${values.probability}%` }} />
          <HvKpi labels={{ title: "Time horizon", indicator: `${values.timeHorizon}h` }} />
        </div>
      </HvGrid>

      <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
        <HvTypography variant="labelText">Related assets</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {values.relatedAssets}
        </HvTypography>
      </HvGrid>
    </HvGrid>
  );

  const StyledCardContent = withStyles(kpiStyles)(CardContent);

  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);
    const StyledIcon = <Icon semantic={sema} />;

    return (
      <HvCard
        icon={StyledIcon}
        headerTitle={data.headerTitle}
        innerCardContent={<StyledCardContent values={data} icon={StyledIcon} />}
        semantic={sema}
        checkboxProps={{ value: data.id, inputProps: { "aria-label": `Select ${data.id}` } }}
        onChange={viewConfiguration.onSelection}
        isSelectable={viewConfiguration.isSelectable}
        actions={viewConfiguration.actions}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
        actionsCallback={viewConfiguration.actionsCallback}
      />
    );
  };

  // ListView renderer

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell id={`description-${id}`} key={`description${id}`}>
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

        <HvListViewCell id={`probability-${id}`} key={`probability${id}`}>
          <HvTypography variant="normalText">{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`timeHorizon-${id}`} key={`timeHorizon${id}`}>
          <HvTypography variant="normalText">{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell id={`relatedAssets-${id}`} key={`relatedAssets${id}`}>
          <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  const stylesRow = (theme) => ({
    timestamp: {
      padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: `${theme.hv.spacing.xs}px`,
      marginTop: "2px",
    },
    icon: {
      margin: `0 ${theme.hv.spacing.xs}px`,
    },
  });

  const StyledRow = withStyles(stylesRow)(Row);

  const rowRenderer = (value) => (
    <StyledRow status={getStatus(value.status)} value={value} id={value.id} key={value.id} />
  );

  // Asset Inventory configuration

  const assetConfiguration = {
    metadata: [
      {
        id: "id1",
        accessor: "headerTitle",
        cellType: "alpha-numeric",
        searchable: true,
        sortable: true,
        sortableLabelAsc: "Title ascending",
        sortableLabelDesc: "Title descending",
      },
      {
        id: "id2",
        accessor: "semantic",
        cellType: "alpha-numeric",
      },
      {
        id: "id3",
        accessor: "probability",
        cellType: "numeric",
        searchable: true,
        sortable: true,
        sortableLabelAsc: "Probability ascending",
        sortableLabelDesc: "Probability descending",
      },
      {
        id: "id4",
        accessor: "timeHorizon",
        cellType: "numeric",
        sortable: true,
        sortableLabelAsc: "TimeHorizon ascending",
        sortableLabelDesc: "TimeHorizon descending",
      },
      {
        id: "id5",
        accessor: "event.schedule",
        cellType: "alpha-numeric",
        searchable: true,
      },
      {
        id: "id6",
        accessor: "event.description",
        cellType: "alpha-numeric",
        searchable: true,
      },
    ],
    viewConfiguration: {
      breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
      columnConfiguration: [
        { style: { width: 1, textAlign: "center" } },
        { title: "Event", style: { minWidth: "570px", textAlign: "start" } },
        { title: "Probability", style: { minWidth: "93px", textAlign: "end" } },
        { title: "Time horizon", style: { minWidth: "108px" } },
        {
          title: "Related Assets",
          style: { minWidth: "195px", paddingLeft: "30px", textAlign: "start" },
        },
      ],
    },
  };

  // Actions

  const myActions = [
    { id: "post", label: "Dismiss", disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  // Data

  const compressorData = (id) => ({
    headerTitle: `Risk of downtime ${id + 1}`,
    status: 5,
    event: {
      description: `Risk of downtime on Truck ${id}`,
      timestamp: "2 minutes ago",
      schedule: "Fix now",
    },
    relatedAssets: "Track A, Zone 15 Brake",
  });

  const machineData = (id) => ({
    headerTitle: `Track severe ${id + 1}`,
    status: 2,
    event: {
      description: `Track ${id} severe breakdown`,
      timestamp: "2 hours ago",
      schedule: "Fix 3rd shift",
    },
    relatedAssets: "Track B, Load 2 Brake",
  });

  const values = (num = 10) =>
    Array.from(Array(num).keys(), (id) => ({
      id: `id_${id}`,
      probability: 90 + id,
      timeHorizon: 8 + id,
      checkboxProps: { value: `id_${id}` },
      ...(id % 2 === 0 ? compressorData(id) : machineData(id)),
    }));

  return (
    <HvAssetInventory
      values={values()}
      selectedView="list"
      configuration={assetConfiguration}
      onSelection={(event) => console.log(event.target.value)}
      isSelectable
      actions={myActions}
      actionsCallback={(e, id, action) =>
        console.log(`You have pressed data ${id} with action ${action.label}`)
      }
      searchProps={{ ariaLabel: "Filters data" }}
      multibuttonProps={[
        { id: "card", "aria-label": "Select card view", title: "Card view" },
        { id: "list", "aria-label": "Select list view", title: "List view" },
      ]}
      sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
    >
      <HvCardView id="card" icon={<Cards />} renderer={cardRenderer} />
      <HvListView id="list" icon={<List />} renderer={rowRenderer} />
    </HvAssetInventory>
  );
};

AccessibilityList.story = {
  parameters: {
    eyes: { include: false },
  },
};
