import React from "react";
import AssetInventory from "@hv/uikit-react-core/dist/AssetInventory";
import Cards from "@hv/uikit-react-icons/dist/Generic/Cards";
import List from "@hv/uikit-react-icons/dist/Generic/List";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import ListView, {
  HvListViewCell,
  HvListViewRow
} from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import Grid from "@hv/uikit-react-core/dist/Grid";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import HvCard from "@hv/uikit-react-core/dist/Card";
import AddIcon from "@hv/uikit-react-icons/dist/Add.S";
import PreviewIcon from "@hv/uikit-react-icons/dist/Preview.S";
import UploadIcon from "@hv/uikit-react-icons/dist/Upload.S";
import DeleteIcon from "@hv/uikit-react-icons/dist/Delete.S";
import Icon from "@hv/uikit-react-icons/dist/DawnTheme/Tool.S";
import Level1 from "@hv/uikit-react-icons/dist/DawnTheme/Level1.sema10.S";
import Level2 from "@hv/uikit-react-icons/dist/DawnTheme/Level2.sema11.S";
import Level3 from "@hv/uikit-react-icons/dist/DawnTheme/Level3.sema12.S";
import Level4 from "@hv/uikit-react-icons/dist/DawnTheme/Level4.sema13.S";
import Level5 from "@hv/uikit-react-icons/dist/DawnTheme/Level5.sema14.S";
import withStyles from "@material-ui/core/styles/withStyles";

//----------------------- CardView Render -----------------------------
const kpiStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  kpis: {
    display: "flex"
  },
  timestamp: {
    paddingRight: `${theme.hv.spacing.xs}px`,
    marginRight: "10px",
    borderRight: `solid 2px ${theme.hv.palette.atmosphere.atmo5}`
  },
  container: {
    marginLeft: "-15px"
  }
});

const KpiProbability = score => ({
  title: "Probability",
  indicator: `${score}%`
});

const KpiTimeHorizon = score => ({
  title: "Time horizon",
  indicator: `${score}h`
});

/* eslint react/prop-types: 0 */
const Content = ({ classes, values }) => (
  <>
    <Grid container className={classes.container}>
      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvTypography className={classes.timestamp} variant="infoText">
            {values.event.timestamp}
          </HvTypography>
          <HvTypography variant="infoText">
            {values.event.schedule}
          </HvTypography>
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={12} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvKpi labels={KpiProbability(values.probability)} />
          <HvKpi labels={KpiTimeHorizon(values.timeHorizon)} />
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={12} lg={12} xl={12} className={classes.item}>
        <HvTypography variant="labelText">Related assets</HvTypography>
        <HvTypography variant="normalText" className={classes.text}>
          {values.relatedAssets}
        </HvTypography>
      </Grid>
    </Grid>
  </>
);

const ContentWithStyles = withStyles(kpiStyles, {
  withTheme: true
})(Content);

const cardRenderer = (data, viewConfiguration, metadata) => {
  const status = {
    Icon: null,
    sema: "sema1"
  };
  switch (data.status) {
    default:
    case 1:
      status.Icon = <Level1 />;
      status.sema = "sema10";
      break;
    case 2:
      status.Icon = <Level2 />;
      status.sema = "sema11";
      break;
    case 3:
      status.Icon = <Level3 />;
      status.sema = "sema12";
      break;
    case 4:
      status.Icon = <Level4 />;
      status.sema = "sema13";
      break;
    case 5:
      status.Icon = <Level5 />;
      status.sema = "sema14";
      break;
  }

  return (
    <HvCard
      icon={status.Icon}
      headerTitle={data.headerTitle}
      innerCardContent={<ContentWithStyles values={data} icon={status.Icon} />}
      semantic={status.sema}
      checkboxValue={data.id}
      isSelectable={viewConfiguration.isSelectable}
      onChange={viewConfiguration.onSelection}
      actions={viewConfiguration.actions}
      maxVisibleActions={viewConfiguration.maxVisibleActions}
      actionsCallback={viewConfiguration.actionsCallback}
    />
  );
};

//----------------------- ListView Render -----------------------------

const Row = ({ classes, status, value, id }) => {
  const { Icon } = status;

  return (
    <HvListViewRow checkboxValue={value.id}>
      <HvListViewCell semantic={status.sema} id={"icon" + id} key={"icon" + id}>
        <Icon className={classes.icon} />
      </HvListViewCell>

      <HvListViewCell id={"description" + id} key={"description" + id}>
        <div style={{ display: "inline-flex" }}>
          <HvTypography variant="highlightText">
            {value.event.description}
          </HvTypography>
          <HvTypography className={classes.timestamp} variant="infoText">
            {value.event.timestamp}
          </HvTypography>
          <HvTypography style={{ paddingTop: "2px" }} variant="infoText">
            {value.event.schedule}
          </HvTypography>
        </div>
      </HvListViewCell>

      <HvListViewCell id={"probability" + id} key={"probability" + id}>
        <HvTypography variant="normalText">{value.probability}%</HvTypography>
      </HvListViewCell>

      <HvListViewCell id={"timeHorizon" + id} key={"timeHorizon" + id}>
        <HvTypography variant="normalText">{value.timeHorizon}h</HvTypography>
      </HvListViewCell>

      <HvListViewCell id={"relatedAssets" + id} key={"relatedAssets" + id}>
        <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
      </HvListViewCell>
    </HvListViewRow>
  );
};

