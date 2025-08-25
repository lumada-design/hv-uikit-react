import { Dispatch, SetStateAction } from "react";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import {
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTypography,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { useGeneratorContext } from "../GeneratorContext";

export const ThemeDiff = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { customTheme } = useGeneratorContext();
  return (
    <HvDialog
      open={open}
      maxWidth="md"
      fullWidth
      onClose={() => setOpen((p) => !p)}
      title="Theme Preview"
    >
      <HvDialogTitle>Theme Differences</HvDialogTitle>
      <HvDialogContent>
        <HvCodeEditor
          height={400}
          language="json"
          value={JSON.stringify(diffObjects(customTheme, pentahoPlus), null, 2)}
        />
      </HvDialogContent>
      <HvDialogActions className="flex justify-start">
        <HvTypography
          link
          component="a"
          href="/docs/theming#creating-a-new-theme"
        >
          Check here to learn how to create a custom theme
        </HvTypography>
      </HvDialogActions>
    </HvDialog>
  );
};

const diffObjects = (
  updated: Record<string, any>,
  base: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key of Object.keys(updated)) {
    if (!(key in base)) {
      // New key added
      result[key] = updated[key];
    } else if (
      typeof updated[key] === "object" &&
      updated[key] !== null &&
      typeof base[key] === "object" &&
      base[key] !== null
    ) {
      // Deep diff for nested objects
      const diff = diffObjects(updated[key], base[key]);
      if (Object.keys(diff).length > 0) {
        result[key] = diff;
      }
    } else if (updated[key] !== base[key]) {
      // Different primitive value
      result[key] = updated[key];
    }
  }

  return result;
};
