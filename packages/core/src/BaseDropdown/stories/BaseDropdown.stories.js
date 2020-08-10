import React, { useState } from "react";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import { useTheme } from "@material-ui/core";
import HvBaseDropdown from "..";
import HvInput from "../../Input";
import HvButton from "../../Button";
import HvTypography from "../../Typography";
import { HvFormElement, HvInfoMessage, HvLabel } from "../../Forms";

export default {
  title: "Components/BaseDropdown",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBaseDropdown } from '@hv/uikit-react-core/dist'"
  },
  component: HvBaseDropdown
};

export const Main = () => <HvBaseDropdown placeholder="Placeholder..." />;

Main.story = {
  parameters: {
    v3: true,
    pa11y: {
      ignore: ["region"]
    }
  }
};

export const WithContent = () => {
  const theme = useTheme();
  return (
    <HvBaseDropdown
      placeholder={<HvTypography id="labelTypography">Placeholder</HvTypography>}
      aria-labelledby="labelTypography"
    >
      <div style={{ width: "300px", height: "300px", background: theme.palette.atmo2 }}>
        <HvInput id="input-dropdown" />
      </div>
    </HvBaseDropdown>
  );
};

WithContent.story = {
  parameters: {
    v3: true
  }
};

export const WithForms = () => (
  <HvFormElement id="withForms" disabled={false}>
    <HvLabel style={{ paddingBottom: "8px", display: "block" }} label="Label" />
    <HvBaseDropdown placeholder="Placeholder..." />
    <HvInfoMessage disableGutter style={{ paddingTop: "8px", display: "block" }}>
      The description.
    </HvInfoMessage>
  </HvFormElement>
);

WithForms.story = {
  parameters: {
    v3: true
  }
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HvButton onClick={() => setOpen(!open)}>change</HvButton>
      <p />
      <HvBaseDropdown
        placeholder="PlaceHolder..."
        expanded={open}
        onToggle={(e, s) => setOpen(s)}
      />
    </>
  );
};

Controlled.story = {
  parameters: {
    v3: true
  }
};

export const Custom = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const setterOpen = () => setOpen(!open);

  return (
    <HvBaseDropdown
      expanded={open}
      onClickOutside={setterOpen}
      component={
        <HvButton
          overrideIconColors={false}
          onClick={setterOpen}
          category="icon"
          aria-label="Dropdown menu"
          style={{ backgroundColor: open ? theme.palette.atmo1 : undefined }}
        >
          <MoreOptionsVertical />
        </HvButton>
      }
    >
      <div style={{ width: "500px", height: "500px", background: theme.palette.atmo2 }} />
    </HvBaseDropdown>
  );
};

Custom.story = {
  parameters: {
    v3: true
  }
};
