import { useContext } from "react";

import { LayoutContext } from "../LayoutProvider";

const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (context === undefined) {
    console.error("LayoutContext was used outside of its Provider");
  }

  return context;
};

export default useLayoutContext;
