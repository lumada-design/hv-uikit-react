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
import HvCard, { HvCardFooter, HvCardHeader } from "@hv-ui/react/core/Card";
import Icon from "@hv-ui/icons/core/icons/Upload.S";
import HvButton from "@hv-ui/react/core/Button";
import MoreOptionsIcon from "@hv-ui/icons/core/icons/MoreOptionsVertical.S";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  root: {
    color: "red"
  }
});

const IconButton = withStyles(styles, { withTheme: true })(HvButton);

const MoreOptionsIconButton = withStyles(styles, {
  withTheme: true
})(HvButton);

const MultipleActionsWithMediaButtons = () => (
  <>
    <IconButton colorType="link">
      <Icon />
      Update
    </IconButton>
    <MoreOptionsIconButton colorType="link">
      <MoreOptionsIcon />
    </MoreOptionsIconButton>
  </>
);

const headerStyles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.hv.palette.atmosphere.atmo6}`
  }
});

const footerStyles = () => ({
  root: {
    borderTop: "none"
  }
});

const HeaderWithStyles = withStyles(headerStyles, {
  withTheme: true
})(HvCardHeader);

const FooterWithStyles = withStyles(footerStyles, {
  withTheme: true
})(HvCardFooter);

export default (
  <div style={{ width: "500px" }}>
    <HvCard>
      <FooterWithStyles
        Actions={<MultipleActionsWithMediaButtons />}
        isSelectable
        onSelect={event => console.log(`my value is ${event.target.value}`)}
      />
      <HeaderWithStyles HeaderTitle="Asset Avatar L90" Subheader="Compressor" />
    </HvCard>
  </div>
);
