import React, { useState } from "react";
import { withStyles } from "@material-ui/core/";
import { Tool } from "@hitachivantara/uikit-react-icons";
import { HvCardView, HvPagination, HvTypography } from "../..";
import compressorImage from "../../Card/stories/resources/compressor.png";
import leafImage from "../../Card/stories/resources/leaf.png";

export default {
  title: "Components/Pagination",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvPagination } from "@hitachivantara/uikit-react-core";',
  },
  component: HvPagination,
};

export const Main = () => {
  return <HvPagination />;
};

export const ControlledSample = () => {
  const pageSizeOptions = [4, 6, 12, 24, 48, 2000];
  const data = [...Array(64).keys()];

  const styles = (theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "&>span": {
        width: "100px",
        padding: "8px 12px",
        margin: "12px",
        textAlign: "center",
        borderRadius: "4px",
        background: theme.hv.palette.atmosphere.atmo1,
      },
    },
  });

  const Container = withStyles(styles)(({ classes, children }) => (
    <div className={classes.root}>{children}</div>
  ));

  const ControlledPagination = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(pageSizeOptions[2]);

    const numPages = Math.ceil(data.length / pageSize);

    return (
      <>
        <Container>
          {data.slice(pageSize * page, pageSize * (page + 1)).map((i) => (
            <HvTypography key={i} component="span">
              {`Item ${i + 1}`}
            </HvTypography>
          ))}
        </Container>
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

  return <ControlledPagination />;
};

ControlledSample.story = {
  parameters: {
    docs: {
      storyDescription: "Pagination controlling a list of elements",
    },
  },
};

export const CardViewSample = () => {
  const pageSizeOptions = [4, 8, 12, 24, 48];
  const createData = (num) => {
    const variations = [
      {
        semantic: "sema2",
        subheader: "Compressor",
        mediaPath: compressorImage,
        mediaTitle: "Compressor",
      },
      { semantic: "sema3", subheader: "Plant", mediaPath: leafImage, mediaTitle: "Leaf" },
    ];

    return [...Array(num).keys()].map((id) => ({
      id: `id_${id}`,
      headerTitle: `Asset Avatar ${id + 1}`,
      mediaHeight: 186,
      selected: false,
      checkboxProps: { inputProps: { "aria-label": `Select Asset ${id + 1}` } },
      ...variations[id % variations.length],
    }));
  };

  const ControlledPagination = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
    const [data, setData] = useState(createData(64));

    const numPages = Math.ceil(data.length / pageSize);

    const handleSelection = (id) => {
      const el = data.find((element) => element.id === id);
      el.selected = !el.selected;
      el.checkboxSelected = el.selected;
      setData(data);
    };

    const pageData = data.slice(pageSize * page, pageSize * (page + 1));

    return (
      <>
        <HvCardView
          icon={<Tool />}
          values={pageData}
          viewConfiguration={{
            onSelection: (event) => handleSelection(event.target.value),
            isSelectable: true,
            breakpoints: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 },
          }}
        />
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
          labels={{ pageSizeEntryName: "assets" }}
        />
      </>
    );
  };

  return <ControlledPagination />;
};

CardViewSample.story = {
  parameters: {
    docs: {
      storyDescription: "Pagination controlling CardView's items",
    },
  },
};
