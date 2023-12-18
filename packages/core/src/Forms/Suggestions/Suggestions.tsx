import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import MuiPopper from "@mui/material/Popper";
import { useForkRef } from "@mui/material/utils";

import { HvBaseProps } from "@core/types/generic";
import { setId } from "@core/utils/setId";
import { HvListItem } from "@core/ListContainer";
import {
  HvClickOutsideEvent,
  useClickOutside,
} from "@core/hooks/useClickOutside";
import { ExtractNames } from "@core/utils/classes";
import { HvSelectionList } from "@core/SelectionList";

import { staticClasses, useClasses } from "./Suggestions.styles";
import { HvFormElementContext } from "../FormElement";

export { staticClasses as suggestionsClasses };

export type HvSuggestionsClasses = ExtractNames<typeof useClasses>;

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
    classes: classesProp,
    expanded = false,
    anchorEl,
    suggestionValues = [],
    onClose,
    onSuggestionSelected,
    ...others
  } = props;
  const { classes, cx } = useClasses(classesProp);

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
    <div
      id={localId}
      ref={forkedRef}
      className={cx(classes.root, className)}
      {...others}
    >
      <MuiPopper
        open={isOpen}
        disablePortal
        anchorEl={anchorEl}
        className={classes.popper}
      >
        <HvSelectionList
          className={classes.list}
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
        </HvSelectionList>
      </MuiPopper>
    </div>
  );
});
