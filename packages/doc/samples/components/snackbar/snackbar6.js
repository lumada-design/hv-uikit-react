import React from "react";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Info from "@hv/uikit-react-icons/dist/Generic/Info";
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
const StyledInfo = withStyles(styles, { withTheme: true })(Info);

const actionComponent = {
  id: "post",
  label: "Action",
  disabled: false
};

export default (
  <div>
    <Typography variant="xsTitle">Semantics</Typography>
    <p />
    <div>
      <SnackbarContentWrapper label="This is a snackbar." variant="default" />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="This is a success message." variant="success" showIcon />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper label="This is an error message." variant="error" showIcon />
    </div>

    <p />
    <Typography variant="xsTitle">Action</Typography>
    <p />
    <div>
      <SnackbarContentWrapper
        label="This is a snackbar."
        variant="default"
        showIcon
        action={actionComponent}
        actionCallback={(id, action) => alert(`clicked ${action.label}`)}
      />
    </div>

    <p />
    <Typography variant="xsTitle">Custom icon</Typography>
    <p />
    <div>
      <SnackbarContentWrapper
        label="This is a snackbar."
        variant="default"
        customIcon={<StyledInfo iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Ellentesque habitant morbi tristique senectus et netus et malesuada ac turpis egestas."
        variant="default"
        customIcon={<StyledInfo iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="This is a success message."
        variant="success"
        customIcon={<StyledInfo iconSize="S" color={["#414141"]} />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="This is an error message."
        variant="error"
        customIcon={<StyledInfo iconSize="S" color={["#414141"]} />}
      />
    </div>
  </div>
);
