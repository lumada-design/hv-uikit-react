/* eslint-disable */

import React from "react";
import Pagination from "../../Pagination";

export default props => (
  <Pagination
    {...props}
    rowsSelectorText={props.labels.labelRowsSelector}
    ofText={props.labels.labelOf}
  />
);
