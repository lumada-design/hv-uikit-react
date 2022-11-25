/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import { Ungroup } from "@hitachivantara/uikit-react-icons";

import {
  HvButton,
  HvInput,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvTextArea,
  HvTypography,
} from "../..";

/* eslint-disable react/prop-types */

export default {
  title: "Overlay/Dialog",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvDialog } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvDialog,
  subcomponents: { HvDialogTitle, HvDialogContent, HvDialogActions },
};

const SimpleDialog = ({ buttonMessage, title, content, classes, indentContent = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvButton id={buttonMessage} style={{ width: "120px" }} onClick={() => setOpen(true)}>
        {buttonMessage}
      </HvButton>
      <HvDialog
        disableBackdropClick
        classes={classes}
        open={open}
        onClose={() => setOpen(false)}
        id="test"
        firstFocusable="test-close"
      >
        {title}

        {content || (
          <HvDialogContent indentContent={indentContent}>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvDialogContent>
        )}
        <HvDialogActions>
          <HvButton id="apply" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const Main = () => {
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
        id="test"
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Switch model view?</HvDialogTitle>
        <HvDialogContent indentContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton id="apply" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const TextAndSemantic = () => {
  return (
    <>
      <SimpleDialog
        buttonMessage="No icon"
        title={<HvDialogTitle showIcon={false}>Are you sure?</HvDialogTitle>}
        content={
          <HvDialogContent>
            Switching to model view will clear all the fields in your visualization. You will need
            to re-select your fields.
          </HvDialogContent>
        }
      />
      <p />
      <SimpleDialog
        buttonMessage="Warning"
        title={<HvDialogTitle variant="warning">Are you sure?</HvDialogTitle>}
        indentContent
      />
      <p />
      <SimpleDialog
        buttonMessage="Info"
        title={<HvDialogTitle variant="info">Are you sure?</HvDialogTitle>}
        indentContent
      />
      <p />
      <SimpleDialog
        buttonMessage="Error"
        title={<HvDialogTitle variant="error">Are you sure?</HvDialogTitle>}
        indentContent
      />
    </>
  );
};

TextAndSemantic.parameters = {
  docs: {
    description: {
      story: "The modal allow the definition of variants, that alters the presented icon.",
    },
  },
};

export const CustomIcon = () => (
  <SimpleDialog
    buttonMessage="Custom icon"
    title={<HvDialogTitle customIcon={<Ungroup iconSize="S" />}>Are you sure?</HvDialogTitle>}
    indentContent
  />
);

CustomIcon.parameters = {
  docs: {
    description: {
      story:
        "The standard icon can be replaced by a custom or just removed. The firstFocusable is set to the Switch Away button.",
    },
  },
};

export const Accessibility = () => {
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
        id="test"
        firstFocusable="test-close"
      >
        <HvDialogTitle id="hv-dialog-title" variant="warning">
          Switch model view?
        </HvDialogTitle>
        <HvDialogContent id="hv-dialog-description" indentContent>
          Switching to model view will clear all the fields in your visualization. You will need to
          re-select your fields.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton id="apply" category="ghost">
            Apply
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

Accessibility.parameters = {
  docs: {
    description: {
      story:
        "Dialogs should have an `aria-labelledby` linking to the most appropriate element, as well as an optional `aria-describedby` pointing to the main content.",
    },
  },
};

export const FormContent = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  return (
    <div>
      <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open Dialog
      </HvButton>
      <HvTypography>{data}</HvTypography>
      <HvDialog open={open} onClose={() => setOpen(false)} aria-label="Create a new post">
        <HvDialogTitle>Create post</HvDialogTitle>
        <HvDialogContent style={{ width: 500 }}>
          <form
            id="dialog-form"
            onSubmit={(evt) => {
              evt.preventDefault();
              const formData = new FormData(evt.target);
              setData(JSON.stringify(Object.fromEntries(formData)));
              setOpen(false);
            }}
          >
            <HvInput required name="title" label="Title" placeholder="Enter text" />
            <br />
            <HvTextArea name="description" label="Description" placeholder="Enter text" rows={3} />
            <br />
            <HvTextArea name="body" label="Body" placeholder="Enter text" rows={6} />
          </form>
        </HvDialogContent>
        <HvDialogActions>
          <HvButton type="submit" form="dialog-form" category="ghost">
            Submit
          </HvButton>
          <HvButton id="cancel" category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

FormContent.parameters = {
  docs: {
    description: { story: "Dialog with a form as content" },
  },
};

export const LongContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvTypography>
        With very long content the dialog should grow in height to a maximum where a margin of 100px
        is left on top and bottom.
      </HvTypography>
      <br />
      <br />
      <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        open={open}
        onClose={() => setOpen(false)}
        id="test"
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Terms and Conditions</HvDialogTitle>
        <HvDialogContent indentContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut sem mattis, finibus
          tellus et, fringilla erat. Nulla justo lacus, pharetra at fringilla eget, interdum sit
          amet mauris. Pellentesque metus ex, gravida quis sem ac, placerat gravida libero. Praesent
          eu eros nec risus auctor blandit ac non sapien. Aliquam consequat pellentesque vulputate.
          Sed auctor, justo vel sagittis gravida, diam eros pharetra eros, interdum vestibulum
          tortor magna in dolor.
          <br />
          <br />
          Fusce eget ligula placerat, condimentum dolor non, placerat nunc. In mollis massa elit, id
          vestibulum turpis lobortis vel. Praesent eget consequat lorem. Nunc aliquam justo dapibus
          nisl ultrices, at varius lacus laoreet. Aliquam libero velit, pretium ut odio ultrices,
          viverra laoreet erat. Vivamus neque justo, venenatis non diam placerat, pellentesque
          ultricies mi. Nunc ullamcorper lorem id libero laoreet, vulputate dignissim felis
          malesuada. Curabitur blandit odio a nibh faucibus porttitor. Maecenas placerat vulputate
          purus, sed tempor nunc scelerisque in. Praesent rhoncus tempor turpis, nec vehicula nulla
          laoreet vel.
          <br />
          <br />
          Q uisque nec eros lacus. Aenean pharetra interdum justo, in commodo sem porta non. Nam non
          lorem ultricies, suscipit ante ut, dictum lacus. Duis pharetra orci sem, sit amet porta
          orci pulvinar vel. Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Nunc tortor ligula, sollicitudin id augue ac, maximus porttitor
          ante. Etiam ultricies dolor in pretium scelerisque. Integer sed lectus eget lectus mollis
          elementum. Ut feugiat magna ac venenatis aliquet. Nulla ut justo nulla. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean
          sollicitudin sodales dictum. Aenean vehicula magna venenatis mollis suscipit. Aliquam
          gravida orci a lacinia convallis. Nunc dignissim eros vel mi hendrerit, ac euismod quam
          vehicula. Proin sodales eget est finibus aliquam. Maecenas in felis purus. Vestibulum
          dictum ex elit, at mollis nibh tempor quis. Curabitur velit elit, scelerisque at varius
          eget, porta nec dui. Sed efficitur augue laoreet, feugiat orci a, pellentesque quam. Proin
          enim turpis, scelerisque eget enim non, euismod semper magna.
          <br />
          <br />
          Nam aliquam, turpis vitae pulvinar feugiat, enim turpis tincidunt enim, quis pharetra nibh
          massa vitae enim. Etiam in tincidunt nisl, nec semper metus. Donec dignissim dolor non
          nulla fermentum, laoreet mollis nulla tempor. Suspendisse et leo aliquam, aliquet lacus
          at, viverra ante. Fusce vehicula sit amet est id pulvinar. Donec eu ornare erat. Nulla
          urna libero, cursus ornare ullamcorper eget, pellentesque malesuada lectus. Aliquam sed
          ipsum nec tortor auctor pharetra scelerisque id nulla. Duis tempus scelerisque erat, non
          finibus lacus fermentum quis. Proin sodales ultricies nisl eget tristique. Donec at urna
          vel lectus pellentesque tristique quis bibendum eros.
          <br />
          <br />
          Aliquam erat volutpat. Suspendisse semper fringilla accumsan. Suspendisse vel fringilla
          nisi, a interdum tortor. Praesent ac tellus non nunc viverra vulputate. Donec semper urna
          nibh, nec sagittis turpis semper vitae. Praesent varius lacinia dui id tincidunt. Donec
          lobortis non diam in varius. Aliquam dictum felis odio, dictum porttitor est cursus vel.
          In mi elit, mattis et tincidunt quis, volutpat cursus ipsum. Suspendisse mollis massa
          ipsum. Curabitur diam sapien, pellentesque eget arcu vitae, accumsan consequat justo.
          Vestibulum vel orci non risus auctor volutpat. Mauris imperdiet fermentum venenatis.
          Integer purus est, placerat vel fermentum a, semper vel urna. Nulla risus nisl,
          condimentum eleifend porttitor at, imperdiet vel turpis. Suspendisse potenti. Praesent
          vitae lacus non lectus aliquet semper a id nunc. Aliquam ut commodo felis. Sed dignissim
          mauris ligula, eu volutpat sem commodo ut. Proin lacus diam, dapibus at eros nec, luctus
          dictum libero. Vivamus congue odio ex, facilisis tincidunt tortor tincidunt vitae. Nullam
          nec ornare sem. Ut cursus gravida dictum. Phasellus dapibus venenatis mi et dapibus.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            I Accept
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};

export const Fullscreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <HvTypography>
        A dialog can be opened in fullscreen mode, and will take 100% of the width and height of the
        screen.
      </HvTypography>
      <br />
      <br />
      <HvButton style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDialog
        disableBackdropClick
        open={open}
        onClose={() => setOpen(false)}
        fullscreen
        id="test"
        firstFocusable="test-close"
      >
        <HvDialogTitle variant="warning">Fullscreen</HvDialogTitle>
        <HvDialogContent indentContent>A fullscreen dialog.</HvDialogContent>
        <HvDialogActions>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            Close
          </HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
};
