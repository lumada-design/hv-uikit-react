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
      height: "150px",
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => (
            <HvGrid key={value} item xs={1} sm={1} md={1} lg={1} xl={1}>
              <Box text={value.toString()} />
            </HvGrid>
          ))}
        </HvGrid>
      </div>
    </div>
  );
});

export default <GridExample />;
