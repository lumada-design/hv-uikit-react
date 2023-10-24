import { HvTypography } from "@hitachivantara/uikit-react-core";

import { Container } from "./Container";

const WelcomeBanner = () => {
  return (
    <>
      <HvTypography variant="title1">Welcome to UI Kit 👋</HvTypography>
      <HvTypography variant="body">
        Edit <code>src/App.tsx</code> and save to get started.
      </HvTypography>
    </>
  );
};

const App = () => {
  return (
    <Container>
      <WelcomeBanner /> {/* ⬅️ add your code here */}
    </Container>
  );
};

export default App;
