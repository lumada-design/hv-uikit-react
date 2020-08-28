import React, { useState } from "react";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import { useTheme } from "@material-ui/core";
import HvBaseDropdown from "..";
import HvPanel from "../../Panel";
import HvInput from "../../Input";
import HvButton from "../../Button";
import HvTypography from "../../Typography";
import { HvFormElement, HvWarningText, HvLabel } from "../../Forms";

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
      <HvPanel>
        <div style={{ width: "300px", height: "300px", background: theme.palette.atmo2 }}>
          <HvInput id="input-dropdown" />
        </div>
      </HvPanel>
    </HvBaseDropdown>
  );
};

WithContent.story = {
  parameters: {
    v3: true
  }
};

export const WithForms = () => {
  const theme = useTheme();
  return (
    <HvFormElement id="withForms" disabled={false}>
      <HvLabel style={{ paddingBottom: "8px", display: "block" }} label="Label" />
      <HvBaseDropdown placeholder="Placeholder...">
        <HvPanel>
          <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
        </HvPanel>
      </HvBaseDropdown>
      <HvWarningText isVisible>The description.</HvWarningText>
    </HvFormElement>
  );
};

WithForms.story = {
  parameters: {
    v3: true
  }
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <HvButton onClick={() => setOpen(!open)}>change</HvButton>
      <p />
      <HvBaseDropdown placeholder="PlaceHolder..." expanded={open} onToggle={(e, s) => setOpen(s)}>
        <HvPanel>
          <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
        </HvPanel>
      </HvBaseDropdown>
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
      aria-label="custom menu"
      component={
        <HvButton
          overrideIconColors={false}
          onClick={setterOpen}
          icon
          aria-label="Dropdown menu"
          style={{ backgroundColor: open ? theme.palette.atmo1 : undefined }}
        >
          <MoreOptionsVertical />
        </HvButton>
      }
    >
      <HvPanel>
        <div style={{ width: "500px", height: "500px", background: theme.palette.atmo2 }} />
      </HvPanel>
    </HvBaseDropdown>
  );
};

Custom.story = {
  parameters: {
    v3: true
  }
};
