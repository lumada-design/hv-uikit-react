import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Type an animal name",
  infoText: "A living organism that feeds on organic matter",
  inputLabel: "What's your favorite animal?"
};

export default (
  <HvInput labels={labels} showInfo={false} />
);
