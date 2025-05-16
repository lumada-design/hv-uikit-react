import { useState } from "react";
import { css } from "@emotion/css";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HvBaseCheckBox,
  HvCheckBox,
  HvCheckBoxProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvCheckBox> = {
  title: "Components/Checkbox/Checkbox",
  component: HvCheckBox,
  // @ts-ignore https://github.com/storybookjs/storybook/issues/23170
  subcomponents: { HvBaseCheckBox },
  decorators: [
    (Story) => (
      <div className="flex flex-wrap items-center gap-xs">{Story()}</div>
    ),
  ],
};

export default meta;

export const Main: StoryObj<HvCheckBoxProps> = {
  args: { label: "Checkbox 0" },
  argTypes: {
    classes: { control: { disable: true } },
    statusMessage: { control: { disable: true } },
    status: { control: { disable: true } },
    labelProps: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <>
        <HvCheckBox {...args} />
        <HvCheckBox label="Checkbox 1" />
        <HvCheckBox defaultChecked label="Checkbox 2" />
        <HvCheckBox indeterminate label="Checkbox 3" />
      </>
    );
  },
};

export const Variants: StoryObj<HvCheckBoxProps> = {
  render: () => {
    const styles = {
      root: "flex flex-col flex-wrap gap-sm",
      group: "flex gap-sm",
    };

    return (
      <div className={styles.root}>
        <HvTypography variant="title3">Disabled</HvTypography>
        <div className={styles.group}>
          <HvCheckBox disabled label="Checkbox 1" />
          <HvCheckBox defaultChecked disabled label="Checkbox 2" />
          <HvCheckBox indeterminate disabled label="Checkbox 3" />
        </div>
        <HvTypography variant="title3">Readonly</HvTypography>
        <div className={styles.group}>
          <HvCheckBox readOnly label="Checkbox 1" />
          <HvCheckBox defaultChecked readOnly label="Checkbox 2" />
          <HvCheckBox indeterminate readOnly label="Checkbox 3" />
        </div>
        <HvTypography variant="title3">Required</HvTypography>
        <div className={styles.group}>
          <HvCheckBox required label="Checkbox 1" />
          <HvCheckBox required defaultChecked label="Checkbox 2" />
          <HvCheckBox required indeterminate label="Checkbox 3" />
        </div>
        <HvTypography variant="title3">Invalid</HvTypography>
        <div className={styles.group}>
          <HvCheckBox
            status="invalid"
            statusMessage="No way for this to be valid!"
            label="Checkbox 1"
          />
          <HvCheckBox
            status="invalid"
            statusMessage="No way for this to be valid!"
            defaultChecked
            label="Checkbox 2"
          />
          <HvCheckBox
            status="invalid"
            statusMessage="No way for this to be valid!"
            indeterminate
            label="Checkbox 3"
          />
        </div>
        <HvTypography variant="title3">No label</HvTypography>
        <div className={styles.group}>
          <HvCheckBox aria-label="Checkbox 1" />
          <HvCheckBox defaultChecked aria-label="Checkbox 2" />
          <HvCheckBox indeterminate aria-label="Checkbox 3" />
        </div>
        <HvTypography variant="title3">Semantic</HvTypography>
        <div className={styles.group}>
          <HvCheckBox semantic aria-label="Checkbox 1" />
          <HvCheckBox semantic defaultChecked aria-label="Checkbox 2" />
          <HvCheckBox semantic indeterminate aria-label="Checkbox 3" />
        </div>
      </div>
    );
  },
};

export const Controlled: StoryObj<HvCheckBoxProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled checkbox. Clicking the Checkbox 1 does nothing, while clicking Checkbox 2 changes both inputs.",
      },
    },
  },
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <>
        <HvCheckBox checked={isChecked} label="Checkbox 1" />
        <HvCheckBox
          checked={isChecked}
          onChange={(_, checked) => setIsChecked(checked)}
          label="Checkbox 2"
        />
      </>
    );
  },
};

export const Custom: StoryObj<HvCheckBoxProps> = {
  render: () => {
    const styles = {
      box: css({
        "& svg": {
          borderRadius: "6px",
          borderColor: theme.colors.warning,
        },
      }),
      checked: css({
        "& svg": {
          borderColor: theme.colors.warning,
          backgroundColor: theme.colors.warning,
          color: theme.colors.textDimmed,
        },
      }),
      indeterminate: css({
        "& svg": {
          borderColor: theme.colors.warningDeep,
          backgroundColor: theme.colors.warningDeep,
          color: theme.colors.textDimmed,
        },
      }),
    };

    return (
      <>
        <HvCheckBox
          label="Checkbox 1"
          classes={{ root: styles.box, checked: styles.checked }}
        />
        <HvCheckBox
          label="Checkbox 1"
          indeterminate
          classes={{
            root: styles.box,
            checked: styles.checked,
            indeterminate: styles.indeterminate,
          }}
        />
      </>
    );
  },
};

export const Test: StoryObj<HvCheckBoxProps> = {
  render: () => (
    <>
      <HvCheckBox disabled label="Checkbox 1" />
      <HvCheckBox defaultChecked disabled label="Checkbox 2" />
      <HvCheckBox indeterminate disabled label="Checkbox 3" />
      <HvCheckBox readOnly label="Checkbox 1" />
      <HvCheckBox defaultChecked readOnly label="Checkbox 2" />
      <HvCheckBox indeterminate readOnly label="Checkbox 3" />
      <HvCheckBox required label="Checkbox 1" />
      <HvCheckBox required defaultChecked label="Checkbox 2" />
      <HvCheckBox required indeterminate label="Checkbox 3" />
      <HvCheckBox
        status="invalid"
        statusMessage="No way for this to be valid!"
        label="Checkbox 1"
      />
      <HvCheckBox
        status="invalid"
        statusMessage="No way for this to be valid!"
        defaultChecked
        label="Checkbox 2"
      />
      <HvCheckBox
        status="invalid"
        statusMessage="No way for this to be valid!"
        indeterminate
        label="Checkbox 3"
      />
      <div>
        <HvCheckBox aria-label="Checkbox 1" />
        <HvCheckBox defaultChecked aria-label="Checkbox 2" />
        <HvCheckBox indeterminate aria-label="Checkbox 3" />
        <HvCheckBox semantic aria-label="Checkbox 1" />
        <HvCheckBox semantic defaultChecked aria-label="Checkbox 2" />
        <HvCheckBox semantic indeterminate aria-label="Checkbox 3" />
      </div>
    </>
  ),
};
