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
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Content = ({ classes, data }) => {
  const { outcome, assignee, assetId, description } = data;

  return (
    <CardContent className={classes.content}>
      <Grid container>
        <Grid item xs={4} className={classes.item}>
          <Typography className={classes.label}>Status</Typography>
          <Typography className={classes.text}>
            {outcome ? outcome.toLowerCase() : ""}
          </Typography>
        </Grid>
        <Grid item xs={8} className={classes.item}>
          <Typography className={classes.label}>Assignee</Typography>
          <Typography className={classes.text}>{assignee}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <Typography className={classes.label}>Related Assets</Typography>
        <Typography className={classes.text}>{assetId}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <Typography className={classes.label}>Description</Typography>
        <Typography className={classes.text}>{description}</Typography>
      </Grid>
    </CardContent>
  );
};

Content.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired
};

export default Content;
