import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Cards,
  LeftAlign,
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
  HvActionBar,
  HvActionsGeneric,
  HvAssetInventory,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCardView,
  HvCheckBox,
  HvContainer,
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
  title: "Widgets/Asset Inventory",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAssetInventory } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvAssetInventory,
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
  // Styles
  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const classes = useStyles();

  // Card Renderer
  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);

    return (
      <HvCard
        bgcolor="atmo1"
        statusColor={sema}
        icon={<Icon semantic={sema} />}
        selectable={viewConfiguration.isSelectable}
        selected={data.checked}
      >
        <HvCardHeader title={data.headerTitle} />
        <HvCardContent>
          <HvGrid container className={classes.container}>
            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvTypography className={classes.timestamp}>{data.event.timestamp}</HvTypography>
                <HvTypography>{data.event.schedule}</HvTypography>
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvKpi labels={{ title: "Probability", indicator: `${data.probability}%` }} />
                <HvKpi labels={{ title: "Time horizon", indicator: `${data.timeHorizon}h` }} />
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
              <HvTypography variant="highlightText">Related assets</HvTypography>
              <HvTypography noWrap>{data.relatedAssets}</HvTypography>
            </HvGrid>
          </HvGrid>
        </HvCardContent>
        <HvActionBar aria-label="Leaf">
          {viewConfiguration.isSelectable && (
            <HvCheckBox
              checked={data.checked}
              onChange={viewConfiguration.onSelection}
              value={data.id}
              inputProps={{ "aria-label": `Select ${data.id}` }}
            />
          )}
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            id={data.id}
            actions={viewConfiguration.actions}
            maxVisibleActions={viewConfiguration.maxVisibleActions}
            actionsCallback={viewConfiguration.actionsCallback}
          />
        </HvActionBar>
      </HvCard>
    );
  };

  // ListRow renderer
  const rowRenderer = (value) => {
    const status = getStatus(value.status);
    const { Icon } = status;
    const { id } = value;

    return (
      <HvListViewRow
        id={id}
        key={`row${id}`}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp2}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

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
        { title: "Event", style: { minWidth: "360px", textAlign: "start" } },
        { title: "Probability", style: { minWidth: "80px", textAlign: "end" } },
        { title: "Time horizon", style: { minWidth: "100px", textAlign: "end" } },
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
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
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
    <HvContainer>
      <HvAssetInventory
        id="hv-assetinventory"
        values={values()}
        configuration={assetConfiguration}
        onSelection={(event) => console.log(event.target.value)}
        isSelectable
        actions={myActions}
        actionsCallback={(e, id, action) => console.log(`You have pressed action ${action.label}`)}
        searchProps={{ "aria-label": "Filters the data" }}
        multibuttonProps={[
          { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
          { id: "list-button", icon: <List />, "aria-label": "Select list view" },
        ]}
        emptyComponent={
          <HvEmptyState message="No data found" icon={<Fail iconSize="S" color="acce1" />} />
        }
      >
        <HvCardView id="card" renderer={cardRenderer} />
        <HvListView id="list" renderer={rowRenderer} />
      </HvAssetInventory>
    </HvContainer>
  );
};

