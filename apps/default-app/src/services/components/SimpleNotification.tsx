import { FC } from "react";
import { RocketLaunchIcon } from "@phosphor-icons/react";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { SimpleNotificationProps } from "../types";

const SimpleNotification: FC<SimpleNotificationProps> = ({
  message,
  variant,
}) => {
  return (
    <>
      <RocketLaunchIcon />
      <HvTypography variant={variant} style={{ marginBottom: "16px" }}>
        {message}
      </HvTypography>
    </>
  );
};

export default SimpleNotification;
