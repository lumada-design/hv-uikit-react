import { BrowserRouter as Router } from "react-router-dom";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { Container } from "components";
import theme from "lib/theme";
import Routes from "lib/routes";
import "lib/i18n";

const App = () => (
  <Router>
    <HvProvider themes={[theme]}>
      <Container fullWidth>
        <Routes />
      </Container>
    </HvProvider>
  </Router>
);

export default App;
