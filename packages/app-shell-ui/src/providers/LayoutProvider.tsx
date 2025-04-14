import { createContext, useContext, useMemo, useState } from "react";

export type LayoutProviderProps = {
  children: React.ReactNode;
};

export interface LayoutContextValue {
  bannerMaxHeight: number;
  setBannerMaxHeight: (height: number) => void;
  verticalNavigationWidth: number;
  setVerticalNavigationWidth: (height: number) => void;
}

export const LayoutContext = createContext<LayoutContextValue>({
  bannerMaxHeight: 0,
  setBannerMaxHeight: () => {
    // Empty function
  },
  verticalNavigationWidth: 0,
  setVerticalNavigationWidth: () => {
    // Empty function
  },
});

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [bannerMaxHeight, setBannerMaxHeight] = useState<number>(0);
  const [verticalNavigationWidth, setVerticalNavigationWidth] =
    useState<number>(0);

  const value = useMemo(
    () => ({
      bannerMaxHeight,
      setBannerMaxHeight,
      verticalNavigationWidth,
      setVerticalNavigationWidth,
    }),
    [bannerMaxHeight, verticalNavigationWidth],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    console.error("LayoutContext was used outside of its Provider");
  }

  return context;
};
