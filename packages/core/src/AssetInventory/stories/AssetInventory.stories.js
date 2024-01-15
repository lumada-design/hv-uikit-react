import React, { useState } from "react";
import { withStyles } from "@material-ui/core";

import {
  Cards,
  Connect,
  Delete,
  Fail,
  Level1,
  Level2Average,
  Level3Bad,
  Level4,
  Level5,
  List,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";
import {
  HvAssetInventory,
  HvCard,
  HvCardView,
  HvEmptyState,
  HvGrid,
  HvKpi,
  HvListView,
  HvListViewCell,
  HvListViewRow,
  HvTypography,
} from "../..";
import { doSearch, doSort, fetchData, getPages } from "./ServerSideTester";

/* eslint-disable react/prop-types */

export default {
  title: "Components/Asset Inventory",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAssetInventory } from "@hitachivantara/uikit-react-core";',
  },
  component: HvAssetInventory,
};

export const Main = () => {
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
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: `${theme.hv.spacing.xs}px`,
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
        checked={data.checked}
      />
    );
  };

  // ListView renderer

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema} id={`icon-${id}`} key={`icon${id}`}>
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

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      id={value.id}
      key={value.id + index}
    />
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
        { title: "Time horizon", style: { minWidth: "108px", textAlign: "end" } },
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

  const EmptyComponent = (
    <HvEmptyState message="No data found" icon={<Fail iconSize="S" color="acce1" />} />
  );

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
      configuration={assetConfiguration}
      onSelection={(event) => console.log(event.target.value)}
      isSelectable
      actions={myActions}
      actionsCallback={(e, id, action) =>
        console.log(`You have pressed ${id} with action ${action.label}`)
      }
      searchProps={{ ariaLabel: "Filters the data" }}
      multibuttonProps={[
        { id: "card", "aria-label": "Select card view" },
        { id: "list", "aria-label": "Select list view" },
      ]}
      sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
    >
      <HvCardView
        id="card"
        icon={<Cards />}
        renderer={cardRenderer}
        emptyComponent={EmptyComponent}
      />
      <HvListView
        id="list"
        icon={<List />}
        renderer={rowRenderer}
        emptyComponent={EmptyComponent}
      />
    </HvAssetInventory>
  );
};

