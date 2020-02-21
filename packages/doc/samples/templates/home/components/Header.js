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
import {
  Alert,
  Menu,
  Settings,
  User
} from "@hv/uikit-react-icons/dist/Generic";
import { HvBadge, HvButton } from "@hv/uikit-react-core/dist";
import HvHeader, {
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation
} from "@hv/uikit-react-core/dist/Header";
import withStyles from "@material-ui/core/styles/withStyles";
import HitachiLogo from "./HitachiLogo";
import styles from "../views/detail/styles";
import NavContext from "../hoc/NavContext";

const boxStyles = { width: 32, height: 32 };

// eslint-disable-next-line react/prop-types
const NavigationTemplate = ({ theme }) => {
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const {
    headerNav,
    headerSelection,
    onHeaderSelection,
    shouldBeOpen
  } = useContext(NavContext);

  const handleChange = (evt, selectedItem) => {
    console.log("selectedItem: ", selectedItem);
    onHeaderSelection(selectedItem.id);
  };

  const toggleExpanded = () => {
    shouldBeOpen();
  };

  const handleClick = evt => console.log(evt);

  return (
    <HvHeader position="fixed">
      {!isMdUp && (
        <HvButton category="icon" onClick={toggleExpanded}>
          <Menu />
        </HvButton>
      )}
      <HvHeaderBrand
        logo={<HitachiLogo />}
        name={!isXs ? "Maintenance Insights" : undefined}
      />
      {isMdUp && (
        <HvHeaderNavigation
          data={headerNav}
          selected={headerSelection}
          onClick={handleChange}
        />
      )}
      <HvHeaderActions>
        {isMdUp && (
          <>
            <HvButton category="icon" onClick={handleClick}>
              <Settings boxStyles={boxStyles} />
            </HvButton>
            <HvButton category="icon" onClick={handleClick}>
              <User boxStyles={boxStyles} />
            </HvButton>
          </>
        )}
        <HvButton category="icon" onClick={handleClick}>
          <HvBadge count={1} icon={<Alert boxStyles={boxStyles} />} />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );
};

export default withStyles(styles, { withTheme: true })(NavigationTemplate);
