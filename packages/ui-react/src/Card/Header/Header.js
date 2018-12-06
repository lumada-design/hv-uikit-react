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
import classNames from "classnames";
import CardHeader from "@material-ui/core/CardHeader";
import ErrorIcon from "@material-ui/icons/ErrorRounded";
import CheckCircle from "@material-ui/icons/CheckCircle";

const Header = ({ classes, data }) => {
  const { name, createdDate } = data;
  const severity = data.severity || "";

  const SeverityIcon = () => {
    switch (severity.toLowerCase()) {
      case "info":
        return (
          <CheckCircle className={classNames(classes.icon, classes.info)} />
        );
      case "warning":
        return (
          <ErrorIcon className={classNames(classes.icon, classes.warning)} />
        );
      case "critical":
        return (
          <ErrorIcon className={classNames(classes.icon, classes.critical)} />
        );
      default:
        return null;
    }
  };

  return (
    <CardHeader
      title={name}
      className={classes.root}
      subheader={createdDate}
      action={<SeverityIcon />}
      classes={{
        title: classes.title,
        subheader: classes.subheader
      }}
    />
  );
};

Header.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired
};

export default Header;
