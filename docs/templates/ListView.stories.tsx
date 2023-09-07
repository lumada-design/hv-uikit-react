import ListView from "../../templates/ListView";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/List View",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  decorators: [templateDecorator],
};

export const Main = () => <ListView />;
