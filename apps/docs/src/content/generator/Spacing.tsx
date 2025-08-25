"use client";

import { useCallback, useState } from "react";
import {
  HvButton,
  HvIconButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

import { SpacingConfig } from "./Dialogs/SpacingConfig";
import { useGeneratorContext } from "./GeneratorContext";

const spacings = [
  {
    Tight: {
      base: 6,
      xxs: "2px",
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "40px",
    },
  },
  {
    Loose: {
      base: 10,
      xxs: "6px",
      xs: "12px",
      sm: "20px",
      md: "32px",
      lg: "64px",
      xl: "96px",
    },
  },
];

export const Spacing = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const { customTheme, updateCustomTheme } = useGeneratorContext();

  const updateTheme = useCallback(
    (changes: Record<string, any>) => {
      updateCustomTheme(changes);
    },
    [updateCustomTheme],
  );

  return (
    <>
      {configOpen && (
        <SpacingConfig open={configOpen} setOpen={setConfigOpen} />
      )}
      <div className="flex flex-col  gap-xs">
        <div className="flex items-center gap-xs">
          <div className="i-ph-arrows-out-cardinal" />
          <HvTypography variant="title4">Spacing</HvTypography>
          <div className="border-1 border-borderSubtle h-1px flex-1" />
          <HvIconButton
            aria-label="Settings"
            title="Customize spacings"
            onClick={() => setConfigOpen(true)}
          >
            <div className="i-ph-gear" />
          </HvIconButton>
        </div>
        <div className="flex justify-center gap-sm">
          {spacings.map((spacing, i) => {
            const isSpacingSelected =
              JSON.stringify(Object.values(spacings[i])[0]) ===
              JSON.stringify(customTheme.space);

            return (
              <div
                key={Object.keys(spacing)[0]}
                className="flex flex-col gap-xxs"
              >
                <HvButton
                  variant="ghost"
                  className="p-0"
                  onClick={() =>
                    updateTheme({
                      space: Object.values(spacings[i])[0],
                    })
                  }
                >
                  <div
                    className="flex bg-negativeSubtle"
                    style={{
                      gap: Object.keys(spacing)[0] === "Tight" ? "4px" : "24px",
                    }}
                  >
                    <div
                      className="w-28px h-28px bg-bgContainer border-dashed rounded-none"
                      style={{
                        borderWidth: isSpacingSelected ? 2 : 1,
                        borderColor: isSpacingSelected
                          ? theme.colors.primary
                          : theme.colors.borderStrong,
                      }}
                    />
                    <div
                      className="w-28px h-28px bg-bgContainer border-dashed rounded-none"
                      style={{
                        borderWidth: isSpacingSelected ? 2 : 1,
                        borderColor: isSpacingSelected
                          ? theme.colors.primary
                          : theme.colors.borderStrong,
                      }}
                    />
                  </div>
                </HvButton>
                <HvTypography
                  variant="caption2"
                  className="flex justify-center"
                >
                  {Object.keys(spacing)[0]}
                </HvTypography>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
