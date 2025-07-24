import { HvTypography, pentahoPlus } from "@hitachivantara/uikit-react-core";

globalThis.pentahoPlus = pentahoPlus;

declare module "@hitachivantara/uikit-styles" {
  interface HvThemeVars {
    otherColors: {
      gray: {
        strong: string;
        subtle: string;
        dimmed: string;
      };
    };
  }
  interface HvThemeColors {
    veryPurple: string;
  }
}

declare module "@hitachivantara/uikit-react-core" {
  interface HvCustomTypographyVariants {
    title1Label: string;
    title2Label: string;
  }
}

export const Component = () => {
  return (
    <div className="flex flex-col gap-sm items-center">
      <HvTypography variant="title1Label">Title1Label</HvTypography>
      <HvTypography variant="title2Label">Title2Label</HvTypography>
      <div className="grid gap-xs">
        <span style={{ color: pentahoPlus.vars.colors.veryPurple }}>
          Very Purple
        </span>
        <span style={{ color: pentahoPlus.vars.otherColors.gray.strong }}>
          Very Gray Strong
        </span>
        <span style={{ color: pentahoPlus.vars.otherColors.gray.subtle }}>
          Very Gray Subtle
        </span>
        <span style={{ color: pentahoPlus.vars.otherColors.gray.dimmed }}>
          Very Gray Dimmed
        </span>
        <HvTypography variant="title2Label">Very small</HvTypography>
      </div>
    </div>
  );
};
