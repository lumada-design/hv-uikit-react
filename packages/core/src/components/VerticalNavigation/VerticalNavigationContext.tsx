import { createContext } from "react";
import { NavigationData, HvVerticalNavigationMode } from "./";

interface VerticalNavigationContextValue {
  isOpen: boolean;
  collapsedMode: HvVerticalNavigationMode;
  slider?: boolean;
  headerTitle?: string;
  setHeaderTitle?: React.Dispatch<React.SetStateAction<string | undefined>>;

  parentItem?;
  withParentData?;
  navigateToChildHandler?: (event, item) => void;
  navigateToParentHandler?: () => void;

  parentData?: NavigationData[];
  setParentData?: React.Dispatch<React.SetStateAction<any>>;
  parentSelected?;
  setParentSelected?: React.Dispatch<React.SetStateAction<any>>;
}

const VerticalNavigationContext = createContext<VerticalNavigationContextValue>(
  {
    isOpen: true,
    collapsedMode: "simple",
    slider: false,
  }
);

export { VerticalNavigationContext };
