import React, { useState } from "react";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import { useTheme } from "@material-ui/core";
import { HvBaseDropdown, HvButton, HvInput, HvPanel } from "../..";
import { HvFormElement, HvWarningText, HvLabel } from "../../Forms";

export default {
  title: "Tests/Base Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvBaseDropdown } from "@hv/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvBaseDropdown,
  decorators: [
    (Story) => (
      <div style={{ height: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <div style={{ width: 121 }}>
    <HvBaseDropdown placeholder="Placeholder..." aria-label="Main sample" />
  </div>
);

export const WithContent = () => {
  const theme = useTheme();

  const setFocusToInput = (containerRef) => {
    containerRef?.getElementsByTagName("input")[0]?.focus();
  };

  return (
    <div style={{ width: 121 }}>
      <HvBaseDropdown
        placeholder="Placeholder..."
        aria-label="With content"
        onContainerCreation={setFocusToInput}
      >
        <HvPanel>
          <div style={{ width: "300px", height: "300px", background: theme.palette.atmo2 }}>
            <HvInput id="input-dropdown" />
          </div>
        </HvPanel>
      </HvBaseDropdown>
    </div>
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
      <div style={{ width: 121 }}>
        <HvBaseDropdown placeholder="Placeholder..." aria-labelledby="withForms-label">
          <HvPanel>
            <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
          </HvPanel>
        </HvBaseDropdown>
      </div>
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
      <div style={{ width: 121 }}>
        <HvBaseDropdown
          placeholder="Placeholder..."
          aria-label="Controlled"
          expanded={open}
          disablePortal={false}
          onToggle={(e, s) => setOpen(s)}
        >
          <HvPanel>
            <div style={{ width: "270px", height: "300px", background: theme.palette.atmo2 }} />
          </HvPanel>
        </HvBaseDropdown>
      </div>
    </>
  );
};

export const Custom = () => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const setterOpen = () => setOpen(!open);

  return (
    <div style={{ width: 32 }}>
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
    </div>
  );
};
