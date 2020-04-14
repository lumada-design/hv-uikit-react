import React from "react";

const parseDescription = description => {
  return description.split("-")[0];
};

const TableCSS = ({ classes, propsMetaData }) => {
  return (
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
              {prop.description ? <td>{parseDescription(prop.description)}</td> : <td />}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TableCSS;
