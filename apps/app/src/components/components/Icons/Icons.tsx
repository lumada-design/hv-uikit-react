import { HvBox } from "@hitachivantara/uikit-react-core";
import {
  Bookmark,
  CheckboxCheck,
  Level5,
  Machine,
} from "@hitachivantara/uikit-react-icons";

export const Icons = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <CheckboxCheck iconSize="XS" />
      <Bookmark
        color={["brand", "secondary"]}
        iconSize="S"
        aria-label="Click to bookmark"
      />
      <Machine role="presentation" iconSize="M" />
      <CheckboxCheck height={60} width={60} style={{ width: 80, height: 80 }} />
      <Level5 iconSize="L" inverted role="img" title="Critical!" />
    </HvBox>
  );
};
