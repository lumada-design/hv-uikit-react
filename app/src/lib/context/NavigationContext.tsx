import { useMemo, createContext } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "~/components/common/Header";
import useNavigation from "~/lib/hooks/useNavigation";

interface NavigationProviderProps {
  children: React.ReactNode;
  navigation: NavigationData[];
}

export const NavigationContext = createContext<NavigationContextValue>({
  navigation: [],
  activePath: undefined,
});

export const NavigationProvider = ({
  children,
  navigation,
}: NavigationProviderProps) => {
  const { activePath } = useNavigation(navigation);

  const { pathname } = useLocation();

  const value = useMemo(
    () => ({
      navigation,
      activePath,
    }),
    [activePath, navigation]
  );

  return (
    <NavigationContext.Provider value={value}>
      {pathname !== "/dashboard-preview" && <Header />}
      {children}
    </NavigationContext.Provider>
  );
};
