import * as Reactdep from "react";
import { useState } from "react";
import { CodeEditor } from "react-live-runner";
import { classes } from "@docs/components/code/Live";
// @ts-ignore
import { themes } from "prism-react-renderer";
import {
  HvButton,
  HvButtonVariant,
  HvCheckBox,
  HvOption,
  HvSelect,
} from "@hitachivantara/uikit-react-core";

const variants = [
  "primary",
  "primarySubtle",
  "primaryGhost",
  "positive",
  "positiveSubtle",
  "positiveGhost",
  "negative",
  "negativeSubtle",
  "negativeGhost",
  "warning",
  "warningSubtle",
  "warningGhost",
  "secondarySubtle",
  "secondaryGhost",
  "semantic",
];

const ButtonVariants = () => {
  const [variant, setVariant] = useState<HvButtonVariant>("primary");
  const [disabled, setDisabled] = useState(false);
  const [code, setCode] = useState(
    `<HvButton variant="${variant}">Test</HvButton>`,
  );

  Reactdep.useEffect(() => {
    setCode(
      `<HvButton variant="${variant}"${disabled ? " disabled" : ""}>Test</HvButton>`,
    );
  }, [variant, disabled]);

  return (
    <>
      <div className="flex justify-between gap-3 p-2 mt-1 border border-[var(--uikit-colors-atmo4)] rounded-t-round">
        <div className="flex items-center justify-center w-1/2">
          <HvButton variant={variant} disabled={disabled}>
            Button
          </HvButton>
        </div>
        <div className="flex flex-col justify-start gap-[var(--uikit-space-sm)] pl-[var(--uikit-space-sm)] border-l border-[var(--uikit-colors-atmo4)]">
          <HvSelect
            label="Variant"
            defaultValue="primary"
            onChange={(_, value) => setVariant(value as HvButtonVariant)}
            style={{ width: 200 }}
          >
            {variants.map((v) => (
              <HvOption key={v} value={v}>
                {v}
              </HvOption>
            ))}
          </HvSelect>
          <HvCheckBox
            onChange={() => setDisabled(!disabled)}
            checked={disabled}
            label="Disabled"
          />
        </div>
      </div>
      <div className={classes.editorContainer}>
        <CodeEditor
          readOnly
          className={classes.editor}
          value={code}
          theme={themes.dracula}
        />
      </div>
    </>
  );
};

export default ButtonVariants;
