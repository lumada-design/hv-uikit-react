/* eslint-disable import/prefer-default-export */

import React from "react";
import HvLink from "../Link";

/**
 * Creates a link to be in the columns with the cellType link.
 * @param col
 */
const buildLink = (col) => {
  const column = col;
  if (column.cellType === "link") {
    column.Cell = (data) => (
      <HvLink route={data.original.link.url}>{data.original.link.displayText}</HvLink>
    );
  }
};

export { buildLink };
