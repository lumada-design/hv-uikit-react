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
import { HvEventCard } from "@hv-ui/react";

const getEvents = events =>
  events.edges.map(eventNode => {
    const event = eventNode.node;

    return (
      <Grid item key={event.id} xs={12} sm={6} md={4}>
        <React.Fragment>
          <HvEventCard event={event}/>
        </React.Fragment>
      </Grid>
    );
  });

const EventsList = ({ data }) => (
  <Grid container>{data.events ? getEvents(data.events) : ""}</Grid>
);

EventsList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired
};

export default EventsList;