export const Configurations = () => {
  // Styles
  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const classes = useStyles();

  // Card Renderer
  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);

    return (
      <HvCard
        bgcolor="atmo1"
        statusColor={sema}
        icon={<Icon semantic={sema} />}
        selectable={viewConfiguration.isSelectable}
        selected={data.checked}
      >
        <HvCardHeader title={data.headerTitle} />
        <HvCardContent>
          <HvGrid container className={classes.container}>
            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvTypography className={classes.timestamp}>{data.event.timestamp}</HvTypography>
                <HvTypography>{data.event.schedule}</HvTypography>
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvKpi labels={{ title: "Probability", indicator: `${data.probability}%` }} />
                <HvKpi labels={{ title: "Time horizon", indicator: `${data.timeHorizon}h` }} />
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
              <HvTypography variant="highlightText">Related assets</HvTypography>
              <HvTypography noWrap>{data.relatedAssets}</HvTypography>
            </HvGrid>
          </HvGrid>
        </HvCardContent>
        <HvActionBar aria-label="Leaf">
          {viewConfiguration.isSelectable && (
            <HvCheckBox
              checked={data.checked}
              onChange={viewConfiguration.onSelection}
              value={data.id}
              inputProps={{ "aria-label": `Select ${data.id}` }}
            />
          )}
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            id={data.id}
            actions={viewConfiguration.actions}
            maxVisibleActions={viewConfiguration.maxVisibleActions}
            actionsCallback={viewConfiguration.actionsCallback}
          />
        </HvActionBar>
      </HvCard>
    );
  };

  // ListRow renderer
  const rowRenderer = (value) => {
    const status = getStatus(value.status);
    const { Icon } = status;
    const { id } = value;

    return (
      <HvListViewRow
        id={id}
        key={`row${id}`}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp2}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

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
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
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
    <HvContainer>
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
        selectedView={0}
        searchProps={{ "aria-label": "Filters the cards by title, probability and time horizon." }}
        multibuttonProps={[
          { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
          { id: "list-button", icon: <List />, "aria-label": "Select list view" },
        ]}
        paginationProps={{
          labels: {
            pageSizeEntryName: "assets",
          },
        }}
        emptyComponent={
          <HvEmptyState message="No data found" icon={<Fail iconSize="S" color="acce1" />} />
        }
      >
        <HvCardView
          id="cardView"
          renderer={cardRenderer}
          viewConfiguration={{
            breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
          }}
        />
        <HvListView
          id="listView"
          renderer={rowRenderer}
          viewConfiguration={{
            columnConfiguration: [
              { style: { width: 1, textAlign: "center" } },
              { title: "Event", style: { minWidth: "360px", textAlign: "start" } },
              { title: "Probability", style: { minWidth: "80px", textAlign: "end" } },
              { title: "Time horizon", style: { minWidth: "100px", textAlign: "end" } },
              {
                title: "Related Assets",
                style: { minWidth: "195px", paddingLeft: "30px", textAlign: "start" },
              },
            ],
          }}
        />
      </HvAssetInventory>
    </HvContainer>
  );
};

Configurations.parameters = {
  docs: {
    description: {
      story:
        "Search uses the headerTitle, schedule and probability. Sort uses the headerTitle, probability and timeHorizon",
    },
  },
};

