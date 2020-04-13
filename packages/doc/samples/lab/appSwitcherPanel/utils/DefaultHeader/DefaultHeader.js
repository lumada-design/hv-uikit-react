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

import React, { useState } from "react";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import HvHeader, {
  HvHeaderBrand,
  HvHeaderActions,
  HvHeaderNavigation,
} from "@hv/uikit-react-core/dist/NewHeader";
import HvButton from "@hv/uikit-react-core/dist/Button";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import { User, Alert } from "@hv/uikit-react-icons/dist/Generic";

import HitachiLogo from "../../assets/HitachiLogo";
import { dummyNavigationData } from "../data";

const boxStyles = {
  width: 32,
  height: 32,
};

const DefaultHeader = ({ theme, classes, children, appSwitcherNextToUser }) => {
  const [selected, setSelected] = useState("3-2");
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = (e, selectedItem) => {
    setSelected(selectedItem.id);
  };

  return (
    <div className={classes.container}>
      <HvHeader position="relative">
        {!appSwitcherNextToUser && (
          <div className={classes.appSwitcherNextToUserContainer}>
            {children}
          </div>
        )}

        <HvHeaderBrand logo={<HitachiLogo />} name={"Lumada App"} />
        {isMdUp && (
          <HvHeaderNavigation
            data={dummyNavigationData}
            selected={selected}
            onClick={handleChange}
          />
        )}
        <HvHeaderActions>
          <HvButton
            category="icon"
            onClick={() => console.log("alerts")}
            aria-label="Open Notifications panel"
          >
            <HvBadge count={1} icon={<Alert boxStyles={boxStyles} />} />
          </HvButton>
          {appSwitcherNextToUser && children}
          {isMdUp && (
            <HvButton
              category="icon"
              onClick={() => console.log("user")}
              aria-label="Open User panel"
            >
              <User boxStyles={boxStyles} />
            </HvButton>
          )}
        </HvHeaderActions>
      </HvHeader>
    </div>
  );
};

export default DefaultHeader;
