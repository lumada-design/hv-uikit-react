import { HvBox, HvProvider, theme } from "@hitachivantara/uikit-core";
import { CSSProperties } from "react";
import {
  Buttons,
  EmptyState,
  Grid,
  Icons,
  Cards,
  Typography,
  Tags,
} from "./components";
import { Header, ThemeSwitcher } from "./layout";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "100%",
  margin: `${theme.spacing(5)} auto`,
  padding: `calc(${theme.header.height} + 50px) 20px 20px 20px`,
} as CSSProperties;

const App = () => {
  return (
    <HvProvider rootElementId="root">
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <Tags />
        <Cards />
        <Grid />
        <EmptyState />
        <Typography />
        <Buttons />
        <Icons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
