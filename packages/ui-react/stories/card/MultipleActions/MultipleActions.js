/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
}

const ContentGrid = ({ classes }) => {
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
        <Grid item xs={5} className={classes.item}>
          <Typography className={classes.label}>{cellATitle}</Typography>
          <Typography className={classes.text}>
            {cellAContent}
          </Typography>
        </Grid>
        <Grid item xs={7} className={classes.item}>
          <Typography className={classes.label}>{cellBTitle}</Typography>
          <Typography className={classes.text}>{cellBContent}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5} className={classes.item}>
          <Typography className={classes.label}>{cellCTitle}</Typography>
          <Typography className={classes.text}>{cellCContent}</Typography>
        </Grid>
        <Grid item xs={7} className={classes.bottomItem}>
          <Typography className={classes.label}>{cellDTitle}</Typography>
          <Typography className={classes.text}>{cellDContent}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.bottomItem}>
          <Typography className={classes.label}>{cellETitle}</Typography>
          <Typography className={classes.text}>{cellEContent}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

ContentGrid.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default ContentGrid;
