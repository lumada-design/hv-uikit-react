import { Meta, StoryObj } from "@storybook/react";

import FormikSample from "./Formik";
import FormikRaw from "./Formik?raw";
import NativeFormSample from "./NativeForm";
import NativeFormRaw from "./NativeForm?raw";
import ReactFormSample from "./ReactForm";
import ReactFormRaw from "./ReactForm?raw";
import ReactHookFormSample from "./ReactHookForm";
import ReactHookFormRaw from "./ReactHookForm?raw";

const meta: Meta = {
  title: "Guides/Forms/Forms Guide",
  parameters: {
    docs: { autodocs: false },
  },
};

export default meta;

export const NativeForm: StoryObj = {
  parameters: { docs: { source: { code: NativeFormRaw } } },
  render: () => <NativeFormSample />,
};

export const ReactForm: StoryObj = {
  parameters: { docs: { source: { code: ReactFormRaw } } },
  render: () => <ReactFormSample />,
};

export const ReactHookForm: StoryObj = {
  parameters: { docs: { source: { code: ReactHookFormRaw } } },
  render: () => <ReactHookFormSample />,
};

export const Formik: StoryObj = {
  parameters: { docs: { source: { code: FormikRaw } } },
  render: () => <FormikSample />,
};
