import React from "react";
import classNames from "classnames";
import { parseType, parseDescription, isDeprecated } from "./utils";

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
            <td className={classNames({
              [classes.deprecated]: prop.deprecated
            })}>{key}</td>
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
