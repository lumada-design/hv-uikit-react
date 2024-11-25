import { Link } from "react-router-dom";
import { HvButton, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

export const Component = () => {
  return (
    <HvEmptyState
      classes={{
        root: "items-center",
        textContainer: "overflow-visible",
      }}
      title="404 Page not found"
      message="The page you followed may be broken or item has been removed."
      icon={<Info />}
      action={
        <HvButton variant="primaryGhost" component={Link} to="/">
          Click here to go back.
        </HvButton>
      }
    />
  );
};
