import { useStore } from "reactflow";
import {
  HvEmptyState,
  HvEmptyStateProps,
} from "@hitachivantara/uikit-react-core";

import { useClasses } from "./Empty.styles";

export interface HvFlowEmptyProps extends HvEmptyStateProps {}

export const HvFlowEmpty = ({ className, ...others }: HvFlowEmptyProps) => {
  const { classes, cx } = useClasses();
  const nodes = useStore((state) => state.getNodes());
  return (
    !nodes ||
    (nodes.length === 0 ? (
      <HvEmptyState className={cx(classes.root, className)} {...others} />
    ) : null)
  );
};
