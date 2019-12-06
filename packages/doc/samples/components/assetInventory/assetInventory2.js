import React from "react";
import AssetInventory from "@hv/uikit-react-core/dist/AssetInventory";
import Cards from "@hv/uikit-react-icons/dist/Generic/Cards";
import List from "@hv/uikit-react-icons/dist/Generic/List";
import Connect from "@hv/uikit-react-icons/dist/Generic/Connect";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import Grid from "@hv/uikit-react-core/dist/Grid";
import HvKpi from "@hv/uikit-react-core/dist/Kpi";
import HvCard from "@hv/uikit-react-core/dist/Card";
import ListView, {
  HvListViewCell,
  HvListViewRow
} from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import RawUploadIcon from "@hv/uikit-react-icons/dist/Generic/Upload";
import RawAddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import RawPreviewIcon from "@hv/uikit-react-icons/dist/Generic/Preview";
import RawDeleteIcon from "@hv/uikit-react-icons/dist/Generic/Delete";
import Level1 from "@hv/uikit-react-icons/dist/Generic/Level1";
import Level2 from "@hv/uikit-react-icons/dist/Generic/Level2.Average";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import Level4 from "@hv/uikit-react-icons/dist/Generic/Level4";
import Level5 from "@hv/uikit-react-icons/dist/Generic/Level5";
import withStyles from "@material-ui/core/styles/withStyles";

const boxStyles = { width: "30px", height: "30px" };
const styles = () => ({
  box: {
    ...boxStyles
  }
});

const AddIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawAddIcon className={classes.box} color={color} />;
  }
);

const PreviewIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawPreviewIcon className={classes.box} color={color} />;
  }
);

const UploadIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawUploadIcon className={classes.box} color={color} />;
  }
);

const DeleteIcon = withStyles(styles, { withTheme: true })(
  ({ classes, disabled, theme }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <RawDeleteIcon className={classes.box} color={color} />;
  }
);

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
  kpis: { display: "flex" },
  timestamp: {
    paddingRight: `${theme.hv.spacing.xs}px`,
    marginRight: "10px",
    borderRight: `solid 2px ${theme.hv.palette.atmosphere.atmo5}`
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
    <Grid container spacing={0}>
      <Grid item xs={4} sm={8} md={8} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvTypography className={classes.timestamp} variant="infoText">
            {values.event.timestamp}
          </HvTypography>
          <HvTypography variant="infoText">
            {values.event.schedule}
          </HvTypography>
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={8} lg={12} xl={12}>
        <div className={classes.kpis}>
          <HvKpi labels={KpiProbability(values.probability)} />
          <HvKpi labels={KpiTimeHorizon(values.timeHorizon)} />
        </div>
      </Grid>

      <Grid item xs={4} sm={8} md={8} lg={12} xl={12} className={classes.item}>
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

const cardRenderer = (value, viewConfiguration, metadata) => {
  const status = {
    Icon: null,
    sema: "sema1"
  };
  switch (value.status) {
    default:
    case 1:
      status.Icon = <Level1 semantic="sema10" boxStyles={boxStyles} />;
      status.sema = "sema10";
      break;
    case 2:
      status.Icon = <Level2 semantic="sema11" boxStyles={boxStyles} />;
      status.sema = "sema11";
      break;
    case 3:
      status.Icon = <Level3 semantic="sema12" boxStyles={boxStyles} />;
      status.sema = "sema12";
      break;
    case 4:
      status.Icon = <Level4 semantic="sema13" boxStyles={boxStyles} />;
      status.sema = "sema13";
      break;
    case 5:
      status.Icon = <Level5 semantic="sema14" boxStyles={boxStyles} />;
      status.sema = "sema14";
      break;
  }

  return (
    <HvCard
      icon={status.Icon}
      headerTitle={value.headerTitle}
      innerCardContent={<ContentWithStyles values={value} icon={status.Icon} />}
      semantic={status.sema}
      checkboxValue={value.id}
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
        <Icon semantic={status.sema} className={classes.icon} />
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
    display: "block",
    paddingLeft: "3px"
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
      status.sema = "sema10";
      break;
    case 2:
      status.Icon = Level2;
      status.sema = "sema11";
      break;
    case 3:
      status.Icon = Level3;
      status.sema = "sema12";
      break;
    case 4:
      status.Icon = Level4;
      status.sema = "sema13";
      break;
    case 5:
      status.Icon = Level5;
      status.sema = "sema14";
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

//-------------------------- TextRender --------------------------------

const TextRender = ({ id, values }) => (
  <div id={id}>
    <Grid container>
      {values.map(value => (
        <Grid item>
          <HvTypography variant={"labelText"}> title</HvTypography>
          <HvTypography variant={"normalText"}>
            {value.headerTitle}
          </HvTypography>
          <HvTypography variant={"labelText"}> description</HvTypography>
          <HvTypography variant={"normalText"}>
            {value.event.description}
          </HvTypography>
          <HvTypography variant={"labelText"}> probability</HvTypography>
          <HvTypography variant={"normalText"}>
            {value.event.probability}
          </HvTypography>
        </Grid>
      ))}
    </Grid>
  </div>
);

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
    probability: "92",
    timeHorizon: "8",
    relatedAssets: "Track A, Zone 15 Brake",
    checkboxValue: "id_" + id
  };
};

const machineData = id => {
  return {
    headerTitle: "Track severe " + (id + 1),
    id: "id_" + id,
    status: 1,
    event: {
      description: "Track severe breakdown",
      timestamp: "2 hours ago",
      schedule: "fix 3rd shift"
    },
    probability: "90",
    timeHorizon: "20",
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
  {
    id: "post",
    label: "Add",
    iconCallback: () => <AddIcon />,
    disabled: false
  },
  {
    id: "get",
    label: "Preview",
    iconCallback: () => <PreviewIcon disabled />,
    disabled: true
  },
  {
    id: "put",
    label: "Upload",
    iconCallback: () => <UploadIcon disabled />,
    disabled: true
  },
  {
    id: "delete",
    label: "Delete",
    iconCallback: () => <DeleteIcon />,
    disabled: false
  }
];

const configuration = {
  metadata: [
    {
      id: "id1",
      title: "headerTitle",
      accessor: "headerTitle",
      cellType: "alpha-numeric",
      searchable: true,
      sortable: true,
      sortableLabelAsc: "Title ascending",
      sortableLabelDesc: "Title descending"
    },
    {
      id: "id2",
      title: "subheader",
      accessor: "subheader",
      cellType: "alpha-numeric"
    },
    {
      id: "id3",
      title: "semantic",
      accessor: "semantic",
      cellType: "alpha-numeric"
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
      values={values}
      renderer={rowRenderer}
      viewConfiguration={{
        columnConfiguration: [
          {
            title: "Status",
            style: {
              paddingLeft: "8px",
              width: "52px"
            },
            align: "left"
          },
          {
            title: "Event",
            style: {
              width: "570px"
            },
            align: "left"
          },
          {
            title: "Probability",
            style: {
              width: "93px"
            },
            align: "right"
          },
          {
            title: "Time horizon",
            style: {
              width: "108px"
            },
            align: "right"
          },
          {
            title: "Related Assets",
            style: {
              width: "195px",
              paddingLeft: "30px"
            },
            align: "left"
          }
        ]
      }}
    />
    <TextRender id="textRender" icon={<Connect />} />
  </AssetInventory>
);
