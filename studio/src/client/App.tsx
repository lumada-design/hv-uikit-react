import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { Header, Container } from "components/common";
import { StoreProvider } from "lib/context/StoreContext";
import { editorComponents } from "lib/config/editorComponents";
import { editorConfig } from "lib/config/editorConfig";
import { viewsConfig } from "lib/config/viewsConfig";
import theme from "lib/theme";
import Routes from "lib/routes";
import "lib/i18n";

const App = () => {
  return (
    <Router>
      <HvProvider themes={[theme]}>
        <StoreProvider config={{ editorComponents, editorConfig, viewsConfig }}>
          <Header />
          <Container>
            <Routes />
          </Container>
        </StoreProvider>
      </HvProvider>
    </Router>
  );
};

export default App;
