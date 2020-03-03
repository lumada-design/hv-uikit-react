import React from "react";
import { Info } from "@hv/uikit-react-icons/dist";
import withStyles from "@material-ui/core/styles/withStyles";
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
    <Typography variant="xsTitle">Semantics</Typography>
    <p />
    <BannerContentWrapper
      content="This is a default banner."
      variant="default"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is a success banner."
      variant="success"
      showIcon
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is an error banner."
      variant="error"
      showIcon
      onClose={() => {}}
    />

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

    <p />
    <Typography variant="xsTitle">Custom icon</Typography>
    <p />
    <BannerContentWrapper
      content="This is a default banner."
      variant="default"
      customIcon={<Info color="acce1" />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This could be a one-line message text string with no actions on a tablet or on a desktop. This could be a two-lines message text string with no actions on a tablet or on a desktop. However, this is actually a three-lines message text string with no actions on a tablet or on a desktop."
      variant="default"
      customIcon={<Info color="acce1" />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is a success banner."
      variant="success"
      customIcon={<Info color="acce1" />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="This is an error banner."
      variant="error"
      customIcon={<Info color="acce1" />}
      onClose={() => {}}
    />
  </div>
);
