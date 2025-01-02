import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Container } from "./components/common/Container";
import { Header } from "./components/common/Header";
import { NavigationProvider } from "./context/NavigationContext";

// @ts-expect-error TODO
import navigation from "./lib/navigation";
// @ts-expect-error TODO
import Routes from "./lib/routes";

import "./lib/i18n";

import "virtual:uno.css";

const App = () => (
  <Router>
    <HvProvider rootElementId="hv-root">
      <NavigationProvider navigation={navigation}>
        <Header />
        <Container maxWidth="xl">
          <Routes />
        </Container>
      </NavigationProvider>
    </HvProvider>
  </Router>
);

export default App;
