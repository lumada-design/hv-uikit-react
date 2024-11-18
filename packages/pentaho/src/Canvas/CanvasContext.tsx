import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type HvCanvasContextValue = {
  sidePanelOpen: boolean;
  handleSidePanelOpen: (open: boolean) => void;
  sidePanelWidth: number;
  handleSidePanelWidth: (width: number) => void;
};

export const HvCanvasContext = createContext<HvCanvasContextValue | null>(null);

export const HvCanvasProvider = ({
  children,
}: {
  children: React.ReactNode;
  onSidePanelResize?: (width: number) => void;
}) => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const handleSidePanelWidth = useCallback((newWidth: number) => {
    setWidth(newWidth);
  }, []);

  const handleSidePanelOpen = useCallback((open: boolean) => {
    setSidePanelOpen(open);
  }, []);

  const value = useMemo(
    () => ({
      sidePanelOpen,
      handleSidePanelOpen,
      sidePanelWidth: sidePanelOpen ? width : 0,
      handleSidePanelWidth,
    }),
    [sidePanelOpen, handleSidePanelOpen, width, handleSidePanelWidth],
  );

  return (
    <HvCanvasContext.Provider value={value}>
      {children}
    </HvCanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  return useContext(HvCanvasContext);
};
