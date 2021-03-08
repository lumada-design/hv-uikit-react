import { StandardProps } from "@material-ui/core";

export type HvTableClassKey = "root";

export type HvTableProps = StandardProps<React.HTMLAttributes<HTMLTableElement>, HvTableClassKey>;

export default function HvTable(props: HvTableProps): JSX.Element | null;
