import { Ungroup } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvDialogContent,
  HvDialog,
  HvDialogProps,
  HvDialogTitle,
  HvDialogActions,
  HvTypography,
} from "components";
import { useState } from "react";

type SimpleDialogProps = {
  buttonMessage?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  classes?: any;
  indentContent?: boolean;
};

const SimpleDialog = ({
  buttonMessage,
  title,
  content,
  classes,
  indentContent = false,
}: SimpleDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton
        id={buttonMessage}
        style={{ width: "120px" }}
        onClick={() => setOpen(true)}
      >
        {buttonMessage}
      </HvButton>
      <HvDialog
        disableBackdropClick
        id="test"
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
      >
        {title}

        {content || (
          <HvDialogContent indentContent={indentContent}>
            Switching to model view will clear all the fields in your
            visualization. You will need to re-select your fields.
          </HvDialogContent>
        )}
        <HvDialogActions>
          <HvButton id="apply" variant="secondaryGhost">
            Apply
          </HvButton>
          <HvButton
            id="cancel"
            variant="secondaryGhost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

const meta: Meta<typeof HvDialog> = {
  title: "Components/Dialog",
  component: HvDialog,
  subcomponents: { HvDialogTitle, HvDialogContent, HvDialogActions },
};
export default meta;

export const Main: StoryObj<HvDialogProps> = {
  args: {
    fullscreen: false,
    disableBackdropClick: false,
    buttonTitle: "Close",
  },
  argTypes: {
    classes: { control: { disable: true } },
    BackdropComponent: { control: { disable: true } },
    BackdropProps: { control: { disable: true } },
    slotProps: { control: { disable: true } },
    components: { control: { disable: true } },
    componentsProps: { control: { disable: true } },
  },
  render: ({ fullscreen, disableBackdropClick, buttonTitle }) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <HvButton
          id="openDialog"
          style={{ width: "120px" }}
          onClick={() => setOpen(true)}
        >
          Open Dialog
        </HvButton>
        <HvDialog
          disableBackdropClick={disableBackdropClick}
          id="test"
          open={open}
          fullscreen={fullscreen}
          onClose={() => setOpen(false)}
          firstFocusable="test-close"
          buttonTitle={buttonTitle}
        >
          <HvDialogTitle variant="warning">Switch model view?</HvDialogTitle>
          <HvDialogContent indentContent>
            Switching to model view will clear all the fields in your
            visualization. You will need to re-select your fields.
          </HvDialogContent>
          <HvDialogActions>
            <HvButton id="apply" variant="secondaryGhost">
              Apply
            </HvButton>
            <HvButton
              id="cancel"
              variant="secondaryGhost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </HvButton>
          </HvDialogActions>
        </HvDialog>
      </div>
    );
  },
};

export const TextAndSemantic: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The modal allow the definition of variants, that alters the presented icon.",
      },
    },
  },
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <SimpleDialog
          buttonMessage="No icon"
          title={<HvDialogTitle showIcon={false}>Are you sure?</HvDialogTitle>}
          content={
            <HvDialogContent>
              Switching to model view will clear all the fields in your
              visualization. You will need to re-select your fields.
            </HvDialogContent>
          }
        />
        <SimpleDialog
          buttonMessage="Warning"
          title={<HvDialogTitle variant="warning">Are you sure?</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Info"
          title={<HvDialogTitle variant="info">Are you sure?</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Error"
          title={<HvDialogTitle variant="error">Are you sure?</HvDialogTitle>}
          indentContent
        />
      </div>
    );
  },
};

export const CustomIcon: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The standard icon can be replaced by a custom or just removed. The firstFocusable is set to the Switch Away button.",
      },
    },
  },
  render: () => {
    return (
      <SimpleDialog
        buttonMessage="Custom icon"
        title={
          <HvDialogTitle customIcon={<Ungroup iconSize="S" />}>
            Are you sure?
          </HvDialogTitle>
        }
        indentContent
      />
    );
  },
};

export const Accessibility: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Modals should have an `aria-labelledby` linking to the most appropriate element, as well as an optional `aria-describedby` pointing to the main content.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
          Open Dialog
        </HvButton>
        <HvDialog
          disableBackdropClick
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="hv-dialog-title"
          aria-describedby="hv-dialog-description"
        >
          <HvDialogTitle id="hv-dialog-title" variant="warning">
            Switch model view?
          </HvDialogTitle>
          <HvDialogContent id="hv-dialog-description" indentContent>
            Switching to model view will clear all the fields in your
            visualization. You will need to re-select your fields.
          </HvDialogContent>
          <HvDialogActions>
            <HvButton variant="secondaryGhost">Apply</HvButton>
            <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>
              Cancel
            </HvButton>
          </HvDialogActions>
        </HvDialog>
      </div>
    );
  },
};

