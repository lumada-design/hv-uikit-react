import React, { useState } from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";
import HvDatePicker from "@hv/uikit-react-core/dist/DatePicker";

const inputStyle = {
  marginBottom: "20px",
  width: "150px"
};

function WrapperComp() {
  const [locale, setLocale] = useState("pt-PT");

  return (
    <>
      <HvInput
        labels={{ inputLabel: "Locale" }}
        type="text"
        value={locale}
        style={inputStyle}
        onChange={value => {
          setLocale(value);
        }}
      />
      <HvDatePicker locale={locale} id="DatePicker" />
    </>
  );
}

export default <WrapperComp />;
