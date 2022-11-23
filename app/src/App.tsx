import {
  HvBox,
  HvEmptyState,
  HvProvider,
  HvTypography,
  theme,
  useWidth,
} from "@hitachivantara/uikit-core";
import { Info } from "@hitachivantara/uikit-icons";
import { CSSProperties } from "react";
import { Buttons, Icons, Typography } from "./components";
import { Header, ThemeSwitcher } from "./layout";

const styles = {
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  maxWidth: "960px",
  margin: `${theme.spacing(5)} auto`,
  marginTop: `calc(${theme.header.height} + 120px)`,
} as CSSProperties;

const App = () => {
  const width = useWidth();
  return (
    <HvProvider>
      <Header />
      <HvBox sx={styles}>
        <ThemeSwitcher />
        <HvTypography variant="body">Current Width: {width}</HvTypography>
        <HvEmptyState
          icon={<Info />}
          message="After you start adding Data Routes, they will appear here."
          title="No data routes"
        />
        <Typography />
        <Buttons />
        <Icons />
      </HvBox>
    </HvProvider>
  );
};

export default App;
