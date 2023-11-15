import { StoryObj } from "@storybook/react";

import NativeForm from "./NativeForm";
import NativeFormRaw from "./NativeForm?raw";
import ReactForm from "./ReactForm";
import ReactFormRaw from "./ReactForm?raw";
import ReactHookForm from "./ReactHookForm";
import ReactHookFormRaw from "./ReactHookForm?raw";
import Formik from "./Formik";
import FormikRaw from "./Formik?raw";

export const NativeFormStory: StoryObj = {
  parameters: {
    docs: { source: { code: NativeFormRaw } },
  },
  render: () => <NativeForm />,
};

export const ReactFormStory: StoryObj = {
  parameters: {
    docs: { source: { code: ReactFormRaw } },
  },
  render: () => <ReactForm />,
};

export const ReactHookFormStory: StoryObj = {
  parameters: {
    docs: { source: { code: ReactHookFormRaw } },
  },
  render: () => <ReactHookForm />,
};

export const FormikStory: StoryObj = {
  parameters: {
    docs: { source: { code: FormikRaw } },
  },
  render: () => <Formik />,
};
