"use client";

import {
  HvButton,
  HvProvider,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import classes from "~/styles/Home.module.css";

function Component() {
  return (
    <main className={classes.main}>
      <div>
        <HvTypography variant="title1">Hello from UI Kit 👋</HvTypography>
        <HvTypography>
          Get started by editing&nbsp;
          <code className={classes.code}>pages/index.tsx</code>
        </HvTypography>
        <br />
        <HvButton variant="secondarySubtle">Button</HvButton>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <HvProvider>
      <Component />
    </HvProvider>
  );
}
