import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { usePopper } from "react-popper";

interface BaseDropdownValue {
  width?: number;
  height?: number;
  popperPlacement?: string;
  popper?: ReturnType<typeof usePopper>;
  referenceElement: HTMLElement | null;
  setReferenceElement?: Dispatch<SetStateAction<HTMLElement | null>>;
  popperElement: HTMLElement | null;
  setPopperElement?: Dispatch<SetStateAction<HTMLElement | null>>;
}

const BaseDropdownContext = createContext<BaseDropdownValue>({
  referenceElement: null,
  popperElement: null,
});

BaseDropdownContext.displayName = "BaseDropdownContext";

export const useBaseDropdownContext = () => useContext(BaseDropdownContext);

export default BaseDropdownContext;
