import { StoryObj } from "@storybook/react";
import { Abacus } from "@hitachivantara/uikit-react-icons";
import { HvTypography } from "@hitachivantara/uikit-react-core";

export default {
  title: "Tests/Uno",
  parameters: {
    eyes: { include: true },
    docs: { disable: true },
  },
};

export const UnoClasses: StoryObj = {
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
