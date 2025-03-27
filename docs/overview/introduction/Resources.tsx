import styled from "@emotion/styled";
import { HvSimpleGrid } from "@hitachivantara/uikit-react-core";
import { Table, Tetris, Ungroup } from "@hitachivantara/uikit-react-icons";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  minHeight: 80,
  gap: 15,
  "> div": {
    height: 80,
    width: 70,
  },
  p: {
    fontSize: 14,
    textAlign: "left",
  },
  h3: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

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
    style={{ padding: 20 }}
  >
    <Container>
      <Tetris iconSize="L" />
      <h3>Components</h3>
      <p>
        UI Building blocks that can be used in various combinations to create a
        larger user interface.
      </p>
    </Container>
    <Container>
      <Ungroup iconSize="L" />
      <h3>Widgets</h3>
      <p>
        Specialized components that address specific use cases and can be used
        as base to support other scenarios.
      </p>
    </Container>
    <Container>
      <Table iconSize="L" />
      <h3>Templates</h3>
      <p>
        Pre-designed layouts that address common UI patterns and can be used to
        quickly create a consistent design.
      </p>
    </Container>
  </HvSimpleGrid>
);
