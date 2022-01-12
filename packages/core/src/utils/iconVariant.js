import React from "react";
import { Fail, Success, Caution, Info } from "@hitachivantara/uikit-react-icons";

const iconVariant = (variant, color, semantic) => {
  switch (variant) {
    case "success":
      return <Success color={color} semantic={semantic && "sema1"} />;
    case "warning":
      return <Caution color={color} semantic={semantic && "sema3"} />;
    case "error":
      return <Fail color={color} semantic={semantic && "sema4"} />;
    case "info":
      return <Info color={color} />;
    default:
      return null;
  }
};

export default iconVariant;
