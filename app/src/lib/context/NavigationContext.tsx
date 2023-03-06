import { useMemo, createContext } from "react";

import { Header } from "components/common";
import useNavigation from "lib/hooks/useNavigation";

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

  const value = useMemo(
    () => ({
      navigation,
      activePath,
    }),
    [activePath, navigation]
  );

  return (
    <NavigationContext.Provider value={value}>
      <Header />
      {children}
    </NavigationContext.Provider>
  );
};
