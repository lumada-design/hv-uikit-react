import { css } from "@emotion/css";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";
import { Table, Tetris, Ungroup } from "@hitachivantara/uikit-react-icons";

const styles = {
  root: css({ padding: 20 }),
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    minHeight: "80px",
    gap: "15px",
    "> div": {
      height: "80px",
      width: "70px",
    },
    p: {
      fontSize: "14px",
      textAlign: "left",
    },
    h3: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  }),
};

export const Resources = () => (
  <HvSimpleGrid
    breakpoints={[
      {
        cols: 3,
        minWidth: 1000,
      },
      {
        cols: 2,
        minWidth: 755,
      },
    ]}
    spacing="lg"
    className={styles.root}
  >
    <div className={styles.container}>
      <Tetris iconSize="L" />
      <h3>Components</h3>
      <p>
        UI Building blocks that can be used in various combinations to create a
        larger user interface.
      </p>
    </div>
    <div className={styles.container}>
      <Ungroup iconSize="L" />
      <h3>Widgets</h3>
      <p>
        Specialized components that address specific use cases and can be used
        as base to support other scenarios.
      </p>
    </div>
    <div className={styles.container}>
      <Table iconSize="L" />
      <h3>Templates</h3>
      <p>
        Pre-designed layouts that address common UI patterns and can be used to
        quickly create a consistent design.
      </p>
    </div>
  </HvSimpleGrid>
);
