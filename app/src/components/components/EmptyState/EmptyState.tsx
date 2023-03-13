import {
  HvBox,
  HvEmptyState,
  HvTypography,
  useWidth,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

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
