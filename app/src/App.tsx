import {
  HvProvider,
  HvBox,
  themeUtils,
} from "@hitachivantara/uikit-react-core";
import { Header, ThemeSwitcher } from "./layout";
import { Typography, Buttons } from "./components";
import { CSSProperties } from "react";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: themeUtils.space(5),
  maxWidth: "960px",
  margin: `${themeUtils.space(5)} auto`,
} as CSSProperties;

const App = () => {
  return (
    <HvProvider>
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <Typography />
        <Buttons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
