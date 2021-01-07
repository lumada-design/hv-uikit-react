import React, { useState } from "react";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import { useTheme } from "@material-ui/core";
import { HvBaseDropdown, HvButton, HvInput, HvPanel } from "../..";
import { HvFormElement, HvWarningText, HvLabel } from "../../Forms";

export default {
  title: "Tests/Base Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvBaseDropdown } from '@hv/uikit-react-core/dist'",
    dsVersion: "3.3.0",
  },
  component: HvBaseDropdown,
};

export const Main = () => <HvBaseDropdown placeholder="Placeholder..." aria-label="Main sample" />;

Main.parameters = {
  pa11y: {
    ignore: ["region"],
  },
};

export const WithContent = () => {
  const theme = useTheme();

  return (
    <HvBaseDropdown placeholder="Placeholder..." aria-label="With content">
      <HvPanel>
        <div style={{ width: "300px", height: "300px", background: theme.palette.atmo2 }}>
          <HvInput id="input-dropdown" />
        </div>
      </HvPanel>
    </HvBaseDropdown>
  );
};

export const WithForms = () => {
  const theme = useTheme();
  return (
    <HvFormElement id="withForms">
      <HvLabel
        id="withForms-label"
        style={{ paddingBottom: "6px", display: "block" }}
        label="Label"
      />
      <HvBaseDropdown placeholder="Placeholder..." aria-labelledby="withForms-label">
        <HvPanel>
          <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
        </HvPanel>
      </HvBaseDropdown>
      <HvWarningText disableBorder isVisible>
        The description.
      </HvWarningText>
    </HvFormElement>
  );
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <HvButton onClick={() => setOpen(!open)}>Toggle</HvButton>
      <p />
      <HvBaseDropdown
        placeholder="Placeholder..."
        aria-label="Controlled"
        expanded={open}
        onToggle={(e, s) => setOpen(s)}
      >
        <HvPanel>
          <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
        </HvPanel>
      </HvBaseDropdown>
    </>
  );
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
