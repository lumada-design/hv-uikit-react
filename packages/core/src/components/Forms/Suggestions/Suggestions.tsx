import { clsx } from "clsx";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForkRef } from "@mui/material";
import { HvBaseProps } from "@core/types";
import { setId } from "@core/utils";
import {
  StyledRoot,
  StyledSelectionList,
  StyledPopper,
} from "./Suggestions.styles";
import { HvFormElementContext } from "../FormElement";
import { HvListItem } from "../../ListContainer/ListItem";
import { HvClickOutsideEvent, useClickOutside } from "../../../hooks";
import suggestionsClasses, { HvSuggestionsClasses } from "./suggestionsClasses";

export interface HvSuggestion {
  id?: string;
  label: React.ReactNode;
  value?: string;
  disabled?: boolean;
}

export interface HvSuggestionsProps extends HvBaseProps {
  /** Whether suggestions is visible. */
  expanded?: boolean;
  /** The HTML element Suggestions attaches to. */
  anchorEl?: HTMLElement | null;
  /** Array of { id, label, ...others } values to display in the suggestion list */
  suggestionValues?: HvSuggestion[] | null;
  /** Function called when a suggestion is selected */
  onSuggestionSelected?: (event: React.MouseEvent, value: HvSuggestion) => void;
  /** Function called when suggestion list is closed */
  onClose?: (event: HvClickOutsideEvent) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSuggestionsClasses;
}

export const HvSuggestions = forwardRef((props: HvSuggestionsProps, extRef) => {
  const {
    id,
    className,
    classes,
    expanded = false,
    anchorEl,
    suggestionValues = [],
    onClose,
    onSuggestionSelected,
    ...others
  } = props;
  const { elementId } = useContext(HvFormElementContext);
  const localId = id ?? setId(elementId, "suggestions");

  const ref = useRef<HTMLDivElement>(null);
  const forkedRef = useForkRef(ref, extRef);

  const [isOpen, setIsOpen] = useState(expanded);

  useClickOutside(ref, (event) => {
    setIsOpen(false);
    onClose?.(event);
  });

  useEffect(() => {
    setIsOpen(expanded);
  }, [expanded]);

  return (
    <StyledRoot
      id={localId}
      ref={forkedRef}
      className={clsx(className, suggestionsClasses.root, classes?.root)}
      {...others}
    >
      <StyledPopper
        open={isOpen}
        disablePortal
        anchorEl={anchorEl}
        className={clsx(suggestionsClasses.popper, classes?.popper)}
      >
        <StyledSelectionList
          className={clsx(suggestionsClasses.list, classes?.list)}
          id={setId(localId, "list")}
          onChange={onSuggestionSelected}
        >
          {suggestionValues?.map((item, i) => {
            const itemKey = item.id || setId("item", i);

            return (
              <HvListItem
                key={itemKey}
                value={item}
                disabled={item.disabled || undefined}
              >
                {item.label}
              </HvListItem>
            );
          })}
        </StyledSelectionList>
      </StyledPopper>
    </StyledRoot>
  );
});
