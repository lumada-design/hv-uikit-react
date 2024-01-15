import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvTypography, HvListViewRow, HvListViewCell } from "@hitachivantara/uikit-react-core";
import {
  Level1,
  Level2Average,
  Level3Bad,
  Level4,
  Level5,
} from "@hitachivantara/uikit-react-icons";
import styles from "./styles";

const Row = ({ classes, status, value, id }) => {
  const { Icon } = status;

  return (
    <HvListViewRow checkboxValue={value.id}>
      <HvListViewCell semantic={status.sema} id={`icon${id}`} key={`icon${id}`}>
        <Icon
          semantic={status.sema}
          className={classes.icon}
          boxStyles={{ width: "30px", height: "30px", padding: "3px" }}
        />
      </HvListViewCell>

      <HvListViewCell id={`description${id}`} key={`description${id}`}>
        <div className={classes.cellInline}>
          <HvTypography variant="highlightText">{value.event.description}</HvTypography>
          <HvTypography className={classes.timestamp} variant="sText">
            {value.event.timestamp}
          </HvTypography>
          <HvTypography className={classes.schedule} variant="sText">
            {value.event.schedule}
          </HvTypography>
        </div>
      </HvListViewCell>

      <HvListViewCell id={`probability${id}`} key={`probability${id}`}>
        <HvTypography variant="normalText">{`${value.probability}%`}</HvTypography>
      </HvListViewCell>

      <HvListViewCell id={`timeHorizon${id}`} key={`timeHorizon${id}`}>
        <HvTypography variant="normalText">{`${value.timeHorizon}h`}</HvTypography>
      </HvListViewCell>

      <HvListViewCell id={`relatedAssets${id}`} key={`relatedAssets${id}`}>
        <HvTypography variant="normalText">{value.relatedAssets}</HvTypography>
      </HvListViewCell>
    </HvListViewRow>
  );
};

const StyledRow = withStyles(styles)(Row);

/**
 * Row render passed to the ListView.
 *
 * @param value
 * @param index
 * @param viewConfiguration
 * @param metadata
 * @returns {*}
 */
const rowRenderer = (value, index) => {
  const status = {};
  const { probability } = value;

  switch (true) {
    default:
    case probability < 20:
      status.Icon = Level1;
      status.sema = "sema10";
      break;
    case probability < 40:
      status.Icon = Level2Average;
      status.sema = "sema11";
      break;
    case probability < 60:
      status.Icon = Level3Bad;
      status.sema = "sema12";
      break;
    case probability < 80:
      status.Icon = Level4;
      status.sema = "sema13";
      break;
    case probability <= 100:
      status.Icon = Level5;
      status.sema = "sema14";
      break;
  }

  return <StyledRow status={status} value={value} id={value.id + index} key={value.id + index} />;
};

export default rowRenderer;
