import { useContext } from "react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { HazyDay } from "@hitachivantara/uikit-react-icons";

import { DefaultAppContext } from "../../providers/DefaultAppProvider";

export default function ChangeContextValue() {
  const { setText } = useContext(DefaultAppContext);

  return (
    <HvButton
      icon
      variant="secondaryGhost"
      aria-label="Change default-app context value from default-app"
      onClick={() => {
        setText("Change default-app context value from default-app");
      }}
    >
      <HazyDay />
    </HvButton>
  );
}
