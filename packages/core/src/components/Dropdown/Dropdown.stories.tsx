import { useEffect, useMemo, useState } from "react";
import { css } from "@emotion/css";
import { fireEvent, screen, waitFor } from "@storybook/testing-library";
import { DecoratorFn, Meta, StoryObj } from "@storybook/react";
import {
  Priority1,
  Priority2,
  Priority3,
  Priority4,
  Priority5,
} from "@hitachivantara/uikit-react-icons";
import {
  HvDropdown,
  HvDropdownProps,
  HvDropdownStatus,
  HvGrid,
  HvListValue,
  theme,
} from "@hitachivantara/uikit-react-core";

const widthDecorator: DecoratorFn = (Story) => (
  <div style={{ minHeight: 120, width: 310 }}>{Story()}</div>
);

export default {
  title: "Components/Dropdown",
  component: HvDropdown,
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("combobox"));
        return waitFor(() => screen.getByRole("listbox"));
      },
    },
  },
} as Meta<typeof HvDropdown>;

export const Main: StoryObj<HvDropdownProps> = {
  args: {
    multiSelect: true,
    showSearch: true,
    disabled: false,
    readOnly: false,
    required: false,
    defaultExpanded: true,
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
  parameters: {
    eyes: {
      runBefore() {},
    },
  },
  decorators: [
    widthDecorator,
    (Story) => <div style={{ minHeight: 400 }}>{Story()}</div>,
  ],
  render: (args) => (
    <HvDropdown
      label="Select values"
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
      {...args}
    />
  ),
};

export const Variants: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Dropdown in their various form state variants.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className={css({
          display: "flex",
          flexFlow: "row wrap",
          gap: 16,
          "& > *": {
            width: 200,
          },
        })}
      >
        {Story()}
      </div>
    ),
  ],
  render: () => (
    <>
      <HvDropdown required label="Required" />
      <HvDropdown disabled label="Disabled" />
      <HvDropdown readOnly label="Read-only" />
      <HvDropdown status="invalid" label="Invalid" />
    </>
  ),
};

const PriorityIcon = ({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) => (
  <span
    className={css({
      lineHeight: "32px",
      display: "flex",
      alignItems: "center",
    })}
  >
    <Icon
      iconSize={{ width: 22, height: 22 }}
      className={css({ float: "left", margin: "5px 5px 5px 0" })}
    />
    <h3>{label}</h3>
  </span>
);

export const WithIcons: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story: "Single selection Dropdown with icons along with labels",
      },
    },
  },
  decorators: [widthDecorator],
  render: (args) => {
    const [values, setValues] = useState<HvListValue[]>([]);

    useEffect(() => {
      const icons = [Priority1, Priority2, Priority3, Priority4, Priority5];

      setValues(
        icons.map((Icon, i) => ({
          id: `p${i + 1}`,
          label: <PriorityIcon Icon={Icon} label={`Priority P${i + 1}`} />,
        }))
      );
    }, []);

    return (
      <HvDropdown aria-label="Dropdown With Icons" values={values} {...args} />
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
    eyes: { include: false },
  },
  decorators: [widthDecorator],
  render: () => <HvDropdown aria-label="Empty" />,
};

export const MultiSelection: StoryObj<HvDropdownProps> = {
  decorators: [widthDecorator],
  render: () => {
    return (
      <HvDropdown
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
  decorators: [widthDecorator],
  render: () => (
    <HvDropdown
      aria-label="With search"
      showSearch
      values={[
        { label: "value 1" },
        { label: "value 2", selected: true },
        { label: "value 3" },
        { label: "value 4" },
      ]}
    />
  ),
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
        <HvGrid item xs={12} sm={6}>
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
        <HvGrid item xs={12} sm={6}>
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
        <HvGrid item xs={12}>
          <div
            style={{
              maxWidth: 600,
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
          "Dropdown's height can be configured using `height` (or `maxHeight`). Note: only validated in the single selection use-case.",
      },
    },
    eyes: { include: false },
  },
  decorators: [widthDecorator],
  render: () => {
    const values = [...Array(100)].map((_, i) => ({
      id: `${i}`,
      label: `value  ${i}`,
    }));

    return (
      <HvDropdown
        aria-label="With defined height"
        values={values}
        height={350}
        hasTooltips
        showSearch
      />
    );
  },
};

export const Virtualized: StoryObj<HvDropdownProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Experimental Dropdown with virtualized list, which handles performance in lists with a lot of options. Note: only validated in the single selection use-case.",
      },
    },
    eyes: { include: false },
  },
  decorators: [widthDecorator],
  render: () => {
    const values = [...Array(1500)].map((_, i) => ({
      id: `${i}`,
      label: `value  ${i}`,
    }));

    return (
      <HvDropdown
        aria-label="More than 1000 items"
        values={values}
        virtualized
        height={350}
        hasTooltips
        showSearch
      />
    );
  },
};
