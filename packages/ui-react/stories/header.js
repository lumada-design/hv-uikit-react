import React from "react";
import { storiesOf } from "@storybook/react";

import UserIcon from "../../ui-icons/core/S-icons/User16";
import SettingIcon from "../../ui-icons/core/S-icons/Settings16";
import HelpIcon from "../../ui-icons/core/S-icons/Help16";

import TestLogo from "./header/resources/testlogo.svg";
import HitachiLogo from "./header/resources/hitachi";
import photo from "./header/resources/user.png";

import SimpleHeaderController from "./header/SimpleHeaderController";
import ActionsPopover from "./header/ActionsPopover";
import ActionsList from "./header/ActionsList";

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const navigationData = [
  {
    label: "Overview",
    path: "/"
  },
  {
    label: "events",
    path: "/events"
  },
  {
    label: "work orders",
    path: "/work"
  },
  {
    label: "asset",
    path: "/asset"
  },
  {
    label: "Analytics",
    path: "/Analytics"
  },
  {
    label: "Resources",
    path: "/Resources"
  }
];

const userClick = () => alert("user");

const Hitachi = () =>
  <HitachiLogo style={{width:"72px"}} />;

storiesOf("Header", module)
  .add("Variant 1", () => (
    <SimpleHeaderController
      // Brand
      companyLogo={<Hitachi />}
      productText="Maintenance Insights"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserIcon />}
      userClick={userClick}
      // Actions
      itemActions={[<SettingIcon />, <HelpIcon />]}
    />
  ))
  .add("Variant 2", () => (
    <SimpleHeaderController
      // Brand
      productText="Hitachi Service Name"
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // User
      userIcon={<UserIcon />}
      userData={userData}
      userClick={userClick}
      // Actions
      itemActions={[
        <SettingIcon />,
        <ActionsPopover>
          <ActionsList eventId="id" dismiss={() => {}} />
        </ActionsPopover>
      ]}
    />
  ))
  .add("Variant 3", () => (
    <SimpleHeaderController
      // Brand
      productLogo={TestLogo}
      productText="Hitachi Content Intelligence"
      // Navigation
      useRouter
      // User
      userIcon={photo}
      userData={userData}
      userClick={userClick}
      itemActions={[<SettingIcon />]}
    />
  ))
  .add("Variant 4", () => (
    <SimpleHeaderController
      // Brand
      companyLogo={<Hitachi />}
      productText="Application Name"
      productLogo={TestLogo}
      // Navigation
      navigationData={navigationData}
      selected={0}
      useRouter
      // Actions
      itemActions={[<SettingIcon />]}
    />
  ))
  .add("Variant 5", () => (
    <SimpleHeaderController
      // Brand
      companyLogo={<Hitachi />}
      // User
      userIcon={photo}
      userData={userData}
    />
  ));
