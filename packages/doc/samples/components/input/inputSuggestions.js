import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";
import RawSearch from "@hv/uikit-react-icons/dist/Generic/Search";

const labels = {
  placeholder: "Search",
  infoText: "Info",
  inputLabel: "Search",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

const suggestionHandler = value => {
  let random = Math.random().toString(36).substring(7);
  if (typeof value === 'string' && value !== "") {
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

const styles = {
    padding: "7px",
    width: "30px",
    height: "30px"
}

const Search = () => <RawSearch boxStyles={styles} />

export default (
  <HvInput
    labels={labels}
    id="test"
    suggestionListCallback={suggestionHandler}
    suggestionSelectedCallback={item=>console.log(item.label + " selected")}
    customFixedIcon={<Search />}
  />
);
