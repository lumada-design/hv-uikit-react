import * as React from "react";
import { StandardProps } from "@material-ui/core";

export type HvDotPaginationClassKey = "root";

export type HvDotPaginationProps = StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  HvDotPaginationClassKey
>;

export default function HvDotPagination(props: HvDotPaginationProps): JSX.Element | null;
