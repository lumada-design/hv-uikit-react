/* eslint-disable no-console */
import React, { useState } from "react";
import { Email, Energy, Ghost, WhiteBoard } from "@hitachivantara/uikit-react-icons";
import HvButton from "../../Button";
import HvUserPreferences, {
  HvUserPreferencesAction,
  HvUserPreferencesActions,
  HvUserPreferencesOptionsGroup,
  HvUserPreferencesOptionsGroupLabel,
  HvUserPreferencesOption,
  HvUserPreferencesOptions,
} from "..";

export default {
  title: "Tests/User Preferences",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const TwoButtons = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton id="buttonTop" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
      <HvUserPreferences
        id="user-preferences"
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
      >
        <HvUserPreferencesActions>
          <HvUserPreferencesAction
            label="Log Out"
            id="action1"
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </HvUserPreferencesActions>
        <HvUserPreferencesOptions
          onClick={(event, data) => {
            console.log(`HvUserPreferencesOption ${data.label} selected`);
          }}
        >
          <HvUserPreferencesOptionsGroup aria-labelledby="messages">
            <HvUserPreferencesOptionsGroupLabel id="messages">
              Messages
            </HvUserPreferencesOptionsGroupLabel>
            <HvUserPreferencesOption id="option1" label="Sharing Messages" icon={<Email />} />
            <HvUserPreferencesOption id="option2" label="File Conflicts" icon={<Energy />} />
          </HvUserPreferencesOptionsGroup>
          <HvUserPreferencesOptionsGroup label="Display Settings">
            <HvUserPreferencesOption id="option3" label="Appearance" icon={<Ghost />} />
            <HvUserPreferencesOption id="option4" label="Accessibility" icon={<WhiteBoard />} />
          </HvUserPreferencesOptionsGroup>
        </HvUserPreferencesOptions>
      </HvUserPreferences>
      <HvButton id="buttonBottom" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
    </>
  );
};
