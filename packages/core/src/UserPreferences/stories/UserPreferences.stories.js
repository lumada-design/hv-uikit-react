import React, { useState } from "react";
import {
  BarChart,
  Components,
  Email,
  Energy,
  GameController,
  Ghost,
  Help,
  People,
  Research,
  User,
  WhiteBoard,
} from "@hv/uikit-react-icons";
import { HvButton } from "../..";
import HvUserPreferences, { Action, Actions, Group, Label, Option, Options } from "..";

export default {
  title: "Patterns/User Preferences",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvUserPreferences } from '@hv/uikit-react-core/dist'",
    subcomponents: { Action, Actions, Group, Options, Option, Label },
  },
  component: HvUserPreferences,
};

export const Main = () => (
  <HvUserPreferences
    id="userPreferences"
    isOpen
    userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
  >
    <Actions>
      <Action
        label="Log Out"
        onClick={(event, data) => {
          console.log(`action ${data.label} selected`);
        }}
      />
    </Actions>
    <Options onClick={(event, payload) => console.log(`id:${payload.id} label:${payload.label}`)}>
      <Group>
        <Option label="Personal Information" icon={<User />} />
        <Option label="Manage Groups" icon={<People />} />
        <Option label="Usage" icon={<BarChart />} />
        <Option label="Devices" icon={<GameController />} />
        <Option label="Recover Files" icon={<Components />} />
      </Group>
      <Group aria-labelledby="messages">
        <Label id="messages">Messages</Label>
        <Option label="Sharing Messages" icon={<Email />} />
        <Option label="File Conflicts" icon={<Energy />} />
      </Group>
      <Group label="Display Settings">
        <Option label="Appearance" icon={<Ghost />} />
        <Option label="Accessibility" icon={<WhiteBoard />} />
      </Group>
      <Group label="Help and Documentation">
        <Option label="Online Help" icon={<Help />} />
        <Option label="Documentation" icon={<Research />} />
      </Group>
    </Options>
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
        <Actions>
          <Action
            label="Log Out"
            onClick={(event, data) => {
              console.log(`action ${data.label} selected`);
            }}
          />
        </Actions>
        <Options
          onClick={(event, payload) => console.log(`id:${payload.id} label:${payload.label}`)}
        >
          <Group>
            <Option label="Personal Information" icon={<User />} />
            <Option label="Manage Groups" icon={<People />} />
            <Option label="Usage" icon={<BarChart />} />
            <Option label="Devices" icon={<GameController />} />
            <Option label="Recover Files" icon={<Components />} />
          </Group>
          <Group aria-labelledby="messages">
            <Label id="messages">Messages</Label>
            <Option label="Sharing Messages" icon={<Email />} />
            <Option label="File Conflicts" icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option label="Appearance" icon={<Ghost />} />
            <Option label="Accessibility" icon={<WhiteBoard />} />
          </Group>
          <Group label="Help and Documentation">
            <Option label="Online Help" icon={<Help />} />
            <Option label="Documentation" icon={<Research />} />
          </Group>
        </Options>
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
