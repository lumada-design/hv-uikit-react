import React from "react";
import { Fail, Success } from "@hv/uikit-react-icons/dist";

const iconVariants = variant => {
  switch (variant) {
    case "success":
      return <Success iconSize="S" color="sema1" />;
    case "error":
      return <Fail iconSize="S" color="sema4" />;
    default:
      return null;
  }
};

export default iconVariants;
