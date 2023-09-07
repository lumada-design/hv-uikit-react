import Form from "../../templates/Form";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Form",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  decorators: [templateDecorator],
};

export const Main = () => <Form />;
