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
import theme from "@hv-ui/themes/dist/theme";
import HvCard from "@hv/uikit-react-core/dist/Card";
import FailureIcon from "@hv-ui/icons/core/icons/Level5.S";
import Icon from "@hv-ui/icons/core/icons/Up.S";
import HvButton from "@hv/uikit-react-core/dist/Button";
import MoreOptionsIcon from "@hv-ui/icons/core/icons/MoreOptionsVertical.S";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import leaf from "./resources/leaf.png";

const configuration = {
  title: "Leaves Appear wilted and scorched",
  subtitleLeft: "Just now",
  subtitleRight: "L20"
};

const subtitleLeftStyle = {
  borderRight: "1px solid #dedede",
  paddingRight: "10px",
  marginRight: "10px"
};

const strings = {
  cellATitle: "Priority",
  cellAContent: "High",
  cellCTitle: "Probability score",
  cellCContent: "98%",
  cellBTitle: "Main Asset",
  cellBContent: "California wonder grain of wonderfullness",
  cellDTitle: "Est. date of failure",
  cellDContent: "30-60 days"
};

const MultipleActionsWithMediaStyles = theme => ({
  content: {
    padding: `0 ${theme.hv.spacing.sm}px 0 ${theme.hv.spacing.sm}px`
  },
  item: {
    padding: `0 0 ${theme.hv.spacing.sm}px 0`
  },
  bottomItem: {
    padding: "0"
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.subtitle2
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1
  },
  highlightText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3
  }
});

const MultipleActionsWithMedia = () => {
  const {
    cellATitle,
    cellAContent,
    cellBTitle,
    cellBContent,
    cellCTitle,
    cellCContent,
    cellDTitle,
    cellDContent
  } = strings;

  return (
    <>
      <Grid container>
        <Grid item xs={5} className={MultipleActionsWithMediaStyles.item}>
          <Typography className={MultipleActionsWithMediaStyles.label}>
            {cellATitle}
          </Typography>
          <Typography className={MultipleActionsWithMediaStyles.text}>
            {cellAContent}
          </Typography>
        </Grid>
        <Grid item xs={7} className={MultipleActionsWithMediaStyles.item}>
          <Typography className={MultipleActionsWithMediaStyles.label}>
            {cellBTitle}
          </Typography>
          <Typography className={MultipleActionsWithMediaStyles.text}>
            {cellBContent}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={MultipleActionsWithMediaStyles.bottoItem}>
          <Typography className={MultipleActionsWithMediaStyles.label}>
            {cellCTitle}
          </Typography>
          <Typography className={MultipleActionsWithMediaStyles.highlightText}>
            {cellCContent}
          </Typography>
        </Grid>
        <Grid item xs={7} className={MultipleActionsWithMediaStyles.bottoItem}>
          <Typography className={MultipleActionsWithMediaStyles.label}>
            {cellDTitle}
          </Typography>
          <Typography className={MultipleActionsWithMediaStyles.highlightText}>
            {cellDContent}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const actionStyles = theme => ({
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

const MultipleActionsWithMediaButtons = () => (
  <>
    <HvButton className={actionStyles.button} colorType="link">
      <Icon />
      Update
    </HvButton>
    <HvButton className={actionStyles.smallButton} colorType="link">
      <MoreOptionsIcon />
    </HvButton>
  </>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard
      Icon={<FailureIcon color={["none", theme.palette.semantic.sema6]} />}
      HeaderTitle={configuration.title}
      Subheader={(
        <div>
          <span style={subtitleLeftStyle}>{configuration.subtitleLeft}</span>
          <span>{configuration.subtitleRight}</span>
        </div>
)}
      InnerCardContent={<MultipleActionsWithMedia />}
      Actions={<MultipleActionsWithMediaButtons />}
      variant="error"
      isSelectable
      checkboxValue="value"
      mediaPath={leaf}
      mediaHeight={160}
      onSelect={event => console.log(`my value is ${event.target.value}`)}
    />
  </div>
);
