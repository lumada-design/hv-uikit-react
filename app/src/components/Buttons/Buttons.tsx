import { css } from "@emotion/react";
import { HvBox, HvButton } from "@hitachivantara/uikit-react-core";

const styles = {
  exampleComponents: css`
    margin: 2rem 0 0;
  `,
};

const Buttons = () => {
  return (
    <HvBox as="div" css={styles.exampleComponents}>
      <HvBox
        as="div"
        display="flex"
        css={{
          padding: "1rem 0",
          gap: 8,
        }}
        alignItems="center"
      >
        <HvButton variant="primary">Primary</HvButton>
        <HvButton variant="secondary">Secondary</HvButton>
        <HvButton variant="primary" size="small">
          Small
        </HvButton>
        <HvButton variant="secondary" size="large">
          Large
        </HvButton>
      </HvBox>
    </HvBox>
  );
};

export default Buttons;

if (process.env.NODE_ENV !== "production") {
  Buttons.displayName = "Buttons";
}
