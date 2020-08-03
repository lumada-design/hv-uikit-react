import React from "react";
import { useTheme } from "@material-ui/core";
import { Fail, Success, Caution } from "@hv/uikit-react-icons/dist";

const iconVariant = (variant, monochrome = false) => {
  const Icon = () => {
    const theme = useTheme();

    switch (variant) {
      case "success":
        return (
          <Success iconSize="S" color={monochrome ? theme.hv.palette.accent.acce1 : "sema4"} />
        );
      case "warning":
        return (
          <Caution iconSize="S" color={monochrome ? theme.hv.palette.accent.acce1 : "sema20"} />
        );
      case "error":
        return <Fail iconSize="S" color={monochrome ? theme.hv.palette.accent.acce1 : "sema4"} />;
      default:
        return null;
    }
  };

  return <Icon />;
};

export default iconVariant;
