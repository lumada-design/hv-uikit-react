import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getActivePath } from "lib/utils/navigation";

const useNavigation = (
  navigationData: NavigationData[] = []
): NavigationContextValue => {
  const { pathname } = useLocation();
  const initialPath = getActivePath(pathname, navigationData);
  const [activePath, setActivePath] = useState(initialPath);

  useEffect(() => {
    const path = getActivePath(pathname, navigationData);
    setActivePath(path);
  }, [pathname, navigationData]);

  return {
    activePath,
  };
};

export default useNavigation;
