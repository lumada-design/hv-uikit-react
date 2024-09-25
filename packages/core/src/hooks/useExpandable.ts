import type { HvAccordionProps } from "../Accordion";
import { setId } from "../utils/setId";
import { useControlled } from "./useControlled";
import { useUniqueId } from "./useUniqueId";

export interface UseExpandableParams
  extends Pick<
    HvAccordionProps,
    "id" | "disabled" | "expanded" | "defaultExpanded"
  > {}

/** expandable hook that handles a11y & open state for accordions, etc. */
export function useExpandable({
  id: idProp,
  disabled,
  expanded,
  defaultExpanded,
}: UseExpandableParams) {
  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));

  const id = useUniqueId(idProp);
  const buttonId = setId(id, "button");
  const regionId = setId(id, "container");

  return {
    isOpen,
    toggleOpen: (newOpen?: boolean) => setIsOpen((o) => newOpen ?? !o),
    buttonProps: {
      id: buttonId,
      "aria-disabled": disabled,
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? regionId : undefined,
    },
    regionProps: {
      id: regionId,
      role: "region",
      "aria-labelledby": buttonId,
    },
  };
}
