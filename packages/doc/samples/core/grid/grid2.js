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
import HvGrid from "@hv/uikit-react-core/dist/Grid";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import Typography from "@hv/uikit-react-core/src/Typography";

const Box = ({ text }) => (
  <div
    style={{
      backgroundColor: "indianred",
      height: "100px",
      width: "100%",
      border: "1px solid black"
    }}
  >
    <div
      style={{
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center"
      }}
    >
      {text}
    </div>
  </div>
);

const GridExample = withStyles({}, { withTheme: true })(({ theme }) => {
  const findBreakpoint = () =>
    [...theme.breakpoints.keys].reverse().reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.only(key));

      return !output && matches ? key : output;
    }, null) || "xs";

  let breakpoint = findBreakpoint();
  let title = `breakpoint: ${breakpoint}`;

  return (
    <div>
      <Typography variant="xxsTitle">{title}</Typography>
      <div style={{ border: "1px solid" }}>
        <HvGrid container>
          <HvGrid item xs={4} sm={8} md={8} lg={12} xl={12}>
            <Box text={"xs={4} sm={8} md={8} lg={12} xl={12}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={8} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={4} sm={8} md={4} lg={6} xl={6}>
            <Box text={"xs={4} sm={4} md={4} lg={6} xl={6}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
          <HvGrid item xs={1} sm={2} md={2} lg={3} xl={3}>
            <Box text={"xs={1} sm={2} md={2} lg={3} xl={3}"} />
          </HvGrid>
        </HvGrid>
      </div>
    </div>
  );
});

export default <GridExample />;
