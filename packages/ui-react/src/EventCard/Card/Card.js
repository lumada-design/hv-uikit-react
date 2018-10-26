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
import classNames from "classnames";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";

const EventCard = props => {
  const { classes, event } = props;
  const criticality = event.criticality || "";

  const status = classNames({
    [classes[`${criticality.toLowerCase()}`]]: criticality
  });

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classNames(classes.root, status)}>
        <Header event={event} />
        <Content event={event} />
        <Footer event={event} />
      </Card>
    </Grid>
  );
};

EventCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  event: PropTypes.instanceOf(Object).isRequired
};

export default EventCard;
