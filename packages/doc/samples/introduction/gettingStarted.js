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

const styles = theme => ({
  title: {
    ...theme.hv.typography.mTitle,
    marginBottom: 20
  },
  block1: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block2: {
    width: 700,
    ...theme.hv.typography.sTitle,
    marginBottom: 30,
    fontSize: 16,
    lineHeight: "26px"
  },
  block3: {
    margin: "5px 0 0 20px"
  },
  span: {
    ...theme.hv.typography.mTitle,
    marginBottom: 30,
    fontSize: 16
  }
});

const GettingStarted = ({ classes, config }) => (
  <>
    <div className={classes.title}>Design System</div>
    <div className={classes.block1}>
      Hitachi Design System initiative produces reusable patterns and captures
      common methodologies, reducing design and implementation effort.
      <br />
      It stands as a catalyzer for design alignment and governance across the
      organization, generating a unique and characteristic design language,
      capable of positioning Hitachi as a worldwide design reference.
    </div>
    <div className={classes.title}>UI Kit</div>
    <div className={classes.block2}>
      This UI Kit provides front-end developers & engineers a collection of
      reusable React components to build their applications.
      <br />
      It enables developers to use consistent markup, styles, and behavior in
      prototype and production work.
      <br />
      <br />
      The UI Kit components are divided in two groups:
      <br />
      <br />
      <span className={classes.span}> Core - </span>
      components that are fully compliant with Design system guidelines and UI
      Kit best practices.
      <br />
      <br />
      <span className={classes.span}> Lab - </span>
      components contributed by external teams for specific use cases and not
      fully compliant with Design System guidelines, so use it carefully.
    </div>
  </>
);

export default withStyles(styles, { withTheme: true })(GettingStarted);
