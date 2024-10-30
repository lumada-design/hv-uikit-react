import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";

interface BaseDropdownValue {
  popperPlacement?: Placement;
  popper?: ReturnType<typeof usePopper>;
  referenceElement: HTMLElement | null;
  setReferenceElement?: Dispatch<SetStateAction<HTMLElement | null>>;
  popperElement: HTMLElement | null;
  setPopperElement?: Dispatch<SetStateAction<HTMLElement | null>>;
}

export const BaseDropdownContext = createContext<BaseDropdownValue>({
  referenceElement: null,
  popperElement: null,
});

BaseDropdownContext.displayName = "BaseDropdownContext";

export const useBaseDropdownContext = () => useContext(BaseDropdownContext);
