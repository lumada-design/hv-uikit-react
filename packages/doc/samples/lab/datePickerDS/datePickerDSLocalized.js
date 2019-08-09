import React, { useState } from "react";
import HvDatePickerDS from "@hv/uikit-react-lab/dist/DatePickerDS";

const inputStyle = {
  margin: "10px"
};

function WrapperComp() {
  const [locale, setLocale] = useState("pt-PT");

  return (
    <>
      Locale:
      <input
        type="text"
        value={locale}
        style={inputStyle}
        onChange={evt => {
          setLocale(evt.target.value);
        }}
      />
      <HvDatePickerDS locale={locale} />
    </>
  );
}

export default <WrapperComp />;
