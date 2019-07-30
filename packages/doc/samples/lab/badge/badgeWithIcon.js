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

import React, {Component} from "react";

import HvBadge from "@hv/uikit-react-lab/dist/Badge";
import AlertS from "@hv/uikit-react-icons/dist/DawnTheme/Alert.S";
import withStyles from "@material-ui/core/styles/withStyles";

const exampleStyles = {
  display: "flex",
  width: "800px",
  justifyContent: "space-between"
}

const fontStyles = (theme) => ({
  fontSize: "22px",
  color: theme.palette.text.primary,
  lineHeight: "20px"
})

const styles = {}

class BadgesWithIcons extends Component {
  render() {
    const {theme} = this.props

    return (
      <React.Fragment>
        <HvBadge count={0}>
          <AlertS />
          </HvBadge>
          <HvBadge count={1}>
            <AlertS />
          </HvBadge>
          <HvBadge showCount count={8}>
            <AlertS />
          </HvBadge>
          <HvBadge showCount count={12}>
            <div style={fontStyles(theme)}>
            Track events
          </div>
          </HvBadge>
          <HvBadge showCount count={100}>
            <div style={fontStyles(theme)}>
            Vehicle events
          </div>
        </HvBadge>
      </React.Fragment>
    )
  }
}

const BadgesWithIconsWithStyles = withStyles(styles, {withTheme: true})(BadgesWithIcons);

export default (
<div style={exampleStyles}>
  <BadgesWithIconsWithStyles/>
  </div>
);