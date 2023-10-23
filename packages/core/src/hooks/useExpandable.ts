import { useControlled } from "@core/hooks/useControlled";

export const useExpandable = (
  isOpenProp,
  defaultExpanded,
  onToggle,
  contentId
) => {
  const [isOpen, setIsOpen] = useControlled(isOpenProp, defaultExpanded);

  const toggle = (event) => {
    setIsOpen((o) => !o);
    onToggle(event, !isOpen);
  };

  const ariaProps = {
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? null : contentId,
    "aria-label": isOpen ? "Collapse" : "Expand",
  };

  return { isOpen, toggle, ariaProps };
};
