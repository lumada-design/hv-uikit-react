import { useMemo } from "react";

interface UseFocusParams {
  containerRef: React.RefObject<HTMLElement>;
}

function containsFocus(el?: Element | null) {
  return el?.contains(document.activeElement);
}

function makeFocusUtils(containerRef: React.RefObject<HTMLElement>) {
  function focus(el?: Element | null, checkFocus = true) {
    if (checkFocus && !containsFocus(containerRef.current)) {
      return;
    }
    (el as HTMLElement)?.focus();
  }

  return {
    focus: () => focus(containerRef.current),
    focusPrevious() {
      focus(document.activeElement?.previousElementSibling);
    },
    focusNext() {
      focus(document.activeElement?.nextElementSibling);
    },
    focusFirst() {
      focus(document.activeElement?.parentElement?.firstElementChild);
    },
    focusLast() {
      focus(document.activeElement?.parentElement?.lastElementChild);
    },
    focusChild(index: number) {
      focus(containerRef.current?.children[index], false);
    },
    focusSibling: (index: number) => {
      focus(document.activeElement?.parentElement?.children[index]);
    },
  };
}

export function useFocus({ containerRef }: UseFocusParams) {
  return useMemo(() => makeFocusUtils(containerRef), [containerRef]);
}
