import { useState } from "react";

import { Ungroup } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { css } from "@emotion/css";

import { Meta, StoryObj } from "@storybook/react";

import {
  HvButton,
  HvDialogContent,
  HvDialog,
  HvDialogProps,
  HvDialogTitle,
  HvDialogActions,
  HvInput,
  HvTextArea,
  HvGrid,
} from "@core/components";

type SimpleDialogProps = {
  buttonMessage?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  classes?: any;
  indentContent?: boolean;
  variant?: HvDialogProps["variant"];
};

const SimpleDialog = ({
  buttonMessage,
  title,
  content,
  classes,
  variant,
  indentContent = false,
}: SimpleDialogProps) => {
  const [open, setOpen] = useState(false);

  const styles = {
    success: {
      backgroundColor: theme.colors.positive,
      ":hover": {
        backgroundColor: theme.colors.positive_120,
      },
    },
    warning: {
      backgroundColor: theme.colors.warning,
      color: theme.colors.secondary,
      ":hover": {
        backgroundColor: theme.colors.warning_120,
      },
    },
    error: {
      backgroundColor: theme.colors.negative,
      ":hover": {
        backgroundColor: theme.colors.negative_120,
      },
    },
  };

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
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
        variant={variant}
      >
        {title}
        {content || (
          <HvDialogContent indentContent={indentContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </HvDialogContent>
        )}
        <HvDialogActions>
          <HvButton
            className={variant ? css(styles[variant]) : undefined}
            variant={variant ? "primary" : "secondaryGhost"}
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
    </div>
  );
};

const meta: Meta<typeof HvDialog> = {
  title: "Components/Dialog",
  component: HvDialog,
  subcomponents: { HvDialogTitle, HvDialogContent, HvDialogActions },
  parameters: {
    eyes: { include: false },
  },
  decorators: [(Story) => <div style={{ height: 250 }}>{Story()}</div>],
};
export default meta;

export const Main: StoryObj<HvDialogProps> = {
  args: {
    fullscreen: false,
    disableBackdropClick: false,
    buttonTitle: "Close",
    maxWidth: "sm",
    fullWidth: false,
  },
  argTypes: {
    maxWidth: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    classes: { control: { disable: true } },
    BackdropComponent: { control: { disable: true } },
    BackdropProps: { control: { disable: true } },
    slotProps: { control: { disable: true } },
    components: { control: { disable: true } },
    componentsProps: { control: { disable: true } },
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
          Open Dialog
        </HvButton>
        <HvDialog open={open} {...args} onClose={() => setOpen(false)}>
          <HvDialogTitle variant="warning">Switch model view?</HvDialogTitle>
          <HvDialogContent indentContent>
            Switching to model view will clear all the fields in your
            visualization. You will need to re-select your fields.
          </HvDialogContent>
          <HvDialogActions>
            <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>
              Apply
            </HvButton>
            <HvButton
              autoFocus
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

export const SemanticVariants: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The `HvDialog` component can receive a `variant` prop to set the status of the dialog. `HvDialogTitle` also accepts a `variant` prop that changes the icon. Alternatively, the `customIcon` prop allows for any custom icon",
      },
    },
  },
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <SimpleDialog
          buttonMessage="Warning"
          variant="warning"
          title={<HvDialogTitle variant="error">Warning</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Success"
          variant="success"
          title={<HvDialogTitle variant="success">Success</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Error"
          variant="error"
          title={<HvDialogTitle variant="error">Error</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Info"
          title={<HvDialogTitle variant="info">Info</HvDialogTitle>}
          indentContent
        />
        <SimpleDialog
          buttonMessage="Custom"
          title={
            <HvDialogTitle customIcon={<Ungroup iconSize="S" />}>
              Custom
            </HvDialogTitle>
          }
          indentContent
        />
      </div>
    );
  },
};

export const Form: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "An example of using a `form` in `HvDialog`. The sample uses the `autofocus` attribute to focus the Title input by default.<br /> \
          Accessibility-wise, `HvDialog` should have an `aria-labelledby` linking to the most appropriate element, \
          as well as an optional `aria-describedby` pointing to the main content.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState({});

    return (
      <>
        <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
          Create a post
        </HvButton>
        <br />
        <br />
        Post data: {JSON.stringify(postData, null, 2)}
        <HvDialog
          disableBackdropClick
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="hv-dialog-title"
          aria-describedby="hv-dialog-description"
        >
          <HvDialogTitle id="hv-dialog-title" variant="warning">
            Create a new post
          </HvDialogTitle>
          <HvDialogContent id="hv-dialog-description" indentContent>
            <div id="hv-dialog-description" style={{ marginBottom: 10 }}>
              Fill the following form to create a post.
            </div>
            <form
              id="create-post"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                setPostData(Object.fromEntries(formData.entries()));
                setOpen(false);
              }}
            >
              <HvGrid container>
                <HvGrid item xs={12}>
                  <HvInput
                    required
                    name="author"
                    label="Author"
                    defaultValue="John Doe"
                  />
                </HvGrid>
                <HvGrid item xs={12}>
                  <HvInput required name="title" label="Title" autoFocus />
                </HvGrid>
                <HvGrid item xs={12}>
                  <HvTextArea
                    required
                    label="Description"
                    name="content"
                    rows={4}
                  />
                </HvGrid>
              </HvGrid>
            </form>
          </HvDialogContent>
          <HvDialogActions>
            <HvButton type="submit" form="create-post" variant="primary">
              Create
            </HvButton>
            <HvButton variant="secondaryGhost" onClick={() => setOpen(false)}>
              Cancel
            </HvButton>
          </HvDialogActions>
        </HvDialog>
      </>
    );
  },
};

export const LongContent: StoryObj<HvDialogProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "With very long content the dialog grows in height, up to a maximum where a margin of 100px is left on top and bottom.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
          Open dialog
        </HvButton>
        <HvDialog
          disableBackdropClick
          open={open}
          onClose={() => setOpen(false)}
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
              autoFocus
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
