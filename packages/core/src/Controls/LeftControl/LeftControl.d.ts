import { FunctionComponent, ReactNode } from "react";

export interface LeftControlProps extends FunctionComponent {
  children?: ReactNode;
  placeholder: string;
  onSearchChange?: () => null;
  search?: boolean;
}

export default function HvRightControl(props: LeftControlProps): JSX.Element | null;
