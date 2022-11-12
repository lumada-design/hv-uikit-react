import { HvBox, HvProvider, theme } from "@hitachivantara/uikit-core";
import { CSSProperties } from "react";

import { Buttons, Icons, Typography } from "./components";
import { Header, ThemeSwitcher } from "./layout";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "960px",
  margin: `${theme.spacing(5)} auto`,
} as CSSProperties;

const App = () => {
  return (
    <HvProvider>
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <Typography />
        <Buttons />
        <Icons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
