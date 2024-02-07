import React from "react";

const ListContext = React.createContext<{
  interactive?: boolean;
  nesting?: number;
  condensed?: boolean;
  selectable?: boolean;
  disableGutters?: boolean;
  topContainerRef?: React.MutableRefObject<HTMLUListElement | null>;
}>({});

ListContext.displayName = "ListContext";

export default ListContext;
