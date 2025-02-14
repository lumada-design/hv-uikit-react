import { useMemo } from "react";

import { getDocument } from "../utils/document";

/** server-side safe `document.activeElement` wrapper */
const getActiveEl = () => getDocument()?.activeElement || null;

function makeFocusUtils(containerRef: React.RefObject<HTMLElement>) {
  function focus(el?: Element | null, checkFocus = true) {
    if (!checkFocus || containerRef.current?.contains(getActiveEl())) {
      (el as HTMLElement)?.focus();
    }
  }

  return {
    focusPrevious() {
      focus(getActiveEl()?.previousElementSibling);
    },
    focusNext() {
      focus(getActiveEl()?.nextElementSibling);
    },
    focusFirst() {
      focus(getActiveEl()?.parentElement?.firstElementChild);
    },
    focusLast() {
      focus(getActiveEl()?.parentElement?.lastElementChild);
    },
    focusChild(index: number) {
      focus(containerRef.current?.children[index], false);
    },
    focusSibling(index: number) {
      focus(getActiveEl()?.parentElement?.children[index]);
    },
  };
}

export function useFocus({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement>;
}) {
  return useMemo(() => makeFocusUtils(containerRef), [containerRef]);
}
