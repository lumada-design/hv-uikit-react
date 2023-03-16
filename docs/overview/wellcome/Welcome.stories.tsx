import Header from "./Header";
import Center from "./Center";
import Grid from "./Grid";
import Footer from "./Footer";

const Welcome = () => (
  <>
    <Header />
    <Center />
    <Grid />
    <Footer />
  </>
);

export default {
  title: "Overview/Welcome",
  component: Welcome,
  parameters: {
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    docs: {
      page: null,
    },
    options: {
      showPanel: false,
    },
    viewMode: "story",
  },
};

export const Main = () => <Welcome />;
