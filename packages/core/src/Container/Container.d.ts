import { ContainerProps, StandardProps } from "@material-ui/core";

export type HvContainerClassKey =
  | "root"
  | "disableGutters"
  | "fixed"
  | "maxWidthXs"
  | "maxWidthSm"
  | "maxWidthMd"
  | "maxWidthLg"
  | "maxWidthXl";

export type HvContainerProps = StandardProps<ContainerProps, HvContainerClassKey>
export default function HvContainer(props: HvContainerProps): JSX.Element | null;
