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

const parseDescription = description => {
  return description.split("-")[0];
};

const PropsTable = ({ classes, propsMetaData }) => (
  <table className={classes.table}>
    <thead>
      <tr>
        <th>Property</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(propsMetaData).map(key => {
        const prop = propsMetaData[key];
        return (
          <tr key={key}>
            <td>{key}</td>
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
export default PropsTable;
