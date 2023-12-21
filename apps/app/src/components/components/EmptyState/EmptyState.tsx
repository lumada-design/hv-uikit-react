import { HvBox, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

export const EmptyState = () => {
  return (
    <HvBox>
      <HvEmptyState
        icon={<Info />}
        message="After you start adding Data Routes, they will appear here."
        title="No data routes"
      />
    </HvBox>
  );
};
