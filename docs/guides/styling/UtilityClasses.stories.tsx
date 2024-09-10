import { StoryObj } from "@storybook/react";
import {
  HvButton,
  HvDropdown,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Abacus,
  Alert,
  DropRightXS,
  InProgress,
} from "@hitachivantara/uikit-react-icons";

import { setupChromatic } from ".storybook/setupChromatic";

export default {
  title: "Guides/Styling/Utility Classes",
};

export const LayoutAndTheme: StoryObj = {
  render: () => (
    <section className="flex flex-row w-500px justify-center gap-sm p-sm">
      <div className="w-10 h-10 rounded bg-positive" />
      <div className="w-11 h-11 rounded bg-warning" />
      <div className="w-12 h-12 rounded bg-negative" />
      <div className="w-12 h-12 rounded bg-primary_20" />
    </section>
  ),
};

export const Breakpoints: StoryObj = {
  render: () => (
    <section className="grid gap-xs grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
      {[...Array(12).keys()].map((i) => (
        <div key={i} className="h-10 bg-atmo3 flex items-center justify-center">
          <HvTypography variant="title3">{i + 1}</HvTypography>
        </div>
      ))}
    </section>
  ),
};

export const OverridingClasses: StoryObj = {
  render: () => (
    <HvDropdown
      label="Label"
      values={[{ label: "Val1" }, { label: "Val2" }]}
      classes={{
        root: "w-200px",
        label: "color-primary",
        placeholder: "color-primary",
      }}
    />
  ),
};

export const Animations: StoryObj = {
  render: () => (
    <div className="flex gap-xs">
      <HvButton icon>
        <DropRightXS className="transition-transform hover:rotate-90" />
      </HvButton>
      <HvButton icon>
        <Alert className="hover:animate-swing" />
      </HvButton>
      <InProgress className="animate-spin" />
    </div>
  ),
};

export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(),
    docs: { disable: true },
  },
  render: () => (
    <>
      <HvTypography variant="title4">Z-Index & Colors</HvTypography>
      <section className="flex bg-default [&>div]:-mr-2">
        <div className="w-12 h-12 bg-positive z-modal" />
        <div className="w-11 h-11 bg-warning z-docked" />
        <div className="w-10 h-10 bg-warning_120 z-8" />
        <div className="w-9 h-9 bg-base_dark" />
        <div className="w-8 h-8 bg-negative -z-1" />
      </section>
      <br />
      <HvTypography variant="title4">Radius & Spacing</HvTypography>
      <section className="flex gap-xs">
        {[
          "rounded-none m-1",
          "rounded-base my-sm",
          "rounded mr-md",
          "rounded-2",
          "rounded-circle",
        ].map((classes) => (
          <div key={classes} className="bg-secondary p-xs">
            <div className={`w-8 h-8 bg-primary ${classes}`} />
          </div>
        ))}
      </section>
      <br />
      <HvTypography variant="title4">Text & icons</HvTypography>
      <section>
        <div className="flex items-center text-warning">
          <Abacus color="currentColor" />
          <span>Text goes here</span>
        </div>
      </section>
    </>
  ),
};
