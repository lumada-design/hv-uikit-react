import { createContext, useContext, useMemo } from "react";

import { useNavigation } from "~/lib/hooks/useNavigation";

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
    [activePath, navigation],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within a NavigationProvider",
    );
  }
  return context;
}
