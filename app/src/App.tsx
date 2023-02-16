import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-core";

import { Container } from "components/layout";
import { NavigationProvider } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import Routes from "lib/routes";
import "lib/i18n";
import customTheme from "./customTheme";

const App: React.FC = () => (
  <Router>
    <HvProvider rootElementId="hv-root" theme={customTheme}>
      <NavigationProvider navigation={navigation}>
        <Container maxWidth="lg">
          <Routes />
        </Container>
      </NavigationProvider>
    </HvProvider>
  </Router>
);

export default App;
