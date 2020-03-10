import React from "react";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "@hv/uikit-react-core/dist/Banner/BannerWrapper/styles";
import HvBannerContentWrapper from "@hv/uikit-react-core/dist/Banner/BannerWrapper";
import Typography from "@hv/uikit-react-core/dist/Typography";
import Button from "@hv/uikit-react-core/dist/Button";

const BannerContentWrapper = withStyles(styles)(HvBannerContentWrapper);

const ActionButton = () => <Button category="semantic">Action</Button>;

const actionArray = [
  { id: "action1", label: "Action 1", disabled: false },
  { id: "action2", label: "Action 2", disabled: false }
];

export default (
  <div>
    <p />
    <Typography variant="xsTitle">Actions</Typography>
    <p />
    <BannerContentWrapper
      content="This is a default banner."
      variant="default"
      actions={<ActionButton />}
      actionsPosition="inline"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This could be a one-line message text string with two actions on a tablet or on a desktop. However, this is actually is a two-lines message text string with two actions on a tablet or on a desktop."
      variant="default"
      actions={actionArray}
      actionsPosition="bottom-right"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This could be a one-line message text string with two actions on a tablet or on a desktop. This could be a two-lines message text string with two actions on a tablet or on a desktop. However, this is actually a three-lines message text string with two actions on a tablet or on a desktop."
      variant="default"
      actions={actionArray}
      actionsPosition="bottom-right"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is a success banner."
      variant="success"
      showIcon
      actions={<ActionButton />}
      actionsPosition="inline"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is an error banner."
      variant="error"
      showIcon
      actions={actionArray}
      actionsPosition="inline"
      onClose={() => {}}
    />
  </div>
);
