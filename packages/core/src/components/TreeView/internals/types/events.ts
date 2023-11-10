import { SyntheticEvent } from "react";

export interface TreeViewEventLookupElement {
  params: object;
}

export type TreeViewEventListener<E extends TreeViewEventLookupElement> = (
  params: E["params"],
  event: MuiEvent<{}>
) => void;

export type MuiBaseEvent =
  | SyntheticEvent<HTMLElement>
  | DocumentEventMap[keyof DocumentEventMap]
  | {};

export type MuiEvent<E extends MuiBaseEvent = MuiBaseEvent> = E & {
  defaultMuiPrevented?: boolean;
};
