import React from "react";
import SearchBox from "@hv/uikit-react-core/dist/SearchBox";

const suggestionHandler = value => {
  let random = Math.random()
    .toString(36)
    .substring(7);
  if (typeof value === "string" && value !== "") {
    return [
      {
        id: "2",
        label: `${value} first suggestion`
      },
      {
        id: "3",
        label: `${value} second suggestion`
      },
      {
        id: "4",
        label: `${random} second suggestion`
      }
    ];
  } else {
    return null;
  }
};

export default (
  <SearchBox
    suggestionListCallback={suggestionHandler}
    suggestionSelectedCallback={item => alert(item.label + " selected")}
    onSubmit={value => alert(value + " submitted")}
    disabled
  />
);
