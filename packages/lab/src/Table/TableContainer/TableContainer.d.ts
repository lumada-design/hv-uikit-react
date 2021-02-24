import { StandardProps } from "@material-ui/core";

export type HvTableContainerClassKey = "root";

export type HvTableContainerProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvTableContainerClassKey
>;

export default function HvTableContainer(props: HvTableContainerProps): JSX.Element | null;
