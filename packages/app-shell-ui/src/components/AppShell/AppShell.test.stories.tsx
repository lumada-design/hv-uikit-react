import { Helmet, HelmetProvider } from "react-helmet-async";
import { Global } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import type { HvAppShellConfig } from "@hitachivantara/app-shell-shared";
import HvAppShell from "@hitachivantara/app-shell-ui";

import { setupChromatic } from ".storybook/setupChromatic";

const externalsEntries = [
  "react@18",
  "react-dom@18",
  "react-router-dom@6",
  "@emotion/react@11",
  "@emotion/cache@11",
  "@hitachivantara/app-shell-shared@1",
  "@hitachivantara/uikit-react-shared@5",
].map((mod) => {
  const pkg = mod.slice(0, mod.lastIndexOf("@"));
  const version = mod.slice(mod.lastIndexOf("@") + 1);
  return [pkg, `https://esm.sh/${pkg}@^${version}`];
});

const importMap = {
  imports: {
    ...Object.fromEntries(externalsEntries),
    "@hv/uikit-icons/": "/assets/",
  },
};

export default {
  title: "Tests/AppShell",
  component: HvAppShell,
  // TODO: leverage the inlined importmap or separate AppShell UI from module loading
  decorators: [
    (Story) => (
      <HelmetProvider>
        <Helmet>
          <script type="importmap">{JSON.stringify(importMap, null, 2)}</script>
        </Helmet>
        <Global styles={{ ".hv-story-sample": { padding: "0 !important" } }} />
        <Story />
      </HelmetProvider>
    ),
  ],
} satisfies Meta;

export const Main: StoryObj<HvAppShellConfig> = {
  args: {
    name: "AppShell Test App",
    navigationMode: "TOP_AND_LEFT",
    logo: {
      name: "PENTAHO+",
      description: "Logo Description",
    },
    menu: [
      { label: "Home", target: "/" },
      {
        label: "About",
        target: "/about",
        submenus: [
          { label: "Submenu 1", target: "/about/submenu1" },
          { label: "Submenu 2", target: "/about/submenu2" },
        ],
      },
    ],
    mainPanel: {
      views: [
        { bundle: "@test/pages/AssetInventory.js", route: "/" },
        { bundle: "@test/pages/ListView.js", route: "/about" },
      ],
    },
  },
  argTypes: {},
  parameters: {
    ...setupChromatic(
      ["DS5 dawn", "DS5 wicked", "Pentaho+ dawn", "Pentaho+ wicked"],
      5000,
    ),
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: /about/i }));
  },
  render: (args) => <HvAppShell config={args} />,
};
