import { StandardProps } from "@mui/material";

export type HvControlsClassKey = "root" | "rightSection" | "leftSection";

export interface HvControlsSortValue {
  id: string;
  desc: string;
}
export interface HvControlsViewConfiguration extends Record<string, unknown> {
  setSortBy?: (v: HvControlsSortValue[]) => void;
  setGlobalFilter?: (v: string) => void;
}

export interface HvControlsCallbacks extends Record<string, unknown> {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface HvControlsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvControlsClassKey> {
  /** Children to be rendered. */
  id?: string;
  /**
   * Class names to be applied.
   */
  className?: string;
  /**
   * An instance of useHvTable or useTable used to manage the data
   * if this is not provided data sorting and search must be handled externally
   */
  callbacks?: HvControlsCallbacks;
  /**
   * Views configuration required for the view buttons
   */
  views?: HvControlsViewConfiguration[];
  /**
   * What view is selected by default
   */
  defaultView?: string;
  /**
   * Sets the selected view to be the one specified
   * if specified the component is in a controlled state and it won't change it state
   * unless specified externally
   */
  selectedView?: string;
  /**
   * Callback called when the view switcher button is pressed
   */
  onViewChange?: (event: Event, id: string) => void;
  /**
   * if `true` the button to switch views is not rendered
   */
  hideViewSwitcher?: boolean;
}

export default function HvControls(props: HvControlsProps): JSX.Element | null;
