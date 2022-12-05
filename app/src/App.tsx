import { HvBox, HvProvider, theme } from "@hitachivantara/uikit-core";
import { CSSProperties } from "react";
import { Buttons, Icons, Typography, EmptyState } from "./components";
import { Header, ThemeSwitcher } from "./layout";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "960px",
  margin: `${theme.spacing(5)} auto`,
  paddingTop: `calc(${theme.header.height} + 50px)`,
} as CSSProperties;

const App = () => {
  return (
    <HvProvider rootElementId="root">
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <EmptyState />
        <Typography />
        <Buttons />
        <Icons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
