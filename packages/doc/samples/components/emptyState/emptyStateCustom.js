import React from "react";
import { HvEmptyState, HvTypography } from "@hv/uikit-react-core/dist";
import { Ghost } from "@hv/uikit-react-icons/dist";

const CustomMessage = <HvTypography>404 Not Found</HvTypography>;
const CustomAction = (
  <HvTypography component="div">
    <div>Here are some helpful links instead:</div>
    <div>
      <a href="/">Online Help</a>
    </div>
  </HvTypography>
);

export default (
  <HvEmptyState
    title="This page can't be displayed"
    message={CustomMessage}
    action={CustomAction}
    icon={<Ghost iconSize="L" color="atmo7" role="presentation" />}
  />
);
