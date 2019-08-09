import React, { useState } from "react";
import HvSearchBox from "@hv/uikit-react-lab/dist/SearchBox";
import HvButton from "@hv/uikit-react-core/dist/Button";

const list = ["Adam", "Andy", "Carol"];

const WrapperWithList = () => {
  const [value, setValue] = useState("");

  const filter = () =>
    value !== ""
      ? list.filter(word => word.toLowerCase().includes(value))
      : list;

  return (
    <>
      <HvButton onClick={() => setValue("")} style={{ marginBottom: "20px" }}>
        Reset
      </HvButton>

      <HvSearchBox
        onChange={val => setValue(val.toLowerCase())}
        searchInput={value}
      />
      {filter().map(item => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
};

export default <WrapperWithList />;
