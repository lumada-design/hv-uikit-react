import { css } from "@emotion/react";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Header, Components, ThemeSwitcher } from "./components";

const styles = {
  content: css`
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  `,
};

const App = () => {
  return (
    <HvProvider>
      <Header />
      <div css={styles.content}>
        <ThemeSwitcher />
        <Components />
      </div>
    </HvProvider>
  );
};

export default App;
