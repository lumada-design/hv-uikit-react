/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvListViewCell, HvListViewRow } from "@hv/uikit-react-core/dist/AssetInventory/ListView";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Level1 from "@hv/uikit-react-icons/dist/Generic/Level1";
import Level2 from "@hv/uikit-react-icons/dist/Generic/Level2.Average";
import Level3 from "@hv/uikit-react-icons/dist/Generic/Level3.Bad";
import Level4 from "@hv/uikit-react-icons/dist/Generic/Level4";
import Level5 from "@hv/uikit-react-icons/dist/Generic/Level5";
import styles from "./styles";

const Row = ({ classes, status, value, id }) => {
  const { Icon } = status;

  return (
    <HvListViewRow checkboxValue={value.id}>
      <HvListViewCell semantic={status.sema} id={"icon" + id} key={"icon" + id}>
        <Icon semantic={status.sema} className={classes.icon} />
      </HvListViewCell>

      <HvListViewCell id={"description" + id} key={"description" + id}>
        <div className={classes.cellInline}>
          <Typography variant="highlightText">
            {value.event.description}
          </Typography>
          <Typography className={classes.timestamp} variant="infoText">
            {value.event.timestamp}
          </Typography>
          <Typography className={classes.schedule} variant="infoText">
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