export const ThreeViews = () => {
  // Styles
  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const classes = useStyles();

  // Card Renderer
  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);

    return (
      <HvCard
        bgcolor="atmo1"
        statusColor={sema}
        icon={<Icon semantic={sema} />}
        selectable={viewConfiguration.isSelectable}
        selected={data.checked}
      >
        <HvCardHeader title={data.headerTitle} />
        <HvCardContent>
          <HvGrid container className={classes.container}>
            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvTypography className={classes.timestamp}>{data.event.timestamp}</HvTypography>
                <HvTypography>{data.event.schedule}</HvTypography>
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvKpi labels={{ title: "Probability", indicator: `${data.probability}%` }} />
                <HvKpi labels={{ title: "Time horizon", indicator: `${data.timeHorizon}h` }} />
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
              <HvTypography variant="highlightText">Related assets</HvTypography>
              <HvTypography noWrap>{data.relatedAssets}</HvTypography>
            </HvGrid>
          </HvGrid>
        </HvCardContent>
        <HvActionBar aria-label="Leaf">
          {viewConfiguration.isSelectable && (
            <HvCheckBox
              checked={data.checked}
              onChange={viewConfiguration.onSelection}
              value={data.id}
              inputProps={{ "aria-label": `Select ${data.id}` }}
            />
          )}
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            id={data.id}
            actions={viewConfiguration.actions}
            maxVisibleActions={viewConfiguration.maxVisibleActions}
            actionsCallback={viewConfiguration.actionsCallback}
          />
        </HvActionBar>
      </HvCard>
    );
  };

  // ListRow renderer
  const rowRenderer = (value) => {
    const status = getStatus(value.status);
    const { Icon } = status;
    const { id } = value;

    return (
      <HvListViewRow
        id={id}
        key={`row${id}`}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp2}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  // Text renderer
  const TextRender = ({ id, values }) => (
    <div id={id}>
      <HvGrid container>
        {values.map((value) => (
          <HvGrid item>
            <HvTypography variant="highlightText"> title</HvTypography>
            <HvTypography variant="normalText">{value.headerTitle}</HvTypography>
            <HvTypography variant="highlightText"> description</HvTypography>
            <HvTypography variant="normalText">{value.event.description}</HvTypography>
            <HvTypography variant="highlightText"> probability</HvTypography>
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
        { title: "Event", style: { minWidth: "360px", textAlign: "start" } },
        { title: "Probability", style: { minWidth: "80px", textAlign: "end" } },
        { title: "Time horizon", style: { minWidth: "100px", textAlign: "end" } },
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
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
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
    <HvContainer>
      <HvAssetInventory
        values={values()}
        configuration={assetConfiguration}
        onSelection={(event, selection) => console.log(selection)}
        isSelectable
        hasBulkActions
        actions={myActions}
        actionsCallback={(e, id, action) =>
          console.log(`You have pressed data ${id} with action ${action.label}`)
        }
        searchProps={{ "aria-label": "Filters the cards by title, probability and time horizon." }}
        multibuttonProps={[
          { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
          { id: "list-button", icon: <List />, "aria-label": "Select list view" },
          { id: "text-button", icon: <LeftAlign />, "aria-label": "Select text view" },
        ]}
      >
        <HvCardView id="card" renderer={cardRenderer} />
        <HvListView id="list" renderer={rowRenderer} />
        <TextRender id="text" />
      </HvAssetInventory>
    </HvContainer>
  );
};

ThreeViews.parameters = {
  docs: {
    description: { story: "Asset Inventory with third view, a custom TextRender" },
  },
};

export const ServerSidePagination = () => {
  // Styles
  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const classes = useStyles();

  // Card Renderer
  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);

    return (
      <HvCard
        bgcolor="atmo1"
        statusColor={sema}
        icon={<Icon semantic={sema} />}
        selectable={viewConfiguration.isSelectable}
        selected={data.checked}
      >
        <HvCardHeader title={data.headerTitle} />
        <HvCardContent>
          <HvGrid container className={classes.container}>
            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvTypography className={classes.timestamp}>{data.event.timestamp}</HvTypography>
                <HvTypography>{data.event.schedule}</HvTypography>
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvKpi labels={{ title: "Probability", indicator: `${data.probability}%` }} />
                <HvKpi labels={{ title: "Time horizon", indicator: `${data.timeHorizon}h` }} />
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
              <HvTypography variant="highlightText">Related assets</HvTypography>
              <HvTypography noWrap>{data.relatedAssets}</HvTypography>
            </HvGrid>
          </HvGrid>
        </HvCardContent>
        <HvActionBar aria-label="Leaf">
          {viewConfiguration.isSelectable && (
            <HvCheckBox
              checked={data.checked}
              onChange={viewConfiguration.onSelection}
              value={data.id}
              inputProps={{ "aria-label": `Select ${data.id}` }}
            />
          )}
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            id={data.id}
            actions={viewConfiguration.actions}
            maxVisibleActions={viewConfiguration.maxVisibleActions}
            actionsCallback={viewConfiguration.actionsCallback}
          />
        </HvActionBar>
      </HvCard>
    );
  };

  // ListRow renderer
  const rowRenderer = (value) => {
    const status = getStatus(value.status);
    const { Icon } = status;
    const { id } = value;

    return (
      <HvListViewRow
        id={id}
        key={`row${id}`}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp2}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

  // ----------------------- Configuration ------------------------------

  const myActions = [
    { id: "post", label: "Dismiss", disabled: false },
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
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
      <HvContainer>
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
          searchProps={{ "aria-label": "Filters data by title, probability and time horizon." }}
          multibuttonProps={[
            { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
            { id: "list-button", icon: <List />, "aria-label": "Select list view" },
          ]}
        >
          <HvCardView
            id="card"
            renderer={cardRenderer}
            viewConfiguration={{
              breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
            }}
          />
          <HvListView
            id="list"
            renderer={rowRenderer}
            viewConfiguration={{
              columnConfiguration: [
                { style: { width: 1, textAlign: "center" } },
                { title: "Event", style: { minWidth: "360px", textAlign: "start" } },
                { title: "Probability", style: { minWidth: "80px", textAlign: "end" } },
                { title: "Time horizon", style: { minWidth: "100px", textAlign: "end" } },
                {
                  title: "Related Assets",
                  style: { minWidth: "195px", paddingLeft: "30px", textAlign: "start" },
                },
              ],
            }}
          />
        </HvAssetInventory>
      </HvContainer>
    );
  };
  return <ServerSideAssetInventory />;
};

ServerSidePagination.parameters = {
  docs: {
    description: { story: "Asset Inventory with a simulation of server-side pagination" },
  },
};

export const Accessibility = () => {
  // Styles
  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const classes = useStyles();

  // Card Renderer
  const cardRenderer = (data, viewConfiguration) => {
    const { Icon, sema } = getStatus(data.status);

    return (
      <HvCard
        bgcolor="atmo1"
        statusColor={sema}
        icon={<Icon semantic={sema} />}
        selectable={viewConfiguration.isSelectable}
        selected={data.checked}
      >
        <HvCardHeader title={data.headerTitle} />
        <HvCardContent>
          <HvGrid container className={classes.container}>
            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvTypography className={classes.timestamp}>{data.event.timestamp}</HvTypography>
                <HvTypography>{data.event.schedule}</HvTypography>
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
              <div className={classes.kpis}>
                <HvKpi labels={{ title: "Probability", indicator: `${data.probability}%` }} />
                <HvKpi labels={{ title: "Time horizon", indicator: `${data.timeHorizon}h` }} />
              </div>
            </HvGrid>

            <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
              <HvTypography variant="highlightText">Related assets</HvTypography>
              <HvTypography noWrap>{data.relatedAssets}</HvTypography>
            </HvGrid>
          </HvGrid>
        </HvCardContent>
        <HvActionBar aria-label="Leaf">
          {viewConfiguration.isSelectable && (
            <HvCheckBox
              checked={data.checked}
              onChange={viewConfiguration.onSelection}
              value={data.id}
              inputProps={{ "aria-label": `Select ${data.id}` }}
            />
          )}
          <div style={{ flex: 1 }} />
          <HvActionsGeneric
            id={data.id}
            actions={viewConfiguration.actions}
            maxVisibleActions={viewConfiguration.maxVisibleActions}
            actionsCallback={viewConfiguration.actionsCallback}
          />
        </HvActionBar>
      </HvCard>
    );
  };

  // ListRow renderer
  const rowRenderer = (value) => {
    const status = getStatus(value.status);
    const { Icon } = status;
    const { id } = value;

    return (
      <HvListViewRow
        id={id}
        key={`row${id}`}
        checked={value.checked}
        checkboxProps={{ value: value.id, inputProps: { "aria-label": `Select ${id}` } }}
      >
        <HvListViewCell semantic={status.sema}>
          <Icon semantic={status.sema} className={classes.icon} />
        </HvListViewCell>

        <HvListViewCell>
          <div style={{ display: "inline-flex" }}>
            <HvTypography variant="highlightText">{value.event.description}</HvTypography>
            <HvTypography className={classes.timestamp2}>{value.event.timestamp}</HvTypography>
            <div className={classes.columnSplitter} />
            <HvTypography>{value.event.schedule}</HvTypography>
          </div>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.probability}%`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{`${value.timeHorizon}h`}</HvTypography>
        </HvListViewCell>

        <HvListViewCell>
          <HvTypography>{value.relatedAssets}</HvTypography>
        </HvListViewCell>
      </HvListViewRow>
    );
  };

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
        { title: "Event", style: { minWidth: "360px", textAlign: "start" } },
        { title: "Probability", style: { minWidth: "80px", textAlign: "end" } },
        { title: "Time horizon", style: { minWidth: "100px", textAlign: "end" } },
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
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
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
    <HvContainer>
      <HvAssetInventory
        values={values()}
        configuration={assetConfiguration}
        onSelection={(event) => console.log(event.target.value)}
        isSelectable
        actions={myActions}
        actionsCallback={(e, id, action) =>
          console.log(`You have pressed data ${id} with action ${action.label}`)
        }
        searchProps={{ "aria-label": "Filters data" }}
        multibuttonProps={[
          { id: "card-button", icon: <Cards />, "aria-label": "Select card view" },
          { id: "list-button", icon: <List />, "aria-label": "Select list view" },
        ]}
      >
        <HvCardView id="card" renderer={cardRenderer} />
        <HvListView id="list" renderer={rowRenderer} />
      </HvAssetInventory>
    </HvContainer>
  );
};

Accessibility.parameters = {
  docs: {
    description: {
      story:
        "Accessibility:<br/>" +
        "- Search: Create a label using aria-label using the searchProps. <br/>" +
        "- Sort: Use the labels.sortBy to create a aria-label. <br/>" +
        "- MultiButton: Individual aria-label to create a label for each button using the multibuttonProps ",
    },
  },
};
