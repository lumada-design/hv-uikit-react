import {
  HvBox,
  HvProvider,
  themeUtils,
  themeVars,
} from "@hitachivantara/uikit-react-core";
import { CSSProperties } from "react";
import { Buttons, Tags, Typography } from "./components";
import { Header, ThemeSwitcher } from "./layout";

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
      <div style={{ marginTop: `calc(${themeVars.header.height} + 120px)` }}>
        <HvBox sx={styles}>
          <ThemeSwitcher />
          <Typography />
          <Tags />
          <Buttons />
        </HvBox>
      </div>
    </HvProvider>
  );
};

export default App;
