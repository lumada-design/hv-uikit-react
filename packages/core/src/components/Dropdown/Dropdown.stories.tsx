import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
  Priority5,
} from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { HvGrid, HvListValue } from "@core/components";
import { useEffect, useMemo, useState } from "react";
import { HvDropdown, HvDropdownProps } from "./Dropdown";
import { HvDropdownStatus } from "./types";

export default {
  title: "Components/Dropdown",
  component: HvDropdown,
  decorators: [
    (Story) => <div style={{ padding: 10, height: 600 }}>{Story()}</div>,
  ],
} as Meta<typeof HvDropdown>;

export const Main: StoryObj<HvDropdownProps> = {
  args: {
    multiSelect: true,
    showSearch: true,
    disabled: false,
    readOnly: false,
    required: false,
    expanded: true,
    notifyChangesOnFirstRender: false,
    hasTooltips: false,
    variableWidth: false,
    singleSelectionToggle: false,
    virtualized: false,
    status: "valid",
  },
  argTypes: {
    classes: { control: { disable: true } },
    label: { control: { disable: true } },
    popperProps: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          aria-label="Main sample"
          values={[
            { label: "value 1" },
            { label: "value 2", selected: true },
            { label: "value 3" },
            { label: "value 4" },
          ]}
          {...args}
        />
      </div>
    );
  },
};

const StyledSpan = styled("span")({
  lineHeight: "32px",
  display: "flex",
  alignItems: "center",
});

const PriorityIcon = ({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) => (
  <StyledSpan>
    <Icon
      style={{ float: "left", width: 22, height: 22, margin: "5px 5px 5px 0" }}
    />
    <h3>{label}</h3>
  </StyledSpan>
);

export const WithIcons: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown with icons along with labels",
      },
    },
  },
  render: (args) => {
    const [values, setValues] = useState<HvListValue[]>([]);

    useEffect(() => {
      setValues([
        { label: <PriorityIcon Icon={Priority1} label="Priority P1" /> },
        {
          label: <PriorityIcon Icon={Priority2} label="Priority P2" />,
          selected: true,
        },
        { label: <PriorityIcon Icon={Priority3} label="Priority P3" /> },
        { label: <PriorityIcon Icon={Priority4} label="Priority P4" /> },
        { label: <PriorityIcon Icon={Priority5} label="Priority P5" /> },
      ]);
    }, []);

    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          expanded
          aria-label="Dropdown With Icons"
          values={values}
          {...args}
        />
      </div>
    );
  },
};

export const Empty: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown with no values",
      },
    },
  },
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown expanded id="dropdown1" aria-label="Empty" />
      </div>
    );
  },
};

export const SingleSelection: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Support ids to manage selection",
      },
    },
  },
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          id="dropdown7"
          aria-label="Single selection"
          expanded
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
  },
};

export const MultiSelection: StoryObj<HvDropdownProps> = {
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          id="dropdown2"
          multiSelect
          showSearch
          expanded
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
  },
};

export const MultiSelectionNoSearch: StoryObj<HvDropdownProps> = {
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          id="dropdown5"
          aria-label="No search"
          onChange={(item) => console.log(item)}
          expanded
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
  },
};

export const SingleSelectionWithSearch: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Single selection Dropdown with search and less than 10 elements",
      },
    },
  },
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          id="dropdown6"
          aria-label="With search"
          showSearch
          expanded
          values={[
            { label: "value 1" },
            { label: "value 2", selected: true },
            { label: "value 3" },
            { label: "value 4" },
          ]}
        />
      </div>
    );
  },
};

export const SingleSelectionNoSelection: StoryObj<HvDropdownProps> = {
  render: () => {
    return (
      <div style={{ width: 310 }}>
        <HvDropdown
          id="dropdown8"
          aria-label="No default"
          expanded
          hasTooltips
          disablePortal
          values={[
            { label: "value 1" },
            { label: "value 2" },
            { label: "value 3" },
            { label: "value 4" },
            {
              label:
                "value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5 value 5",
            },
          ]}
        />
      </div>
    );
  },
};

const StyledDropdown = styled(HvDropdown)({
  width: "180px",
});

export const DifferentSizeAndPlacements: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown defined with a specific width and with different placements.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
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
  },
};

export const Disabled: StoryObj<HvDropdownProps> = {
  render: () => {
    return (
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
            {
              label: "value 5 value 5 value 5 555555555555 value value 5",
              selected: false,
            },
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
  },
};

export const Invalid: StoryObj<HvDropdownProps> = {
  render: () => {
    return (
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
            {
              label: "value 5 value 5 value 5 555555555555 value value 5",
              selected: false,
            },
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
  },
};

export const ExternalErrorMessage: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const values1 = useMemo(
      () => [
        { label: "value 1" },
        { label: "value 2" },
        { label: "value 3" },
        { label: "value 4" },
      ],
      []
    );

    const values2 = useMemo(
      () => [
        { label: "value 1" },
        { label: "value 2" },
        { label: "value 3" },
        { label: "value 4" },
      ],
      []
    );

    const [deathValidationState, setDeathValidationState] = useState("invalid");

    const [birthErrorMessage, setBirthErrorMessage] = useState<string | null>(
      null
    );
    const [deathErrorMessage, setDeathErrorMessage] = useState(
      "Dropdown 2 is always invalid."
    );

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
                if ((value as HvListValue[]).length === 0) {
                  setBirthErrorMessage(
                    "Select at least one value from dropdown 1."
                  );
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
              status={deathValidationState as HvDropdownStatus}
              aria-errormessage="death-error"
              onChange={(value) => {
                setDeathValidationState("invalid");

                if ((value as HvListValue[]).length === 0) {
                  setDeathErrorMessage(
                    "Select at least one value from dropdown 2."
                  );
                } else {
                  setDeathErrorMessage(
                    `Dropdown 2 is always invalid, even with ${
                      (value as HvListValue[]).length
                    } items selected.`
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
              paddingLeft: "20px",
              backgroundColor: theme.colors.negative_20,
              color: theme.colors.base_dark,
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
  },
};

export const WithDefinedHeight: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with height defined. Note: only validated in the single selection use-case.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const values1: any[] = [];
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
  },
};

export const WithMaxHeight: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with max height defined. Note: only validated in the single selection use-case.",
      },
    },
    eyes: { include: false },
  },
  render: () => {
    const values1: any[] = [];
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
  },
};

export const WithMoreThan1000Items: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with virtualized list, which handles performance in lists with a lot of options. Note: only validated in the single selection use-case.",
      },
    },
    eyes: { include: false },
  },

  render: () => {
    const values1: any[] = [];
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
  },
};
