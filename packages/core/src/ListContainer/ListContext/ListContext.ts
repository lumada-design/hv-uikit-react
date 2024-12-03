import { createContext } from "react";

const ListContext = createContext<{
  interactive?: boolean;
  nesting?: number;
  condensed?: boolean;
  selectable?: boolean;
  disableGutters?: boolean;
  topContainerRef?: React.MutableRefObject<HTMLUListElement | null>;
}>({});

ListContext.displayName = "ListContext";

export default ListContext;
