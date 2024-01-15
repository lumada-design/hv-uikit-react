/* eslint-disable no-console */
import React, { useState } from "react";
import { Email, Energy, Ghost, LogOut, WhiteBoard } from "@hitachivantara/uikit-react-icons";
import HvButton from "../../Button";
import HvUserPreferences, { Action, Actions, Group, Label, Option, Options } from "..";

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
        <Actions>
          <Action
            id="action1"
            label="Logout"
            icon={<LogOut />}
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </Actions>
        <Options
          onClick={(event, data) => {
            console.log(`Option ${data.label} selected`);
          }}
        >
          <Group aria-labelledby="messages">
            <Label id="messages">Messages</Label>
            <Option id="option1" label="Sharing Messages" icon={<Email />} />
            <Option id="option2" label="File Conflicts" icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option id="option3" label="Appearance" icon={<Ghost />} />
            <Option id="option4" label="Accessibility" icon={<WhiteBoard />} />
          </Group>
        </Options>
      </HvUserPreferences>
      <HvButton id="buttonBottom" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
    </>
  );
};
