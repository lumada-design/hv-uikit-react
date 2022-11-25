import React, { useMemo, useState } from "react";
import { withStyles, makeStyles, useTheme } from "@mui/styles";
import {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
  Priority5,
} from "@hitachivantara/uikit-react-icons";

import { HvDropdown, HvGrid, HvTypography } from "../..";

export default {
  title: "Inputs/Dropdown/Dropdown",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDropdown } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.4.0",
  },
  component: HvDropdown,
  decorators: [
    (Story) => (
      <div style={{ padding: 10, height: 800 }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      aria-label="Main sample"
      multiSelect
      showSearch
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
    />
  </div>
);

Main.parameters = {
  eyes: { include: false },
};

export const WithIcons = () => {
  const classes = makeStyles(() => ({
    root: {
      lineHeight: "32px",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      float: "left",
      width: 22,
      height: 22,
      margin: "5px 5px 5px 0",
    },
  }))();

  const PriorityIcon = ({ Icon, label }) => (
    <span className={classes.root}>
      <Icon className={classes.icon} />
      <HvTypography>{label}</HvTypography>
    </span>
  );

  return (
    <div style={{ width: 310 }}>
      <HvDropdown
        aria-label="Dropdown With Icons"
        values={[
          { label: <PriorityIcon Icon={Priority1} label="Priority P1" /> },
          { label: <PriorityIcon Icon={Priority2} label="Priority P2" />, selected: true },
          { label: <PriorityIcon Icon={Priority3} label="Priority P3" /> },
          { label: <PriorityIcon Icon={Priority4} label="Priority P4" /> },
          { label: <PriorityIcon Icon={Priority5} label="Priority P5" /> },
        ]}
      />
    </div>
  );
};

WithIcons.parameters = {
  docs: {
    description: { story: "Dropdown with icons along with labels" },
  },
  eyes: { include: false },
};

export const Empty = () => (
  <div style={{ width: 310 }}>
    <HvDropdown id="dropdown1" aria-label="Empty" />
  </div>
);

Empty.parameters = {
  docs: {
    description: { story: "Dropdown with no values" },
  },
  eyes: { include: false },
};

export const SingleSelection = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown7"
      aria-label="Single selection"
      onChange={(item) => console.log(item)}
      values={[
        { id: "id-1", label: "value 1", selected: true },
        { id: "id-2", label: "value 2" },
        { id: "id-3", label: "value 3" },
        { id: "id-4", label: "value 4" },
      ]}
    />
  </div>
);

SingleSelection.parameters = {
  docs: {
    description: { story: "Support ids to manage selection" },
  },
  eyes: { include: false },
};

export const MultiSelection = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown2"
      multiSelect
      showSearch
      label="Dropdown Title"
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
    />
  </div>
);

MultiSelection.parameters = {
  eyes: { include: false },
};

export const MultiSelectionNoSearch = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown5"
      aria-label="No search"
      onChange={(item) => console.log(item)}
      multiSelect
      values={[
        { id: "id-1", label: "value 1" },
        { id: "id-2", label: "value 1", selected: true },
        { id: "id-3", label: "value 3" },
        { id: "id-4", label: "value 4" },
      ]}
    />
  </div>
);

MultiSelectionNoSearch.parameters = {
  eyes: { include: false },
};

export const SingleSelectionWithSearch = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown6"
      aria-label="With search"
      showSearch
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
    />
  </div>
);

SingleSelectionWithSearch.parameters = {
  docs: {
    description: { story: "Single selection Dropdown with search and less than 10 elements" },
  },
  eyes: { include: false },
};

export const SingleSelectionNoSelection = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown8"
      aria-label="No default"
      hasTooltips
      disablePortal
      values={[
        { label: "value 1" },
        { label: "value 2" },
        { label: "value 3" },
        { label: "value 4" },
        { label: "value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5" },
      ]}
    />
  </div>
);

SingleSelectionNoSelection.parameters = {
  eyes: { include: false },
};

export const DifferentSizeAndPlacements = () => {
  const data = [
    {
      label: "value 1",
      selected: false,
    },
    {
      label: "value 2",
      selected: false,
    },
  ];

  const styles = () => ({
    dropdown: {
      width: "180px",
    },
  });

  const StyledDropdown = withStyles(styles)(HvDropdown);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <StyledDropdown
          id="dropdown1"
          aria-label="Left"
          values={data}
          multiSelect
          showSearch
          disablePortal
          placement="right"
        />
      </div>
      <div>
        <StyledDropdown
          id="dropdown2"
          aria-label="Right"
          values={data}
          multiSelect
          showSearch
          disablePortal
          placement="left"
        />
      </div>
    </div>
  );
};

DifferentSizeAndPlacements.parameters = {
  docs: {
    description: { story: "Dropdown defined with a specific width and with different placements." },
  },
  eyes: { include: false },
};

export const Disabled = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown9"
      disabled
      multiSelect
      aria-label="text"
      disablePortal
      values={[
        { label: "value 1", selected: false },
        { label: "value 2", selected: false },
        { label: "value 3", selected: true },
        { label: "value 4", selected: false },
        { label: "value 5 value 5 value 5 555555555555 value value 5", selected: false },
        { label: "value 6" },
        { label: "value 7" },
        { label: "value 8", selected: true },
        { label: "value 9", selected: true },
        { label: "value 10" },
        { label: "value 11" },
        { label: "value 12" },
      ]}
    />
  </div>
);

