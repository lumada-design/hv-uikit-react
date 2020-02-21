/*
 * Copyright 2020 Hitachi Vantara Corporation
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
import Header, { HvHeaderBrand } from "@hv/uikit-react-core/dist/Header";
import Login from "@hv/uikit-react-core/dist/Login";
import HitachiLogo from "../home/components/HitachiLogo";

const callSimulation = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });


// eslint-disable-next-line react/prop-types
const LoginTemplate = ({ classes }) => (
  <div>
    <Header id="header">
      <HvHeaderBrand logo={<HitachiLogo />} name="Maintenance Insights" />
    </Header>
    <div className={classes.root}>
      <Login
        id="test"
        login={callSimulation}
        recovery={callSimulation}
        allowRecover
      />
    </div>
  </div>
);
export default LoginTemplate;
