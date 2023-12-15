import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getActivePath = (
  pathname: string,
  navigation?: NavigationData[]
) => {
  let activePath: NavigationData | undefined;

  if (!navigation) return undefined;

  for (let i = 0; i < navigation.length; i += 1) {
    if (activePath) break;

    const hasPath = pathname?.includes(navigation[i].path || "");

    if (hasPath) {
      if (pathname === navigation[i].path) {
        activePath = { ...navigation[i] };
      } else {
        activePath = navigation[i].data
          ? getActivePath(pathname, navigation[i].data)
          : { ...navigation[i] };
      }
    }
  }

  return activePath;
};

export const useNavigation = (
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
