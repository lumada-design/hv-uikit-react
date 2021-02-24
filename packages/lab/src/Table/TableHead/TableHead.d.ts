import { StandardProps } from "@material-ui/core";

export type HvTableHeadClassKey = "root";

export type HvTableHeadProps = StandardProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HvTableHeadClassKey
>;

export default function HvTableHead(props: HvTableHeadProps): JSX.Element | null;
