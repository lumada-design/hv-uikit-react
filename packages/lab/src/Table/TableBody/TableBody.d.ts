import { StandardProps } from "@material-ui/core";

export type HvTableBodyClassKey = "root";

export type HvTableBodyProps = StandardProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HvTableBodyClassKey
>;

export default function HvTableBody(props: HvTableBodyProps): JSX.Element | null;
