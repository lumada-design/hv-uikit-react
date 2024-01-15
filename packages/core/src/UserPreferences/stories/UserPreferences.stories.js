import React, { useState } from "react";
import {
  BarChart,
  Components,
  Email,
  Energy,
  GameController,
  Ghost,
  Help,
  LogOut,
  People,
  Research,
  User,
  WhiteBoard,
} from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvUserPreferences,
  HvUserPreferencesActions,
  HvUserPreferencesAction,
  HvUserPreferencesOptions,
  HvUserPreferencesOption,
  HvUserPreferencesOptionsGroup,
  HvUserPreferencesOptionsGroupLabel,
} from "../..";

export default {
  title: "Components/User Preferences",
  parameters: {
    componentSubtitle: null,
    usage:
      'import {\n  HvUserPreferences,\n  HvUserPreferencesActions,\n  HvUserPreferencesAction,\n  HvUserPreferencesOptions,\n  HvUserPreferencesOption,\n  HvUserPreferencesOptionsGroup,\n  HvUserPreferencesOptionsGroupLabel,\n} from "@hitachivantara/uikit-react-core";',
    subcomponents: {
      HvUserPreferencesActions,
      HvUserPreferencesAction,
      HvUserPreferencesOptions,
      HvUserPreferencesOptionsGroup,
      HvUserPreferencesOption,
      HvUserPreferencesOptionsGroupLabel,
    },
  },
  component: HvUserPreferences,
};

export const Main = () => (
  <HvUserPreferences
    id="userPreferences"
    isOpen
    userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
  >
    <HvUserPreferencesActions>
      <HvUserPreferencesAction
        label="Log Out"
        icon={<LogOut />}
        onClick={(event, data) => {
          alert(`action ${data.label} selected`);
        }}
      />
    </HvUserPreferencesActions>
    <HvUserPreferencesOptions
      onClick={(event, payload) => alert(`id:${payload.id} label:${payload.label}`)}
    >
      <HvUserPreferencesOptionsGroup>
        <HvUserPreferencesOption label="Personal Information" icon={<User />} />
        <HvUserPreferencesOption label="Manage Groups" icon={<People />} />
        <HvUserPreferencesOption label="Usage" icon={<BarChart />} />
        <HvUserPreferencesOption label="Devices" icon={<GameController />} />
        <HvUserPreferencesOption label="Recover Files" icon={<Components />} />
      </HvUserPreferencesOptionsGroup>
      <HvUserPreferencesOptionsGroup aria-labelledby="messages">
        <HvUserPreferencesOptionsGroupLabel id="messages">
          Messages
        </HvUserPreferencesOptionsGroupLabel>
        <HvUserPreferencesOption label="Sharing Messages" icon={<Email />} />
        <HvUserPreferencesOption label="File Conflicts" icon={<Energy />} />
      </HvUserPreferencesOptionsGroup>
      <HvUserPreferencesOptionsGroup label="Display Settings">
        <HvUserPreferencesOption label="Appearance" icon={<Ghost />} />
        <HvUserPreferencesOption label="Accessibility" icon={<WhiteBoard />} />
      </HvUserPreferencesOptionsGroup>
      <HvUserPreferencesOptionsGroup label="Help and Documentation">
        <HvUserPreferencesOption label="Online Help" icon={<Help />} />
        <HvUserPreferencesOption label="Documentation" icon={<Research />} />
      </HvUserPreferencesOptionsGroup>
    </HvUserPreferencesOptions>
  </HvUserPreferences>
);

export const WithOpenControl = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton id="controller" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
      <HvUserPreferences
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
        closeOnExit
        toggleOpenCallback={setOpen}
        id="user-preferences-controlled"
      >
        <HvUserPreferencesActions>
          <HvUserPreferencesAction
            label="Logout"
            icon={<LogOut />}
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </HvUserPreferencesActions>
        <HvUserPreferencesOptions
          onClick={(event, payload) => console.log(`id:${payload.id} label:${payload.label}`)}
        >
          <HvUserPreferencesOptionsGroup>
            <HvUserPreferencesOption label="Personal Information" icon={<User />} />
            <HvUserPreferencesOption label="Manage Groups" icon={<People />} />
            <HvUserPreferencesOption label="Usage" icon={<BarChart />} />
            <HvUserPreferencesOption label="Devices" icon={<GameController />} />
            <HvUserPreferencesOption label="Recover Files" icon={<Components />} />
          </HvUserPreferencesOptionsGroup>
          <HvUserPreferencesOptionsGroup aria-labelledby="messages">
            <HvUserPreferencesOptionsGroupLabel id="messages">
              Messages
            </HvUserPreferencesOptionsGroupLabel>
            <HvUserPreferencesOption label="Sharing Messages" icon={<Email />} />
            <HvUserPreferencesOption label="File Conflicts" icon={<Energy />} />
          </HvUserPreferencesOptionsGroup>
          <HvUserPreferencesOptionsGroup label="Display Settings">
            <HvUserPreferencesOption label="Appearance" icon={<Ghost />} />
            <HvUserPreferencesOption label="Accessibility" icon={<WhiteBoard />} />
          </HvUserPreferencesOptionsGroup>
          <HvUserPreferencesOptionsGroup label="Help and Documentation">
            <HvUserPreferencesOption label="Online Help" icon={<Help />} />
            <HvUserPreferencesOption label="Documentation" icon={<Research />} />
          </HvUserPreferencesOptionsGroup>
        </HvUserPreferencesOptions>
      </HvUserPreferences>
    </>
  );
};
WithOpenControl.story = {
  parameters: {
    docs: {
      storyDescription: "User Preferences controlled.",
    },
  },
};
