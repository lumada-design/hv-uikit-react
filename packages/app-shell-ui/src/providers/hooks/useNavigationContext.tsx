import { useContext } from "react";

import { NavigationContext } from "../NavigationProvider";

const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    console.error("NavigationContext was used outside of its Provider");
  }

  return context;
};

export default useNavigationContext;
