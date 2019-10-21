import React from "react";
import {
  HvListViewCell,
  HvListViewRow
} from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import Typography from "@hv/uikit-react-core/dist/Typography";
import styles from "./styles";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Level1 from "@hv/uikit-react-icons/dist/Generic/Level1";
import Level2 from "@hv/uikit-react-icons/dist/Generic/Level2.Average";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import Level4 from "@hv/uikit-react-icons/dist/Generic/Level4";
import Level5 from "@hv/uikit-react-icons/dist/Generic/Level5";

const Row = ({ classes, status, value, id }) => {
  const { Icon } = status;

  return (
    <HvListViewRow checkboxValue={value.id}>
      <HvListViewCell semantic={status.sema} id={"icon" + id} key={"icon" + id}>
        <Icon className={classes.icon} />
      </HvListViewCell>

      <HvListViewCell id={"description" + id} key={"description" + id}>
        <div style={{ display: "inline-flex" }}>
          <Typography variant="highlightText">
            {value.event.description}
          </Typography>
          <Typography className={classes.timestamp} variant="infoText">
            {value.event.timestamp}
          </Typography>
          <Typography style={{ paddingTop: "2px" }} variant="infoText">
            {value.event.schedule}
          </Typography>
        </div>
      </HvListViewCell>

      <HvListViewCell id={"probability" + id} key={"probability" + id}>
        <Typography variant="normalText">{value.probability}%</Typography>
      </HvListViewCell>

      <HvListViewCell id={"timeHorizon" + id} key={"timeHorizon" + id}>
        <Typography variant="normalText">{value.timeHorizon}h</Typography>
      </HvListViewCell>

      <HvListViewCell id={"relatedAssets" + id} key={"relatedAssets" + id}>
        <Typography variant="normalText">{value.relatedAssets}</Typography>
      </HvListViewCell>
    </HvListViewRow>
  );
};

const StyledRow = withStyles(styles, { withTheme: true })(Row);

/**
 * Row render passed to the ListView.
 *
 * @param value
 * @param index
 * @param viewConfiguration
 * @param metadata
 * @returns {*}
 */
const rowRenderer = (value, index, viewConfiguration, metadata) => {
  const status = {};
  const { probability } = value;

  switch (true) {
    default:
    case probability < 20:
      status.Icon = Level1;
      status.sema = "sema9";
      break;
    case probability < 40:
      status.Icon = Level2;
      status.sema = "sema10";
      break;
    case probability < 60:
      status.Icon = Level3;
      status.sema = "sema11";
      break;
    case probability < 80:
      status.Icon = Level4;
      status.sema = "sema12";
      break;
    case probability <= 100:
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

export default rowRenderer;
