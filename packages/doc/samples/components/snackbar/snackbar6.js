import React from "react";
import Typography from "@hv/uikit-react-core/dist/Typography";
import { Info } from "@hv/uikit-react-icons/dist";
import SnackbarContentWrapper from "@hv/uikit-react-core/dist/Snackbar/SnackbarContentWrapper";

const actionComponent = {
  id: "post",
  label: "Action",
  disabled: false
};

export default (
  <div>
    <Typography variant="xsTitle">Semantics</Typography>
    <p />
    <SnackbarContentWrapper label="This is a snackbar." variant="default" />
    <p />
    <SnackbarContentWrapper
      label="This is a success message."
      variant="success"
      showIcon
    />
    <p />
    <SnackbarContentWrapper
      label="This is an error message."
      variant="error"
      showIcon
    />
    <p />
    <Typography variant="xsTitle">Action</Typography>
    <p />
    <SnackbarContentWrapper
      label="This is a snackbar."
      variant="default"
      action={actionComponent}
      actionCallback={(id, action) => alert(`clicked ${action.label}`)}
    />

    <p />
    <Typography variant="xsTitle">Custom icon</Typography>
    <p />
    <SnackbarContentWrapper
      label="This is a snackbar."
      variant="default"
      customIcon={<Info color="base2" />}
    />
    <p />
    <SnackbarContentWrapper
      label="Ellentesque habitant morbi tristique senectus et netus et malesuada ac turpis egestas."
      variant="default"
      customIcon={<Info color="base2" />}
    />
    <p />
    <SnackbarContentWrapper
      label="This is a success message."
      variant="success"
      customIcon={<Info color="base2" />}
    />
    <p />
    <SnackbarContentWrapper
      label="This is an error message."
      variant="error"
      customIcon={<Info color="base2" />}
    />
  </div>
);
