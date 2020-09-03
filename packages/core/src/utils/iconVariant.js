import React from "react";
import { Fail, Success, Caution, Info } from "@hv/uikit-react-icons/dist";

const iconVariant = (variant, monochrome = false) => {
  const Icon = () => {
    switch (variant) {
      case "success":
        return <Success iconSize="S" color={monochrome ? "acce1" : "sema4"} />;
      case "warning":
        return <Caution iconSize="S" color={monochrome ? "acce1" : "sema20"} />;
      case "error":
        return <Fail iconSize="S" color={monochrome ? "acce1" : "sema4"} />;
      case "info":
        return <Info iconSize="S" color="acce1" />;
      default:
        return null;
    }
  };

  return <Icon />;
};

export default iconVariant;