const stylesRow = theme => ({
  timestamp: {
    padding: `2px ${theme.hv.spacing.xs}px 0 ${theme.hv.spacing.xs}px`,
    marginRight: "10px",
    borderRight: `solid 2px ${theme.hv.palette.atmosphere.atmo5}`
  },
  icon: {
    display: "block"
  }
});

const StyledRow = withStyles(stylesRow, { withTheme: true })(Row);

const rowRenderer = (value, index, viewConfiguration, metadata) => {
  const status = {
    Icon: null,
    sema: "sema1"
  };
  switch (value.status) {
    default:
    case 1:
      status.Icon = Level1;
      status.sema = "sema9";
      break;
    case 2:
      status.Icon = Level2;
      status.sema = "sema10";
      break;
    case 3:
      status.Icon = Level3;
      status.sema = "sema11";
      break;
    case 4:
      status.Icon = Level4;
      status.sema = "sema12";
      break;
    case 5:
      status.Icon = Level5;
      status.sema = "sema13";
      break;
  }

  return (
    <StyledRow
      status={status}
      value={value}
      id={value.id + index}
      key={value.id + index}
    />
  );
};

//--------------------------- Values ---------------------------------

const compressorData = id => {
  return {
    headerTitle: "Risk of downtime " + (id + 1),
    id: "id_" + id,
    status: 5,
    event: {
      description: "Risk of downtime on Truck 12",
      timestamp: "2 minutes ago",
      schedule: "fix now"
    },
    probability: 90 + id,
    timeHorizon: 8 + id,
    relatedAssets: "Track A, Zone 15 Brake",
    checkboxValue: "id_" + id
  };
};

const machineData = id => {
  return {
    headerTitle: "Track severe " + (id + 1),
    id: "id_" + id,
    status: 2,
    event: {
      description: "Track severe breakdown",
      timestamp: "2 hours ago",
      schedule: "fix 3rd shift"
    },
    probability: 90 + id,
    timeHorizon: 8 + id,
    relatedAssets: "Track B, Load 2 Brake",
    checkboxValue: "id_" + id
  };
};

const values = () => {
  let cards = [];
  for (let i = 0; i < 10; ++i)
    cards.push(i % 2 === 0 ? compressorData(i) : machineData(i));
  return cards;
};

//----------------------- Configuration ------------------------------

const myActions = [
  { id: "post", label: "Add", icon: AddIcon, disabled: false },
  { id: "get", label: "Preview", icon: PreviewIcon, disabled: true },
  { id: "put", label: "Upload", icon: UploadIcon, disabled: true },
  { id: "delete", label: "Delete", icon: DeleteIcon, disabled: false }
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
      sortableLabelDesc: "Title descending"
    },
    {
      id: "id2",
      accessor: "semantic",
      cellType: "alpha-numeric"
    },
    {
      id: "id3",
      accessor: "probability",
      cellType: "numeric",
      searchable: true,
      sortable: true,
      sortableLabelAsc: "Probability ascending",
      sortableLabelDesc: "Probability descending"
    },
    {
      id: "id4",
      accessor: "timeHorizon",
      cellType: "numeric",
      sortable: true,
      sortableLabelAsc: "TimeHorizon ascending",
      sortableLabelDesc: "TimeHorizon descending"
    },
    {
      id: "id4",
      accessor: "event.schedule",
      cellType: "alpha-numeric",
      searchable: true
    }
  ]
};

export default (
  <AssetInventory
    values={values()}
    configuration={configuration}
    onSelection={event => alert(event.target.value)}
    isSelectable
    actions={myActions}
    maxVisibleActions={3}
    actionsCallback={(id, action) =>
      alert("You have pressed card " + id + " with action " + action.label)
    }
  >
    <CardView
      id="card"
      icon={<Cards />}
      renderer={cardRenderer}
      viewConfiguration={{
        breakpoints: {
          xs: "false",
          sm: "false",
          md: 4,
          lg: 3,
          xl: 3
        }
      }}
    />
    <ListView
      id="list"
      icon={<List />}
      renderer={rowRenderer}
      viewConfiguration={{
        columnConfiguration: [
          {
            title: "Status",
            style: {
              paddingLeft: "8px",
              minWidth: "52px"
            },
            align: "left"
          },
          {
            title: "Event",
            style: {
              minWidth: "570px"
            },
            align: "left"
          },
          {
            title: "Probability",
            style: {
              minWidth: "93px"
            },
            align: "right"
          },
          {
            title: "Time horizon",
            style: {
              minWidth: "108px"
            },
            align: "right"
          },
          {
            title: "Related Assets",
            style: {
              minWidth: "195px",
              paddingLeft: "30px"
            },
            align: "left"
          }
        ]
      }}
    />
  </AssetInventory>
);
