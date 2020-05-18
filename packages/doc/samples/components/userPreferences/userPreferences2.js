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
  Email,
  Energy,
  Ghost,
  LogOut,
  WhiteBoard
} from "@hv/uikit-react-icons/dist/Generic";
import { HvButton } from "@hv/uikit-react-core/dist";

const Example = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <HvButton id="buttonTop" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
      <UserPreferences
        id="user-preferences"
        isOpen={open}
        userInfo={{ label1: "Gabriela Jennings", label2: "Admin, Rean Test" }}
      >
        <Actions>
          <Action label="Logout" id="action1" icon={<LogOut />} />
        </Actions>
        <Options>
          <Group aria-labelledby="messages">
            <Label id="messages">Messages</Label>
            <Option label={"Sharing Messages"} id="option1" icon={<Email />} />
            <Option label={"File Conflicts"} id="option2" icon={<Energy />} />
          </Group>
          <Group label="Display Settings">
            <Option label={"Appearance"} id="option3" icon={<Ghost />} />
            <Option
              label={"Accessibility"}
              id="option4"
              icon={<WhiteBoard />}
            />
          </Group>
        </Options>
      </UserPreferences>
      <HvButton id="buttonBottom" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </HvButton>
    </>
  );
};

export default <Example />;
