import React, { useState } from "react";
import CardView from "@hv/uikit-react-core/dist/AssetInventory/CardView";
import Pagination from "@hv/uikit-react-core/dist/Pagination";
import ToolIcon from "@hv/uikit-react-icons/dist/Generic/Tool";
import compressorImage from "../card/resources/compressor.png";
import leafImage from "../card/resources/leaf.png";

const createData = num => {
  const variations = [
    { semantic: "sema2", subheader: "Machine", mediaPath: compressorImage },
    { semantic: "sema3", subheader: "Compressor", mediaPath: leafImage }
  ];

  return [...Array(num).keys()].map(id => ({
    id: "id_" + id,
    headerTitle: "Asset Avatar " + (id + 1),
    mediaHeight: 186,
    selected: false,
    ...variations[id % variations.length]
  }));
};

const ControlledPagination = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [data, setData] = useState(createData(64));

  const numPages = Math.ceil(data.length / pageSize);

  const handleSelection = id => {
    const el = data.find(el => el.id === id);
    el.selected = !el.selected;
    el.checkboxSelected = el.selected;
    setData(data);
  };

  const pageData = data.slice(pageSize * page, pageSize * (page + 1));

  return (
    <>
      <CardView
        icon={<ToolIcon />}
        values={pageData}
        viewConfiguration={{
          onSelection: event => handleSelection(event.target.value),
          isSelectable: true,
          breakpoints: { xs: "false", sm: "false", md: 4, lg: 3, xl: 3 }
        }}
      />
      <p />
      <Pagination
        pages={numPages}
        page={page}
        canPrevious={page > 0}
        canNext={page < numPages - 1}
        pageSize={pageSize}
        pageSizeOptions={[3, 6, 12, 24, 48, 200]}
        onPageChange={page => setPage(page)}
        onPageSizeChange={pageSize => setPageSize(pageSize)}
        labels={{ labelEntryType: "assets" }}
      />
    </>
  );
};

export default <ControlledPagination />;
