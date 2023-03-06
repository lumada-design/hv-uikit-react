import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider, HvTheme } from "@hitachivantara/uikit-react-core";

import { Container } from "components/common";
import { NavigationProvider } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import Routes from "lib/routes";
import "lib/i18n";

import customTheme from "./customTheme.json";

const App = () => (
  <Router>
    <HvProvider rootElementId="hv-root" theme={customTheme as HvTheme}>
      <NavigationProvider navigation={navigation}>
        <Container maxWidth="xl">
          <Routes />
        </Container>
      </NavigationProvider>
    </HvProvider>
  </Router>
);

export default App;
