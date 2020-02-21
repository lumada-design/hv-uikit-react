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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Alert,
  BarChart,
  Menu,
  Settings,
  User
} from "@hv/uikit-react-icons/dist/Generic";
import { HvBadge, HvButton, HvEmptyState } from "@hv/uikit-react-core/dist";
import VerticalNavigation, {
  Navigation,
  Actions,
  Action
} from "@hv/uikit-react-core/dist/VerticalNavigation";
import HvHeader, {
  HvHeaderBrand,
  HvHeaderActions,
  HvHeaderNavigation
} from "@hv/uikit-react-core/dist/Header";
import HitachiLogo from "../home/components/HitachiLogo";
import { navigationData } from "./data";

const boxStyles = { width: 32, height: 32 };

const findById = (data = [], id) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const el of data) {
    if (el.id === id) return el;

    const child = findById(el.data, id);
    if (child) return child;
  }
  return undefined;
};

const navigationDepth = arr =>
  Array.isArray(arr)
    ? 1 + Math.max(...arr.map(el => navigationDepth(el.data)))
    : 0;

// eslint-disable-next-line react/prop-types
const NavigationTemplate = ({ theme }) => {
  const [selection, setSelection] = useState("01");
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(navigationData[0]);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const selectionData = findById(navigationData, selection);
  const trimHeader = navigationDepth(navigationData) > 2;

  const headerNavData = navigationData.map(el => ({
    ...el,
    data: trimHeader ? undefined : el.data
  }));
  const verticalNavData =
    (!isMdUp && navigationData) || (trimHeader && selectionData.data) || [];

  const handleChange = (evt, selectedItem) => {
    setPage(selectedItem);
    setSelection(selectedItem.id);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleClick = evt => console.log(evt);

  return (
    <div style={{ height: "90vh" }}>
      <HvHeader position="fixed">
        {!isMdUp && (
          <HvButton category="icon" onClick={toggleExpanded}>
            <Menu />
          </HvButton>
        )}
        <HvHeaderBrand logo={<HitachiLogo />} name="Maintenance Insights" />
        {isMdUp && (
          <HvHeaderNavigation
            data={headerNavData}
            selection={selection}
            onChange={handleChange}
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
      {(verticalNavData.length || null) && (isMdUp || expanded) && (
        <VerticalNavigation isCollapsable={isMdUp} position="fixed">
          <Navigation data={verticalNavData} />
          <Actions>
            {!isMdUp && <Action label="Settings" icon={<Settings />} />}
            {!isMdUp && <Action label="Profile" icon={<User />} />}
          </Actions>
        </VerticalNavigation>
      )}

      {page && (
        <HvEmptyState
          title={page.label}
          message={`You are on page: ${page.label}`}
          icon={<BarChart iconSize="L" color={["atmo7"]} />}
        />
      )}
    </div>
  );
};

export default NavigationTemplate;
