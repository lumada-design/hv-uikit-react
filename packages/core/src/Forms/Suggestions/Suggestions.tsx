import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import {
  ClickAwayListener,
  ClickAwayListenerProps,
} from "@mui/base/ClickAwayListener";
import { Popper } from "@mui/base/Popper";
import { useForkRef } from "@mui/material/utils";
import { useTheme, type ExtractNames } from "@hitachivantara/uikit-react-utils";

import { HvListItem } from "../../ListContainer";
import { HvSelectionList } from "../../SelectionList";
import { HvBaseProps } from "../../types/generic";
import { getContainerElement } from "../../utils/document";
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
  /**
   * Whether suggestions is visible.
   * @deprecated use `open` instead.
   * */
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
  /**
   * If enabled, the suggestions list will be rendered using a portal.
   * If disabled, it will be under the DOM hierarchy of the parent component.
   * @default false
   * */
  enablePortal?: boolean;
}

export const HvSuggestions = forwardRef((props: HvSuggestionsProps, extRef) => {
  const {
    id,
    className,
    classes: classesProp,
    expanded = false,
    enablePortal = false,
    open: openProp,
    anchorEl,
    suggestionValues = [],
    onClose,
    onSuggestionSelected,
    ...others
  } = props;

  const { classes, cx } = useClasses(classesProp);

  const { rootId } = useTheme();

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
        <Popper
          style={{
            // @ts-ignore
            "--popper-width": enablePortal
              ? `${anchorEl?.clientWidth}px`
              : "100%",
          }}
          open={openProp ?? isOpen}
          disablePortal={!enablePortal}
          container={enablePortal ? getContainerElement(rootId) : undefined}
          anchorEl={anchorEl}
          className={cx(classes.popper, {
            [classes.portal]: enablePortal,
          })}
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
        </Popper>
      </ClickAwayListener>
    </div>
  );
});
