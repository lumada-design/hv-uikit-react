import { FunctionComponent, ReactNode } from "react";

export interface ControlsProps extends FunctionComponent {
  onViewChange?: () => null;
  onSearchChange?: () => null;
  rightControls?: ReactNode;
  leftControls?: ReactNode;
  rightControlsProps?: object;
  leftControlsProps?: object;
  data: object[];
  columns: object[];
}

export default function HvControls(props: ControlsProps): JSX.Element | null;
