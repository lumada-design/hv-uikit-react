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
import Card from "@material-ui/core/Card";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";

const Main = props => {
  const { classes, event, useRouter } = props;
  const criticality = event.criticality || "";

  const status = classNames({
    [classes[`${criticality.toLowerCase()}`]]: criticality
  });

  return (
    <Card className={classNames(classes.root, status)}>
      <Header event={event} />
      <Content event={event} />
      <Footer event={event} useRouter={useRouter} />
    </Card>
  );
};

Main.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  event: PropTypes.instanceOf(Object).isRequired,
  useRouter: PropTypes.bool
};

Main.defaultProps = {
  useRouter: false
};

export default Main;
