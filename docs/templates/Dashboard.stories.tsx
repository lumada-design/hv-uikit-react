import Dashboard from "../../templates/Dashboard";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Dashboard",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  decorators: [templateDecorator],
};

export const Main = () => <Dashboard />;
