import React, { useState } from "react";
import HvRadio from "@hv/uikit-react-core/dist/Selectors/RadioButton";

const valueA = "a";
const valueB = "b";
const nothing = "";

const CheckboxStateManager = () => {
  const [checkedRadio, setCheckedRadio] = useState(valueA);

  const onChangeRadio = value => () => {
    setCheckedRadio(checkedRadio !== value ? value : nothing);
  };

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <HvRadio
        id="radio1"
        label="Radio 1"
        checked={checkedRadio === valueA}
        onChange={onChangeRadio(valueA)}
      />
      <HvRadio
        id="radio2"
        label="Radio 2"
        checked={checkedRadio === valueB}
        onChange={onChangeRadio(valueB)}
      />
    </div>
  );
};

export default <CheckboxStateManager />;
