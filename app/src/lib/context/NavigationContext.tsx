import { useMemo, createContext } from "react";

import { Header } from "components/navigation";
import useNavigation from "lib/hooks/useNavigation";

export const NavigationContext = createContext<NavigationContextValue>({
  navigation: [],
  activePath: undefined,
});

export const NavigationProvider = ({ children, navigation }) => {
  const { activePath } =
    useNavigation(navigation);

  const value = useMemo(
    () => ({
      navigation,
      activePath,
    }),
    [
      activePath,
      navigation,
    ]
  );

  return (
    <NavigationContext.Provider value={value}>
      <Header />
      {children}
    </NavigationContext.Provider>
  );
};
