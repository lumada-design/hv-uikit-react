import { useState } from "react";
import {
  HvButton,
  HvButtonVariant,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogProps,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";
import { Ungroup } from "@hitachivantara/uikit-react-icons";

type SimpleDialogProps = Pick<HvDialogProps, "classes" | "variant"> & {
  buttonMessage?: string;
  title?: React.ReactNode;
};

const buttonVariantMap: Record<
  NonNullable<HvDialogProps["variant"]>,
  HvButtonVariant
> = {
  error: "negative",
  success: "positive",
  warning: "warning",
};

const SimpleDialog = ({
  buttonMessage,
  title,
  classes,
  variant,
}: SimpleDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HvButton style={{ width: 120 }} onClick={() => setOpen(true)}>
        {buttonMessage}
      </HvButton>
      <HvDialog
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
      >
        {title}
        <HvDialogContent indentContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton
            variant={variant ? buttonVariantMap[variant] : "secondaryGhost"}
            onClick={() => setOpen(false)}
          >
            Apply
          </HvButton>
          <HvButton
            variant={variant ? "secondarySubtle" : "secondaryGhost"}
            onClick={() => setOpen(false)}
          >
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </>
  );
};

export const SemanticVariantsStory = () => (
  <>
    <SimpleDialog
      buttonMessage="Warning"
      variant="warning"
      title={<HvDialogTitle variant="error">Warning</HvDialogTitle>}
    />
    <SimpleDialog
      buttonMessage="Success"
      variant="success"
      title={<HvDialogTitle variant="success">Success</HvDialogTitle>}
    />
    <SimpleDialog
      buttonMessage="Error"
      variant="error"
      title={<HvDialogTitle variant="error">Error</HvDialogTitle>}
    />
    <SimpleDialog
      buttonMessage="Info"
      title={<HvDialogTitle variant="info">Info</HvDialogTitle>}
    />
    <SimpleDialog
      buttonMessage="Custom"
      title={
        <HvDialogTitle customIcon={<Ungroup iconSize="S" />}>
          Custom
        </HvDialogTitle>
      }
    />
  </>
);
