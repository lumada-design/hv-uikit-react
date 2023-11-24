import { useState } from "react";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvPagination,
  HvPaginationProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const StyledBox = styled(HvTypography)({
  display: "flex",
  flexWrap: "wrap",
  "&>span": {
    width: "100px",
    padding: "8px 12px",
    margin: "12px",
    textAlign: "center",
    borderRadius: "4px",
    background: theme.colors.atmo1,
  },
});

const meta: Meta<typeof HvPagination> = {
  title: "Components/Pagination",
  component: HvPagination,
};
export default meta;

export const Main: StoryObj<HvPaginationProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
    const data = [...Array(64).keys()];

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

    const numPages = Math.ceil(data.length / pageSize);

    return (
      <>
        <StyledBox>
          {data.slice(pageSize * page, pageSize * (page + 1)).map((i) => (
            <HvTypography key={i} component="span">
              {`Item ${i + 1}`}
            </HvTypography>
          ))}
        </StyledBox>
        <p />
        <HvPagination
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
  },
};
