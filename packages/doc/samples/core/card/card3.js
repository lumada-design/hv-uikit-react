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
import HvCard from "@hv/uikit-react-core/dist/Card";
import HvButton from "@hv/uikit-react-core/dist/Button";
import Grid from "@material-ui/core/Grid";
import HvTypography from "@hv/uikit-react-core/dist/Typography";

const configurationNoMedia = {
  title: "Advanced Server DS120",
  subtitle: "QTFCR27520007"
};

const strings = {
  cellATitle: "Priority",
  cellAContent: "High",
  cellCTitle: "Probability score",
  cellCContent: "98%",
  cellBTitle: "Main Asset",
  cellBContent: "California wonder grain of wonderfullness",
  cellDTitle: "Est. date of failure",
  cellDContent: "30-60 days",
  cellETitle: "UUID",
  cellEContent: "2101caf3-7cd4-1000-bdp95-d8c4971767c"
};

const MultipleActionsStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  bottomItem: {
    padding: "0"
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
});

const MultipleActions = () => {
  const {
    cellATitle,
    cellAContent,
    cellBTitle,
    cellBContent,
    cellCTitle,
    cellCContent,
    cellDTitle,
    cellDContent,
    cellETitle,
    cellEContent
  } = strings;

  return (
    <>
      <Grid container>
        <Grid item xs={5} className={MultipleActionsStyles.item}>
          <div>
            <HvTypography variant="highlightText">{cellATitle}</HvTypography>
          </div>
          <div>
            <HvTypography
              variant="infoText"
              className={MultipleActionsStyles.text}
            >
              {cellAContent}
            </HvTypography>
          </div>
        </Grid>
        <Grid item xs={7} className={MultipleActionsStyles.item}>
          <div>
            <HvTypography variant="highlightText">{cellBTitle}</HvTypography>
          </div>
          <div>
            <HvTypography
              variant="infoText"
              className={MultipleActionsStyles.text}
            >
              {cellBContent}
            </HvTypography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={MultipleActionsStyles.item}>
          <div>
            <HvTypography variant="highlightText">{cellCTitle}</HvTypography>
          </div>
          <div>
            <HvTypography
              variant="infoText"
              className={MultipleActionsStyles.text}
            >
              {cellCContent}
            </HvTypography>
          </div>
        </Grid>
        <Grid item xs={7} className={MultipleActionsStyles.bottomItem}>
          <div>
            <HvTypography variant="highlightText">{cellDTitle}</HvTypography>
          </div>
          <div>
            <HvTypography
              variant="infoText"
              className={MultipleActionsStyles.text}
            >
              {cellDContent}
            </HvTypography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={MultipleActionsStyles.bottomItem}>
          <div>
            <HvTypography variant="highlightText">{cellETitle}</HvTypography>
          </div>
          <div>
            <HvTypography
              variant="infoText"
              className={MultipleActionsStyles.text}
            >
              {cellEContent}
            </HvTypography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const MultipleActionsButtonsStyles = theme => ({
  button: {
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    },
    "&:nth-child(1)": {
      marginRight: `${theme.hv.spacing.xs}px`
    }
  },
  smallButton: {
    width: "32px",
    minWidth: "32px",
    padding: 0,
    color: theme.palette.grey.inspire,
    "& span": {
      color: theme.palette.grey.inspire
    },
    "&:nth-child(1)": {
      marginRight: `${theme.hv.spacing.xs}px`
    }
  }
});

const MultipleActionsButtons = () => (
  <>
    <HvButton
      className={MultipleActionsButtonsStyles.smallButton}
      colorType="link"
    >
      View
    </HvButton>
    <HvButton className={MultipleActionsButtonsStyles.button} colorType="link">
      Share
    </HvButton>
  </>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      headerTitle={configurationNoMedia.title}
      subheader={configurationNoMedia.subtitle}
      innerCardContent={<MultipleActions />}
      actions={<MultipleActionsButtons />}
      variant="none"
      checkboxValue="value"
      onChange={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
