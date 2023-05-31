import { createContext } from "react";
import { NavigationData } from ".";

interface VerticalNavigationContextValue {
  isOpen: boolean;
  useIcons: boolean;
  slider?: boolean;
  headerTitle?: string;
  setHeaderTitle?: React.Dispatch<React.SetStateAction<string | undefined>>;

  parentItem?;
  setParentItem?: React.Dispatch<React.SetStateAction<any>>;
  withParentData?;
  navigateToChildHandler?: (event, item) => void;
  navigateToParentHandler?: () => void;

  parentData?: NavigationData[];
  setParentData?: React.Dispatch<React.SetStateAction<any>>;
  parentSelected?;
  setParentSelected?: React.Dispatch<React.SetStateAction<any>>;

  hasAnyChildWithData?: boolean;
}

const VerticalNavigationContext = createContext<VerticalNavigationContextValue>(
  {
    isOpen: true,
    useIcons: false,
    slider: false,
  }
);

export { VerticalNavigationContext };
