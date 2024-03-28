import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { HvDashboardProps } from "@hitachivantara/uikit-react-lab";

export interface LayoutConfig
  extends Pick<HvDashboardProps, "layout" | "cols"> {
  items?: {
    id: string;
    type: string;
    label: string;
    predefined?: boolean;
    connected?: boolean;
  }[];
}

export type Layouts = Record<string, LayoutConfig | undefined>;

export interface LayoutsContextValue {
  layouts?: Layouts;
  setLayouts?: Dispatch<SetStateAction<Layouts>>;
}

const LayoutsContext = createContext<LayoutsContextValue>({});

interface LayoutsProviderProps {
  layouts?: Layouts;
  children?: React.ReactNode;
}

export const LayoutsProvider = ({
  children,
  layouts: layoutsProp,
}: LayoutsProviderProps) => {
  const [layouts, setLayouts] = useState<Layouts>(layoutsProp || {});

  const value = useMemo(
    () => ({
      layouts,
      setLayouts,
    }),
    [layouts],
  );

  return (
    <LayoutsContext.Provider value={value}>{children}</LayoutsContext.Provider>
  );
};

export const useLayoutsContext = () => useContext(LayoutsContext);
