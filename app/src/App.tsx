import { HvBox, HvProvider } from "@hitachivantara/uikit-react-core";
import { themeUtils } from "@hitachivantara/uikit-styles";
import { Header, ThemeSwitcher } from "./layout";
import { Buttons, Icons, Typography } from "./components";
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
        <Icons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
