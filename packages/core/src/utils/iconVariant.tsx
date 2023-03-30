import React from "react";
import {
  Fail,
  Success,
  Caution,
  Info,
} from "@hitachivantara/uikit-react-icons";

const iconVariant = (variant, color, semantic) => {
  switch (variant) {
    case "success":
      return <Success color={color} semantic={semantic && "positive"} />;
    case "warning":
      return <Caution color={color} semantic={semantic && "warning"} />;
    case "error":
      return <Fail color={color} semantic={semantic && "negative"} />;
    case "info":
      return <Info color={color} />;
    default:
      return null;
  }
};

export default iconVariant;
