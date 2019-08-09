import React, { useState } from "react";
import HvSearchBox from "@hv/uikit-react-lab/dist/SearchBox";

const list = ["Adam", "Andy", "Carol"];

const WrapperWithList = () => {
  const [value, setValue] = useState("");

  const filter = () =>
    value !== ""
      ? list.filter(word => word.toLowerCase().includes(value))
      : list;

  return (
    <>
      <HvSearchBox onChange={val => setValue(val.toLowerCase())} />
      {filter().map(item => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
};

export default <WrapperWithList />;
