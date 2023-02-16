import pages from "lib/navigation";

export const getActivePath = (
  pathname: string,
  navigation: NavigationData[] | undefined
): NavigationData | undefined => {
  let activePath: NavigationData | undefined;

  if (navigation) {
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
  }

  return activePath;
};

export const isTopLevelPage = (pathname: string): boolean => {
  return !!pages.find((item) => item.path === pathname);
};
