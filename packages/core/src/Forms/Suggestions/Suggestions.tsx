import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import {
  ClickAwayListener,
  ClickAwayListenerProps,
} from "@mui/base/ClickAwayListener";
import { Popper as MuiPopper } from "@mui/base/Popper";
import { useForkRef } from "@mui/material/utils";
import { type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { HvListItem } from "../../ListContainer";
import { HvSelectionList } from "../../SelectionList";
import { HvBaseProps } from "../../types/generic";
import { setId } from "../../utils/setId";
import { HvFormElementContext } from "../FormElement";
import { staticClasses, useClasses } from "./Suggestions.styles";

export { staticClasses as suggestionsClasses };

export type HvSuggestionsClasses = ExtractNames<typeof useClasses>;

export interface HvSuggestion {
  id?: string;
  label: React.ReactNode;
  value?: string;
  disabled?: boolean;
}

export interface HvSuggestionsProps extends HvBaseProps {
  /** Whether suggestions is visible */
  open?: boolean;
  /** Whether suggestions is visible. @deprecated use `open` instead */
  expanded?: boolean;
  /** The HTML element Suggestions attaches to. */
  anchorEl?: HTMLElement | null;
  /** Array of { id, label, ...others } values to display in the suggestion list */
  suggestionValues?: HvSuggestion[] | null;
  /** Function called when a suggestion is selected */
  onSuggestionSelected?: (event: React.MouseEvent, value: HvSuggestion) => void;
  /** Function called when suggestion list is closed */
  onClose?: ClickAwayListenerProps["onClickAway"];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvSuggestionsClasses;
}

export const HvSuggestions = forwardRef((props: HvSuggestionsProps, extRef) => {
  const {
    id,
    className,
    classes: classesProp,
    expanded = false,
    open: openProp,
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

  // TODO: remove controlled+uncontrolled `expanded` prop in v6
  const [isOpen, setIsOpen] = useState(expanded);
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
      <ClickAwayListener
        onClickAway={(event) => {
          setIsOpen(false);
          onClose?.(event);
        }}
      >
        <MuiPopper
          open={openProp ?? isOpen}
          disablePortal
          anchorEl={anchorEl}
          className={classes.popper}
        >
          <HvSelectionList
            className={classes.list}
            id={setId(localId, "list")}
            onChange={onSuggestionSelected}
          >
            {suggestionValues?.map((item) => (
              <HvListItem key={item.id} value={item} disabled={item.disabled}>
                {item.label}
              </HvListItem>
            ))}
          </HvSelectionList>
        </MuiPopper>
      </ClickAwayListener>
    </div>
  );
});
