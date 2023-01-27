import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { HvBaseProps } from "../../../types";
import {
  StyledRoot,
  StyledSelectionList,
  StyledPopper,
} from "./Suggestions.styles";
import { setId } from "../../../utils";
import { HvFormElementContext } from "../FormElement";
import { HvListItem } from "components";
import { useClickOutside } from "hooks";
import { suggestionsClasses, HvSuggestionsClasses } from ".";

export type HvSuggestion = {
  id?: string;
  label: React.ReactNode;
  value?: any;
  disabled?: boolean;
};

export type HvSuggestionsProps = HvBaseProps & {
  /** Whether suggestions is visible. */
  expanded?: boolean;
  /** The HTML element Suggestions attaches to. */
  anchorEl?: HTMLElement;
  /** Array of { id, label, ...others } values to display in the suggestion list */
  suggestionValues: HvSuggestion[] | null;
  /** Function called when suggestion list is closed */
  // onClose: Function,
  /** Function called when a suggestion is selected */
  onSuggestionSelected?: Function;
  /** Function called when suggestion list is closed */
  onClose?: Function;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: HvSuggestionsClasses;
};

export const HvSuggestions = ({
  id,
  className,
  classes,
  expanded = false,
  anchorEl,
  suggestionValues = [],
  onClose,
  onSuggestionSelected,
  ...others
}: HvSuggestionsProps) => {
  const { elementId } = useContext(HvFormElementContext);
  const localId = id ?? setId(elementId, "suggestions");

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(expanded);

  useClickOutside(ref, (e) => {
    setIsOpen(false);
    onClose?.(e);
  });

  useEffect(() => {
    setIsOpen(expanded);
  }, [expanded]);

  return (
    <StyledRoot
      id={localId}
      ref={ref}
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
};
