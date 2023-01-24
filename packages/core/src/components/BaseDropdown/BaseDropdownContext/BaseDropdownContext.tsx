import React from "react";

const BaseDropdownContext = React.createContext<{
  width?: number;
  height?: number;
}>({});

BaseDropdownContext.displayName = "BaseDropdownContext";

export default BaseDropdownContext;
