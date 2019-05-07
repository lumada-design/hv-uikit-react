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
import FastForward16 from "@hv/uikit-react-icons/dist/FastForwards.S";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "@hv/uikit-react-core/dist/Snackbar/SnackbarContentWrapper/styles";
import HvSnackbarContentWrapper from "@hv/uikit-react-core/dist/Snackbar/SnackbarContentWrapper";

const SnackbarContentWrapper = withStyles(styles)(HvSnackbarContentWrapper);

const actionComponent = (
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
    Event
  </a>
);

export default (
  <div>
    Snackbar with icons
    <div>
      <SnackbarContentWrapper label="Default" variant="default" showIcon />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
        showIcon
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
    Snackbar with custom icons
    <div>
      <SnackbarContentWrapper
        label="default"
        variant="default"
        customIcon={<FastForward16 />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
        variant="default"
        customIcon={<FastForward16 />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Success"
        variant="success"
        customIcon={<FastForward16 />}
      />
    </div>
    <p />
    <div>
      <SnackbarContentWrapper
        label="Error"
        variant="error"
        customIcon={<FastForward16 />}
      />
    </div>
    <p />
    Snackbar with icons and action
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
    Snackbar without icons
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
    Snackbar without icons and with action
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
