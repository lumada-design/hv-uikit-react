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
import { parseType, parseDescription } from "./utils";

const TableAPI = ({ classes, propsMetaData }) => (
  <table className={classes.table}>
    <thead>
      <tr>
        <th>Property</th>
        <th>PropType</th>
        <th>Required</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(propsMetaData).map(key => {
        const prop = propsMetaData[key];

        const propType =
          key === "classes" ? "Check the CSS tab" : parseType(prop.type);

        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{prop.type ? propType : ""}</td>
            {prop.required ? <td>true</td> : <td>-</td>}
            {prop.defaultValue ? (
              <td>{prop.defaultValue.value}</td>
            ) : (
              <td>none</td>
            )}
            {prop.description ? (
              <td>{parseDescription(prop.description)}</td>
            ) : (
              <td />
            )}
          </tr>
        );
      })}
    </tbody>
  </table>
);
export default TableAPI;
