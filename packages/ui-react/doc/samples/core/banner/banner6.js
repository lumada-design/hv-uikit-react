/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { FastForward16 } from "@hv-ui/icons/core";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "@hv-ui/react/core/Banner/BannerWrapper/styles";
import HvBannerContentWrapper from "@hv-ui/react/core/Banner/BannerWrapper";

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
      "text-decoration": "none"
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
    Banner with icons
    <p />
    <BannerContentWrapper message="Default" variant="default" showIcon />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
    />
    <p />
    <BannerContentWrapper message="Success" variant="success" showIcon />
    <p />
    <BannerContentWrapper message="Error" variant="error" showIcon />
    <p />
    Banner with custom icons
    <p />
    <BannerContentWrapper
      message="default"
      variant="default"
      customIcon={<FastForward16 />}
    />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      customIcon={<FastForward16 />}
    />
    <p />
    <BannerContentWrapper
      message="Success"
      variant="success"
      customIcon={<FastForward16 />}
    />
    <p />
    <BannerContentWrapper
      message="Error"
      variant="error"
      customIcon={<FastForward16 />}
    />
    <p />
    Banner with icons and message action
    <p />
    <BannerContentWrapper
      message="default"
      variant="default"
      showIcon
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="Success"
      variant="success"
      showIcon
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="Error"
      variant="error"
      showIcon
      actionsOnMessage={<ActionButton />}
    />
    <p />
    Banner with icons and action
    <p />
    <BannerContentWrapper
      message="default"
      variant="default"
      showIcon
      action={<ActionButtonCollection />}
    />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      showIcon
      action={<ActionButtonCollection />}
    />
    <p />
    <p />
    <BannerContentWrapper
      message="Success"
      variant="success"
      showIcon
      action={<ActionButtonCollection />}
    />
    <p />
    <BannerContentWrapper
      message="Error"
      variant="error"
      showIcon
      action={<ActionButtonCollection />}
    />
    <p />
    Banner without icons
    <p />
    <BannerContentWrapper message="default" variant="default" />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
    />
    <p />
    <BannerContentWrapper message="Success" variant="success" />
    <p />
    <BannerContentWrapper message="Error" variant="error" />
    <p />
    Banner without icons and with message action
    <p />
    <BannerContentWrapper
      message="default"
      variant="default"
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="success"
      variant="success"
      actionsOnMessage={<ActionButton />}
    />
    <p />
    <BannerContentWrapper
      message="error"
      variant="error"
      actionsOnMessage={<ActionButton />}
    />
    <p />
    Banner without icons and with action
    <p />
    <BannerContentWrapper
      message="default"
      variant="default"
      action={<ActionButtonCollection />}
    />
    <p />
    <BannerContentWrapper
      message="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
      variant="default"
      action={<ActionButtonCollection />}
    />
    <p />
    <BannerContentWrapper
      message="success"
      variant="success"
      action={<ActionButtonCollection />}
    />
    <p />
    <BannerContentWrapper
      message="error"
      variant="error"
      action={<ActionButtonCollection />}
    />
  </div>
);
