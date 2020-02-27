import React from "react";
import SearchBox from "@hv/uikit-react-core/dist/SearchBox";

export default <SearchBox onSubmit={value => alert(value + " submitted")} />;
