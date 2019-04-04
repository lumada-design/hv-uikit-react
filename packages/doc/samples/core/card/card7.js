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
import HvCard from "@hv/uikit-react-core/Card";
import Icon from "@hv/uikit-react-icons/Upload.S";
import HvButton from "@hv/uikit-react-core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import MoreOptionsIcon from "@hv/uikit-react-icons/MoreOptionsVertical.S";
import { HvCardFooter, HvCardMedia } from "@hv/uikit-react-core/Card";
import leaf from "./resources/leaf.png";

const styles = theme => ({
  mediaContainer: {
    width: "100%",
    paddingBottom: "0px",
    borderLeft: `1px solid ${theme.palette.grey.plain}`,
    borderRight: `1px solid ${theme.palette.grey.plain}`
  },
  media: {
    height: "100%",
    width: "100%"
  }
});

const CustomMedia = withStyles(styles, { withTheme: true })(HvCardMedia);

const MultipleActionsWithMediaButtons = () => (
  <>
    <HvButton colorType="link">
      <Icon />
      Update
    </HvButton>
    <HvButton colorType="link">
      <MoreOptionsIcon />
    </HvButton>
  </>
);

export default (
  <div style={{ width: "500px" }}>
    <HvCard variant="error">
      <CustomMedia mediaPath={leaf} mediaHeight={160} />
      <HvCardFooter
        Actions={<MultipleActionsWithMediaButtons />}
        isSelectable
        onSelect={event => console.log(`my value is ${event.target.value}`)}
      />
    </HvCard>
  </div>
);
