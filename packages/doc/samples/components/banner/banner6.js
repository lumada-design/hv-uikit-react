import React from "react";
import FastForward16 from "@hv/uikit-react-icons/dist/FastForwards.S";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "@hv/uikit-react-core/dist/Banner/BannerWrapper/styles";
import HvBannerContentWrapper from "@hv/uikit-react-core/dist/Banner/BannerWrapper";
import Typography from "@hv/uikit-react-core/dist/Typography";

const BannerContentWrapper = withStyles(styles)(HvBannerContentWrapper);

const ActionButton = () => (
  <a
    href="https://i.imgflip.com/yrj3h.jpg"
    style={{
      color: "#146BD2",
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

const ActionButtonCollection = () => (
  <div
    style={{ display: "flex", width: "100px", justifyContent: "space-between" }}
  >
    <ActionButton />
    <ActionButton />
  </div>
);

export default (
  <div>
    <div>
      <Typography variant="xsTitle">Banner with icons</Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="Default"
      variant="default"
      showIcon
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Success"
      variant="success"
      showIcon
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Error"
      variant="error"
      showIcon
      onClose={() => {}}
    />
    <p />
    <div>
      <Typography variant="xsTitle"> Banner with custom icons</Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      customIcon={<FastForward16 />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      customIcon={<FastForward16 />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Success"
      variant="success"
      customIcon={<FastForward16 />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Error"
      variant="error"
      customIcon={<FastForward16 />}
      onClose={() => {}}
    />
    <p />
    <div>
      <Typography variant="xsTitle">
        Banner with icons and label action
      </Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      showIcon
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Success"
      variant="success"
      showIcon
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Error"
      variant="error"
      showIcon
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <div>
      <Typography variant="xsTitle">Banner with icons and action</Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      showIcon
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <p />
    <BannerContentWrapper
      content="Success"
      variant="success"
      showIcon
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Error"
      variant="error"
      showIcon
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <div>
      <Typography variant="xsTitle"> Banner without icons</Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="Success"
      variant="success"
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper content="Error" variant="error" onClose={() => {}} />
    <p />
    <div>
      <Typography variant="xsTitle">
        {" "}
        Banner without icons and with label action
      </Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="success"
      variant="success"
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="error"
      variant="error"
      actionsOnMessage={<ActionButton />}
      onClose={() => {}}
    />
    <p />
    <div>
      <Typography variant="xsTitle">
        {" "}
        Banner without icons and with action
      </Typography>
    </div>
    <p />
    <BannerContentWrapper
      content="default"
      variant="default"
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="success"
      variant="success"
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
    <p />
    <BannerContentWrapper
      content="error"
      variant="error"
      action={<ActionButtonCollection />}
      onClose={() => {}}
    />
  </div>
);
