import { css } from "@emotion/react";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import { Buttons, Header } from "./components";

const styles = {
  page: css`
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
    min-height: calc(100vh - 4rem);
  `,
  main: css`
    height: 100%;
    padding: 2rem 2rem;
  `,
};

const App = () => {
  return (
    <HvProvider>
      <Header />
      <div css={styles.page}>
        <main css={styles.main}>
          <Buttons />
        </main>
      </div>
    </HvProvider>
  );
};

export default App;
