import type { MetaFunction } from "@remix-run/node";
import { HvProvider, HvTypography } from "@hitachivantara/uikit-react-core";

export const meta: MetaFunction = () => {
  return [
    { title: "UI Kit App" },
    { name: "description", content: "UI Kit Remix example app" },
  ];
};

export default function Index() {
  return (
    <HvProvider>
      <HvTypography variant="title1">Welcome to UI Kit 👋</HvTypography>
      <HvTypography variant="body">
        Edit <code>src/App.tsx</code> and save to get started.
      </HvTypography>
    </HvProvider>
  );
}
