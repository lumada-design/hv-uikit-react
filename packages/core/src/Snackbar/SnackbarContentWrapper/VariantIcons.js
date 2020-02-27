import React from "react";
import Success from "@hv/uikit-react-icons/dist/Generic/Success";
import Error from "@hv/uikit-react-icons/dist/Generic/Fail";

const variantIcon = variant => {
  switch (variant) {
    case "success":
      return <Success iconSize="S" semantic="sema1" />;
    case "error":
      return <Error iconSize="S" semantic="sema4" />;
    default:
      return null;
  }
};

export default variantIcon;
