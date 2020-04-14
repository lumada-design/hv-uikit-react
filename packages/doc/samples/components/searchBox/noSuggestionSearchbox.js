import React from "react";
import SearchBox from "@hv/uikit-react-core/dist/SearchBox";

export default <SearchBox onSubmit={(event, value) => alert(`${value} submitted`)} />;
