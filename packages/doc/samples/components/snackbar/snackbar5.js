import React from "react";
import Typography from "@hv/uikit-react-core/dist/Typography";
import FastForward from "@hv/uikit-react-icons/dist/Generic/FastForwards";
import withStyles from "@material-ui/core/styles/withStyles";
import HvSnackbarContentWrapper from "@hv/uikit-react-core/dist/Snackbar/SnackbarContentWrapper";

const styles = {
  rootS: {
    width: "30px",
    height: "30px",
    "&>svg": {
      margin: "0 auto"
    }
  }
};

const SnackbarContentWrapper = withStyles(styles)(HvSnackbarContentWrapper);
const StyledFastForward = withStyles(styles, { withTheme: true })(FastForward);

const actionComponent = (
  <a
    style={{
      cursor: "pointer",
      color: "#414141",
      fontSize: "14px",
      letterSpacing: "0.02em",
      lineHeight: "20px",
      fontWeight: "600",
      textDecoration: "none"
    }}
  >
    Action
  </a>
);

export default (
  <div>
    <Typography variant="xsTitle">Snackbar variants</Typography>
    <div>
      <SnackbarContentWrapper label="Default" variant="default" />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="Success" variant="success" showIcon />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="Error" variant="error" showIcon />
    </div>
    <p />
    <Typography variant="xsTitle">Snackbar with custom icons</Typography>
    <div>
      <SnackbarContentWrapper
        label="default"
        variant="default"
        customIcon={<StyledFastForward iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
        customIcon={<StyledFastForward iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Success"
        variant="success"
        customIcon={<StyledFastForward iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Error"
        variant="error"
        customIcon={<StyledFastForward iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <Typography variant="xsTitle">Snackbar with icons and action</Typography>
    <div>
      <SnackbarContentWrapper
        label="default"
        variant="default"
        showIcon
        action={actionComponent}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
        showIcon
        action={actionComponent}
      />
    </div>
    <p />
    <p />
    <div>
      <SnackbarContentWrapper
        label="Success"
        variant="success"
        showIcon
        action={actionComponent}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Error"
        variant="error"
        showIcon
        action={actionComponent}
      />
    </div>
    <p />
    <Typography variant="xsTitle">Snackbar without icons</Typography>
    <div>
      <SnackbarContentWrapper label="default" variant="default" />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="Success" variant="success" />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="Error" variant="error" />
    </div>
    <p />
    <Typography variant="xsTitle">
      Snackbar without icons and with action
    </Typography>
    <div>
      <SnackbarContentWrapper
        label="default"
        variant="default"
        action={actionComponent}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
        action={actionComponent}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="success"
        variant="success"
        action={actionComponent}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="error"
        variant="error"
        action={actionComponent}
      />
    </div>
  </div>
);
