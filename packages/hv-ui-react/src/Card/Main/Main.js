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

const Main = ({ classes, data, basePath, useRouter }) => {
  const severity = data.severity || "";

  const status = classNames({
    [classes[`${severity.toLowerCase()}`]]: severity
  });

  return (
    <Card className={classNames(classes.root, status)}>
      <Header data={data} />
      <Content data={data} />
      <Footer data={data} basePath={basePath} useRouter={useRouter} />
    </Card>
  );
};

Main.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  basePath: PropTypes.string,
  useRouter: PropTypes.bool
};

Main.defaultProps = {
  basePath: "",
  useRouter: false
};

export default Main;