Disabled.parameters = {
  eyes: { include: false },
};

export const Invalid = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown9"
      status="invalid"
      statusMessage="The selection is invalid"
      multiSelect
      aria-label="text"
      disablePortal
      values={[
        { label: "value 1", selected: false },
        { label: "value 2", selected: false },
        { label: "value 3", selected: true },
        { label: "value 4", selected: false },
        { label: "value 5 value 5 value 5 555555555555 value value 5", selected: false },
        { label: "value 6" },
        { label: "value 7" },
        { label: "value 8", selected: true },
        { label: "value 9", selected: true },
        { label: "value 10" },
        { label: "value 11" },
        { label: "value 12" },
      ]}
    />
  </div>
);

Invalid.parameters = {
  eyes: { include: false },
};

export const ExternalErrorMessage = () => {
  const values1 = useMemo(
    () => [{ label: "value 1" }, { label: "value 2" }, { label: "value 3" }, { label: "value 4" }],
    []
  );

  const values2 = useMemo(
    () => [{ label: "value 1" }, { label: "value 2" }, { label: "value 3" }, { label: "value 4" }],
    []
  );

  const theme = useTheme();

  const [deathValidationState, setDeathValidationState] = useState("invalid");

  const [birthErrorMessage, setBirthErrorMessage] = useState(null);
  const [deathErrorMessage, setDeathErrorMessage] = useState("Dropdown 2 is always invalid.");

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvDropdown
            label="Dropdown 1"
            multiSelect
            values={values1}
            required
            aria-errormessage="birth-error"
            onChange={(value) => {
              if (value.length === 0) {
                setBirthErrorMessage("Select at least one value from dropdown 1.");
              } else {
                setBirthErrorMessage(null);
              }
            }}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvDropdown
            label="Dropdown 2"
            multiSelect
            values={values2}
            required
            status={deathValidationState}
            aria-errormessage="death-error"
            onChange={(value) => {
              setDeathValidationState("invalid");

              if (value.length === 0) {
                setDeathErrorMessage("Select at least one value from dropdown 2.");
              } else {
                setDeathErrorMessage(
                  `Dropdown 2 is always invalid, even with ${value.length} items selected.`
                );
              }
            }}
          />
        </HvGrid>
      </HvGrid>
      <HvGrid item xs={7}>
        <div
          style={{
            paddingTop: "10px",
            paddingLeft: "10px",
            backgroundColor: theme.hv.palette.semantic.sema9,
            color: theme.hv.palette.base.base2,
            height: "100%",
          }}
        >
          <h4>Form errors:</h4>
          <ul>
            {birthErrorMessage && (
              <li id="birth-error" aria-live="polite">
                {birthErrorMessage}
              </li>
            )}
            {deathErrorMessage && (
              <li id="death-error" aria-live="polite">
                {deathErrorMessage}
              </li>
            )}
          </ul>
        </div>
      </HvGrid>
    </HvGrid>
  );
};

ExternalErrorMessage.parameters = {
  docs: {
    description: {
      story:
        "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
    },
  },
};

export const WithDefinedHeight = () => {
  const values1 = [];
  for (let i = 0; i < 100; i += 1) {
    values1.push({
      id: `${i}`,
      label: `value  ${i}`,
    });
  }

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvDropdown
            aria-label="With defined height"
            values={values1}
            height={350}
            hasTooltips
            showSearch
          />
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};

WithDefinedHeight.parameters = {
  docs: {
    description: {
      story:
        "Experimental Dropdown with height defined. Note: only validated in the single selection use-case.",
    },
  },
  eyes: { include: false },
};

export const WithMaxHeight = () => {
  const values1 = [];
  for (let i = 0; i < 4; i += 1) {
    values1.push({
      id: `${i}`,
      label: `value  ${i}`,
    });
  }

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvDropdown
            aria-label="With max height"
            values={values1}
            maxHeight={350}
            hasTooltips
            showSearch
          />
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};

WithMaxHeight.parameters = {
  docs: {
    description: {
      story:
        "Experimental Dropdown with max height defined. Note: only validated in the single selection use-case.",
    },
  },
  eyes: { include: false },
};

export const WithMoreThan1000Items = () => {
  const values1 = [];
  for (let i = 0; i < 1500; i += 1) {
    values1.push({
      id: `${i}`,
      label: `value  ${i}`,
    });
  }

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvDropdown
            aria-label="More than 1000 items"
            values={values1}
            virtualized
            height={350}
            hasTooltips
            showSearch
          />
        </HvGrid>
      </HvGrid>
    </HvGrid>
  );
};

WithMoreThan1000Items.parameters = {
  docs: {
    description: {
      story:
        "Experimental Dropdown with virtualized list, which handles performance in lists with a lot of options. Note: only validated in the single selection use-case.",
    },
  },
  eyes: { include: false },
};

export const ReadOnly = () => (
  <div style={{ width: 310 }}>
    <HvDropdown
      id="dropdown10"
      readOnly
      aria-label="text"
      disablePortal
      values={[
        { label: "value 1", selected: false },
        { label: "value 2", selected: false },
        { label: "value 3", selected: true },
        { label: "value 4", selected: false },
      ]}
    />
  </div>
);

ReadOnly.parameters = {
  eyes: { include: false },
};
