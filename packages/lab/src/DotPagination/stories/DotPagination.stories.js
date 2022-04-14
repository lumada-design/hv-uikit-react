import { HvTypography } from "@hitachivantara/uikit-react-core";
import React, { useState } from "react";

import { HvDotPagination } from "../..";

export default {
  title: "Lab/DotPagination",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDotPagination } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvDotPagination,
};

export const Main = () => {
  const [page, setPage] = useState(0);
  const pages = [
    "This is page 1",
    "And this is page 2",
    "This is page 3",
    "This is page 4",
    "And finally, this is page 5",
  ];

  return (
    <div style={{ width: "100%", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <HvTypography>{pages[page]}</HvTypography>
      </div>
      <p />
      <HvDotPagination
        page={page}
        pages={pages.length}
        onPageChange={(value) => setPage(value)}
        getItemAriaLabel={(pageNumber) => {
          switch (pageNumber) {
            case 0:
              return "first page button aria-label";
            case 4:
              return "last page button aria-label";
            default:
              return `${pageNumber + 1} page aria-label`;
          }
        }}
        id={1}
        role="navigation"
        aria-label="Example Dot Navigation"
      />
    </div>
  );
};
