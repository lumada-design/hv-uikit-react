import { RocketLaunch } from "@phosphor-icons/react";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { BasicNotification } from "../types";

const NotificationComponent: BasicNotification = ({ message, variant }) => {
  return (
    <>
      <RocketLaunch />
      <HvTypography variant={variant} style={{ marginBottom: "16px" }}>
        {message}
      </HvTypography>
    </>
  );
};

export default NotificationComponent;