export const Configurations = () => {
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

  // ----------------------- CardView Render -----------------------------
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

  const Content = ({ classes, values }) => (
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

  const ContentWithStyles = withStyles(kpiStyles)(Content);

  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);
    const StyledIcon = <Icon semantic={sema} />;

    return (
      <HvCard
        id={`Card_${data.id}`}
        icon={StyledIcon}
        headerTitle={data.headerTitle}
        innerCardContent={<ContentWithStyles values={data} icon={StyledIcon} />}
        semantic={sema}
        checkboxProps={{ value: data.id, inputProps: { "aria-label": `Select ${data.id}` } }}
        checked={data.checked}
        isSelectable={viewConfiguration.isSelectable}
        onChange={viewConfiguration.onSelection}
        actions={viewConfiguration.actions}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
        actionsCallback={viewConfiguration.actionsCallback}
      />
    );
  };

  // ----------------------- ListView Render -----------------------------

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
        checked={value.checked}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon className={classes.icon} semantic={status.sema} />
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

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      id={value.id}
      key={value.id + index}
    />
  );

  // --------------------------- Values ---------------------------------

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

  // ----------------------- Configuration ------------------------------

  const myActions = [
    { id: "post", label: "Dismiss", disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  const configuration = {
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
  };

  return (
    <HvAssetInventory
      id="hv-assetinventory"
      values={values()}
      configuration={configuration}
      onSelection={(event) => console.log(event.target.value)}
      isSelectable
      actions={myActions}
      actionsCallback={(e, id, action) =>
        console.log(`You have pressed data ${id} with action ${action.label}`)
      }
      hasPagination
      pageSizeOptions={[2, 4, 6, 8, 10]}
      pageSize={4}
      selectedView="cardView"
      searchProps={{ ariaLabel: "Filters the cards by title, probability and time horizon." }}
      multibuttonProps={[
        { id: "cardView", "aria-label": "Select card view" },
        { id: "listView", "aria-label": "Select list view" },
      ]}
      sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
      paginationProps={{
        labels: {
          pageSizeEntryName: "assets",
        },
      }}
    >
      <HvCardView
        id="cardView"
        icon={<Cards />}
        renderer={cardRenderer}
        viewConfiguration={{
          breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
        }}
      />
      <HvListView
        id="listView"
        icon={<List />}
        renderer={rowRenderer}
        viewConfiguration={{
          columnConfiguration: [
            { style: { width: 1, textAlign: "center" } },
            { title: "Event", style: { minWidth: "570px", textAlign: "start" } },
            { title: "Probability", style: { minWidth: "93px", textAlign: "end" } },
            { title: "Time horizon", style: { minWidth: "108px", textAlign: "end" } },
            {
              title: "Related Assets",
              style: { minWidth: "195px", paddingLeft: "30px", textAlign: "start" },
            },
          ],
        }}
        sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
      />
    </HvAssetInventory>
  );
};

Configurations.story = {
  parameters: {
    docs: {
      storyDescription:
        "Search uses the headerTitle, schedule and probability. Sort uses the headerTitle, probability and timeHorizon",
    },
  },
};

export const ThreeViews = () => {
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
    const { onSelection, ...others } = viewConfiguration;

    return (
      <HvCard
        icon={StyledIcon}
        headerTitle={data.headerTitle}
        innerCardContent={<StyledCardContent values={data} icon={StyledIcon} />}
        semantic={sema}
        checkboxProps={{
          value: data.id,
          inputProps: { "aria-label": `Select ${data.id}` },
        }}
        onChange={onSelection}
        checked={data.checked}
        {...others}
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
        checked={value.checked}
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

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      id={value.id}
      key={value.id + index}
    />
  );

  // Text renderer

  const TextRender = ({ id, values }) => (
    <div id={id}>
      <HvGrid container>
        {values.map((value) => (
          <HvGrid item>
            <HvTypography variant="labelText"> title</HvTypography>
            <HvTypography variant="normalText">{value.headerTitle}</HvTypography>
            <HvTypography variant="labelText"> description</HvTypography>
            <HvTypography variant="normalText">{value.event.description}</HvTypography>
            <HvTypography variant="labelText"> probability</HvTypography>
            <HvTypography variant="normalText">{value.event.probability}</HvTypography>
          </HvGrid>
        ))}
      </HvGrid>
    </div>
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
        { title: "Time horizon", style: { minWidth: "108px", textAlign: "end" } },
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
      configuration={assetConfiguration}
      onSelection={(event) => console.log(event.target.value)}
      isSelectable
      actions={myActions}
      actionsCallback={(e, id, action) =>
        console.log(`You have pressed data ${id} with action ${action.label}`)
      }
      searchProps={{ ariaLabel: "Filters the cards by title, probability and time horizon." }}
      multibuttonProps={[
        { id: "card", "aria-label": "Select card view" },
        { id: "list", "aria-label": "Select list view" },
        { id: "textRender", "aria-label": "Select text view" },
      ]}
      sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
    >
      <HvCardView id="card" icon={<Cards />} renderer={cardRenderer} />
      <HvListView id="list" icon={<List />} renderer={rowRenderer} />
      <TextRender id="textRender" icon={<Connect />} />
    </HvAssetInventory>
  );
};

ThreeViews.story = {
  parameters: {
    docs: {
      storyDescription: "Asset Inventory with third view, a custom TextRender",
    },
  },
};

export const ServerSidePagination = () => {
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

  // ----------------------- CardView Render -----------------------------
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

  const Content = ({ classes, values }) => (
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

  const ContentWithStyles = withStyles(kpiStyles)(Content);

  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);
    const StyledIcon = <Icon semantic={sema} />;

    return (
      <HvCard
        icon={StyledIcon}
        headerTitle={data.headerTitle}
        innerCardContent={<ContentWithStyles values={data} icon={StyledIcon} />}
        semantic={sema}
        checkboxProps={{ value: data.id, inputProps: { "aria-label": `Select ${data.id}` } }}
        checked={data.checked}
        isSelectable={viewConfiguration.isSelectable}
        onChange={viewConfiguration.onSelection}
        actions={viewConfiguration.actions}
        maxVisibleActions={viewConfiguration.maxVisibleActions}
        actionsCallback={viewConfiguration.actionsCallback}
      />
    );
  };

  // ----------------------- ListView Render -----------------------------

  const Row = ({ classes, status, value, id }) => {
    const { Icon } = status;

    return (
      <HvListViewRow
        id={id}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
        checked={value.checked}
      >
        <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
          <Icon className={classes.icon} semantic={status.sema} />
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

  const rowRenderer = (value, index) => (
    <StyledRow
      status={getStatus(value.status)}
      value={value}
      id={value.id}
      key={value.id + index}
    />
  );

  // ----------------------- Configuration ------------------------------

  const myActions = [
    { id: "post", label: "Dismiss", disabled: false },
    { id: "get", label: "Preview", iconCallback: () => <Preview color="atmo7" />, disabled: true },
    { id: "put", label: "Upload", iconCallback: () => <Upload color="atmo7" />, disabled: true },
    { id: "delete", label: "Delete", iconCallback: () => <Delete />, disabled: false },
  ];

  const configuration = {
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
    ],
  };

  const ServerSideAssetInventory = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [values, setValues] = useState(fetchData(4, 0));
    const [searchString, setSearchString] = useState("");

    const onSort = (sort) => {
      setValues(doSort(sort.type, pageSize, page));
    };

    const onPageChange = (newPage) => {
      setPage(newPage);
      setValues(fetchData(pageSize, newPage));
    };

    const onPageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
      setValues(fetchData(newPageSize, page));
    };

    const onSearch = (event, search) => {
      setPage(0);
      setValues(doSearch(search, pageSize));
      setSearchString(search);
    };

    return (
      <HvAssetInventory
        values={values}
        selectedValues={["id_1", "id_3", "id_4"]}
        configuration={configuration}
        onSelection={(event) => console.log(event.target.value)}
        isSelectable
        actions={myActions}
        actionsCallback={(e, id, action) =>
          console.log(`You have pressed data ${id} with action ${action.label}`)
        }
        // Pagination
        hasPagination
        paginationServerSide
        pageSizeOptions={[2, 4, 6, 8, 10]}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pages={getPages(pageSize)}
        page={page}
        pageSize={pageSize}
        // Search
        onSearch={onSearch}
        // Sort
        onSortChange={onSort}
        sortOptionId="id1Asc"
        searchString={searchString}
        searchProps={{ ariaLabel: "Filters data by title, probability and time horizon." }}
        multibuttonProps={[
          { id: "card", "aria-label": "Select card view" },
          { id: "list", "aria-label": "Select list view" },
        ]}
        sortProps={{ labels: { select: "Newest first", title: "Sort by" } }}
      >
        <HvCardView
          id="card"
          icon={<Cards />}
          renderer={cardRenderer}
          viewConfiguration={{
            breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
          }}
        />
        <HvListView
          id="list"
          icon={<List />}
          renderer={rowRenderer}
          viewConfiguration={{
            columnConfiguration: [
              { style: { width: 1, textAlign: "center" } },
              { title: "Event", style: { minWidth: "570px", textAlign: "start" } },
              { title: "Probability", style: { minWidth: "93px", textAlign: "end" } },
              { title: "Time horizon", style: { minWidth: "108px", textAlign: "end" } },
              {
                title: "Related Assets",
                style: { minWidth: "195px", paddingLeft: "30px", textAlign: "start" },
              },
            ],
          }}
        />
      </HvAssetInventory>
    );
  };
  return <ServerSideAssetInventory />;
};

ServerSidePagination.story = {
  parameters: {
    docs: {
      storyDescription: "Asset Inventory with a simulation of server-side pagination",
    },
  },
};

export const Accessibility = () => {
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

Accessibility.story = {
  parameters: {
    docs: {
      storyDescription:
        "Accessibility:<br/>" +
        "- Search: Create a label using aria-label using the searchProps. <br/>" +
        "- Sort: Use the labels.sortBy to create a aria-label. <br/>" +
        "- MultiButton: Individual aria-label to create a label for each button using the multibuttonProps ",
    },
  },
};
