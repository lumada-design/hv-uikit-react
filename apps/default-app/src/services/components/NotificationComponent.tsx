import { RocketLaunchIcon } from "@phosphor-icons/react";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { NotificationComponentProps } from "../types";

const NotificationComponent = ({
  message,
  variant,
}: NotificationComponentProps) => {
  return (
    <>
      <RocketLaunchIcon />
      <HvTypography variant={variant} style={{ marginBottom: "16px" }}>
        {message}
      </HvTypography>
    </>
  );
};

export default NotificationComponent;
