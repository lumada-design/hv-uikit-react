/*
 * Copyright 2020 Hitachi Vantara Corporation
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

import React, { useContext } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Settings, User } from "@hv/uikit-react-icons/dist/Generic";
import VerticalNavigation, {
  Action,
  Actions,
  Navigation
} from "@hv/uikit-react-core/dist/VerticalNavigation";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../views/detail/styles";
import NavContext from "../hoc/NavContext";

// eslint-disable-next-line react/prop-types
const NavigationTemplate = ({ theme, hasAnchor }) => {
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const {
    isOpen,
    verticalNavData,
    verticalSelection,
    onVerticalSelection,
    shouldBeOpen
  } = useContext(NavContext);

  const handleChange = (evt, selectedItem) => {
    onVerticalSelection(selectedItem.id);
  };

  return (
    <>
      {(verticalNavData.length || null) && (isMdUp || isOpen) && (
        <VerticalNavigation
          position="fixed"
          isCollapsable={hasAnchor && isMdUp}
          isOpen={!isMdUp ? null : isOpen || (!hasAnchor && isMdUp)}
          toggleOpenCallback={value => shouldBeOpen(value)}
        >
          <Navigation
            data={verticalNavData}
            selected={verticalSelection}
            onClick={handleChange}
          />
          {!isMdUp && (
            <Actions>
              <Action label="Settings" icon={<Settings />} />
              <Action label="Profile" icon={<User />} />
            </Actions>
          )}
        </VerticalNavigation>
      )}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(NavigationTemplate);
