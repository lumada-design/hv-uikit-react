import DetailsView from "../../templates/DetailsView";
import { templateDecorator } from "./templateDecorator";

export default {
  title: "Templates/Details View",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  decorators: [templateDecorator],
};

export const Main = () => <DetailsView />;
