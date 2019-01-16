import React from "react";
import { storiesOf } from "@storybook/react";
import { HvHeader } from "../src";

const menuData = [
  {
    label: "Home",
    path: "/",
    isActive: true
  },
  {
    label: "events",
    path: "/events"
  }
];
const settingsData = [
  {
    label: "Event Settings",
    path: "/settings",
    isActive: true
  },
  {
    label: "Work Request Settings",
    path: "/"
  },
  {
    label: "Anaytics Settings",
    path: "/"
  },
  {
    label: "User Management",
    path: "/"
  }
];

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const logout = () => {};

storiesOf("Header", module).add("Header", () => (
  <HvHeader
    menuData={menuData}
    userData={userData}
    userLogout={logout}
    settingsData={settingsData}
  />
));
