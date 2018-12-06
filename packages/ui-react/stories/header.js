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

const userData = {
  name: "Andrew Jennings",
  role: "maintenance manager"
};

const logout = () => {};

storiesOf("Header", module).add("Header", () => (
  <HvHeader menuData={menuData} userData={userData} userLogout={logout} />
));
