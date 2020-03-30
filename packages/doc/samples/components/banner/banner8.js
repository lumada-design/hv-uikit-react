import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "@hv/uikit-react-core/dist/Banner/BannerWrapper/styles";
import HvBannerContentWrapper from "@hv/uikit-react-core/dist/Banner/BannerWrapper";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Button from "@hv/uikit-react-core/dist/Button";

const BannerContentWrapper = withStyles(styles)(HvBannerContentWrapper);

const actionArray = id => [
  { id: `action${id}_1`, label: "Action 1", disabled: false },
  { id: `action${id}_2`, label: "Action 2", disabled: false }
];

const actionProps = {
  "aria-label": "Close"
};
export default (
  <div>
    <p />
    <Typography variant="xsTitle">Actions</Typography>
    <p />
    <BannerContentWrapper
      content="This is a default banner."
      variant="default"
      actions={<Button category="semantic">Action</Button>}
      actionsPosition="inline"
      onClose={() => {}}
      actionProps={actionProps}
    />
    <p />
    <BannerContentWrapper
      content="This could be a one-line message text string with two actions on a tablet or on a desktop. However, this is actually is a two-lines message text string with two actions on a tablet or on a desktop."
      variant="default"
      actions={actionArray("second")}
      actionsPosition="bottom-right"
      onClose={() => {}}
      actionProps={actionProps}
    />
    <p />
    <BannerContentWrapper
      content="This could be a one-line message text string with two actions on a tablet or on a desktop. This could be a two-lines message text string with two actions on a tablet or on a desktop. However, this is actually a three-lines message text string with two actions on a tablet or on a desktop."
      variant="default"
      actions={actionArray("third")}
      actionsPosition="bottom-right"
      onClose={() => {}}
      actionProps={actionProps}
    />
    <p />
    <BannerContentWrapper
      content="This is a success banner."
      variant="success"
      showIcon
      actions={<Button category="semantic">Action</Button>}
      actionsPosition="inline"
      onClose={() => {}}
      actionProps={actionProps}
    />
    <p />
    <BannerContentWrapper
      content="This is an error banner."
      variant="error"
      showIcon
      actions={actionArray("fifth")}
      actionsPosition="inline"
      onClose={() => {}}
      actionProps={actionProps}
    />
  </div>
);
