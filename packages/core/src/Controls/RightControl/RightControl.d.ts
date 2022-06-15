import { FunctionComponent, ReactNode } from "react";

type TValues = {
  id: string;
  label: string;
  selected?: boolean;
};

export interface RightControlProps extends FunctionComponent {
  children?: ReactNode;
  values: TValues;
  onChangeView?: () => null;
  onChangeSort?: () => null;
  sortBy?: boolean;
  viewSelect?: boolean;
}

export default function HvRightControl(props: RightControlProps): JSX.Element | null;