export const LongContent: StoryObj<HvDialogProps> = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <HvTypography>
          With very long content the dialog should grow in height to a maximum
          where a margin of 100px is left on top and bottom.
        </HvTypography>
        <br />
        <br />
        <HvButton
          id="openDialog"
          style={{ width: "120px" }}
          onClick={() => setOpen(true)}
        >
          Open dialog
        </HvButton>
        <HvDialog
          disableBackdropClick
          id="test"
          open={open}
          onClose={() => setOpen(false)}
          firstFocusable="accept"
        >
          <HvDialogTitle variant="warning">Terms and Conditions</HvDialogTitle>
          <HvDialogContent indentContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut
            sem mattis, finibus tellus et, fringilla erat. Nulla justo lacus,
            pharetra at fringilla eget, interdum sit amet mauris. Pellentesque
            metus ex, gravida quis sem ac, placerat gravida libero. Praesent eu
            eros nec risus auctor blandit ac non sapien. Aliquam consequat
            pellentesque vulputate. Sed auctor, justo vel sagittis gravida, diam
            eros pharetra eros, interdum vestibulum tortor magna in dolor.
            <br />
            <br />
            Fusce eget ligula placerat, condimentum dolor non, placerat nunc. In
            mollis massa elit, id vestibulum turpis lobortis vel. Praesent eget
            consequat lorem. Nunc aliquam justo dapibus nisl ultrices, at varius
            lacus laoreet. Aliquam libero velit, pretium ut odio ultrices,
            viverra laoreet erat. Vivamus neque justo, venenatis non diam
            placerat, pellentesque ultricies mi. Nunc ullamcorper lorem id
            libero laoreet, vulputate dignissim felis malesuada. Curabitur
            blandit odio a nibh faucibus porttitor. Maecenas placerat vulputate
            purus, sed tempor nunc scelerisque in. Praesent rhoncus tempor
            turpis, nec vehicula nulla laoreet vel.
            <br />
            <br />
            Q uisque nec eros lacus. Aenean pharetra interdum justo, in commodo
            sem porta non. Nam non lorem ultricies, suscipit ante ut, dictum
            lacus. Duis pharetra orci sem, sit amet porta orci pulvinar vel.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Nunc tortor ligula, sollicitudin id augue
            ac, maximus porttitor ante. Etiam ultricies dolor in pretium
            scelerisque. Integer sed lectus eget lectus mollis elementum. Ut
            feugiat magna ac venenatis aliquet. Nulla ut justo nulla. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Aenean sollicitudin sodales dictum. Aenean
            vehicula magna venenatis mollis suscipit. Aliquam gravida orci a
            lacinia convallis. Nunc dignissim eros vel mi hendrerit, ac euismod
            quam vehicula. Proin sodales eget est finibus aliquam. Maecenas in
            felis purus. Vestibulum dictum ex elit, at mollis nibh tempor quis.
            Curabitur velit elit, scelerisque at varius eget, porta nec dui. Sed
            efficitur augue laoreet, feugiat orci a, pellentesque quam. Proin
            enim turpis, scelerisque eget enim non, euismod semper magna.
            <br />
            <br />
            Nam aliquam, turpis vitae pulvinar feugiat, enim turpis tincidunt
            enim, quis pharetra nibh massa vitae enim. Etiam in tincidunt nisl,
            nec semper metus. Donec dignissim dolor non nulla fermentum, laoreet
            mollis nulla tempor. Suspendisse et leo aliquam, aliquet lacus at,
            viverra ante. Fusce vehicula sit amet est id pulvinar. Donec eu
            ornare erat. Nulla urna libero, cursus ornare ullamcorper eget,
            pellentesque malesuada lectus. Aliquam sed ipsum nec tortor auctor
            pharetra scelerisque id nulla. Duis tempus scelerisque erat, non
            finibus lacus fermentum quis. Proin sodales ultricies nisl eget
            tristique. Donec at urna vel lectus pellentesque tristique quis
            bibendum eros.
            <br />
            <br />
            Aliquam erat volutpat. Suspendisse semper fringilla accumsan.
            Suspendisse vel fringilla nisi, a interdum tortor. Praesent ac
            tellus non nunc viverra vulputate. Donec semper urna nibh, nec
            sagittis turpis semper vitae. Praesent varius lacinia dui id
            tincidunt. Donec lobortis non diam in varius. Aliquam dictum felis
            odio, dictum porttitor est cursus vel. In mi elit, mattis et
            tincidunt quis, volutpat cursus ipsum. Suspendisse mollis massa
            ipsum. Curabitur diam sapien, pellentesque eget arcu vitae, accumsan
            consequat justo. Vestibulum vel orci non risus auctor volutpat.
            Mauris imperdiet fermentum venenatis. Integer purus est, placerat
            vel fermentum a, semper vel urna. Nulla risus nisl, condimentum
            eleifend porttitor at, imperdiet vel turpis. Suspendisse potenti.
            Praesent vitae lacus non lectus aliquet semper a id nunc. Aliquam ut
            commodo felis. Sed dignissim mauris ligula, eu volutpat sem commodo
            ut. Proin lacus diam, dapibus at eros nec, luctus dictum libero.
            Vivamus congue odio ex, facilisis tincidunt tortor tincidunt vitae.
            Nullam nec ornare sem. Ut cursus gravida dictum. Phasellus dapibus
            venenatis mi et dapibus.
          </HvDialogContent>
          <HvDialogActions>
            <HvButton
              id="accept"
              variant="secondaryGhost"
              onClick={() => setOpen(false)}
            >
              I Accept
            </HvButton>
          </HvDialogActions>
        </HvDialog>
      </div>
    );
  },
};
