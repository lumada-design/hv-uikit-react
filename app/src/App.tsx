import "lib/i18n";
import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Container } from "components/common";
import { NavigationProvider } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import Routes from "lib/routes";

const App = () => (
  <Router>
    <HvProvider rootElementId="hv-root">
      <NavigationProvider navigation={navigation}>
        <Container maxWidth="xl">
          <Routes />
        </Container>
      </NavigationProvider>
    </HvProvider>
  </Router>
);

export default App;
