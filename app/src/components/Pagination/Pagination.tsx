import styled from "@emotion/styled";
import { HvPagination, HvTypography } from "@hitachivantara/uikit-core";
import { useState } from "react";

const StyledBox = styled(HvTypography)({
  display: "flex",
  flexWrap: "wrap",
  "&>span": {
    width: "100px",
    padding: "8px 12px",
    margin: "12px",
    textAlign: "center",
    borderRadius: "4px",
    background: "white",
  },
});

export const Pagination = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
  const data = [...Array(64).keys()];

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

  const numPages = Math.ceil(data.length / pageSize);

  return (
    <>
      <StyledBox>
        {data.slice(pageSize * page, pageSize * (page + 1)).map((i) => (
          <HvTypography key={i} as="span">
            {`Item ${i + 1}`}
          </HvTypography>
        ))}
      </StyledBox>
      <p />
      <HvPagination
        id="pagination"
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={(value) => setPage(value)}
        onPageSizeChange={(value) => setPageSize(value)}
        labels={{ pageSizeEntryName: "items" }}
      />
    </>
  );
};
