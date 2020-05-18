import React, { useState } from "react";
import UserPreferences, {
  Action,
  Actions,
  Group,
  Label,
  Option,
  Options
} from "@hv/uikit-react-core/dist/UserPreferences";
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
  WhiteBoard
} from "@hv/uikit-react-icons/dist/Generic";
import { HvButton } from "@hv/uikit-react-core/dist";

const Example = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
      <UserPreferences
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
      >
        <Actions>
          <Action
            label="Logout"
            icon={<LogOut />}
            onClick={(event, data) => {
              alert(`action ${data.label} selected`);
            }}
          />
        </Actions>
        <Options
          onClick={(event, payload) =>
            alert(`id:${payload.id} label:${payload.label}`)
          }
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
            <Option label={"Sharing Messages"} icon={<Email />} />
            <Option label={"File Conflicts"} icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option label={"Appearance"} icon={<Ghost />} />
            <Option label={"Accessibility"} icon={<WhiteBoard />} />
          </Group>
          <Group label="Help and Documentation">
            <Option label={"Online Help"} icon={<Help />} />
            <Option label={"Documentation"} icon={<Research />} />
          </Group>
        </Options>
      </UserPreferences>
    </>
  );
};

export default <Example />;
