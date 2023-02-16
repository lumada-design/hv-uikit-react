import {
  HvBox,
  HvEmptyState,
  HvTypography,
  useWidth,
} from "@hitachivantara/uikit-core";
import { Info } from "@hitachivantara/uikit-icons";

export const EmptyState = () => {
  const width = useWidth();

  return (
    <HvBox>
      <HvTypography variant="body">Current Width: {width}</HvTypography>
      <HvEmptyState
        icon={<Info />}
        message="After you start adding Data Routes, they will appear here."
        title="No data routes"
      />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  EmptyState.displayName = "EmptyState";
}
