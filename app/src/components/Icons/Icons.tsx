import { HvBox } from "@hitachivantara/uikit-react-core";
import {
  CheckboxCheck,
  Bookmark,
  Machine,
  Level5,
} from "@hitachivantara/uikit-react-icons";

export const Icons = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <CheckboxCheck iconSize="M" />
      <Bookmark
        color={["acce3", "acce1"]}
        iconSize="M"
        aria-label="Click to bookmark"
      />
      <Machine role="presentation" iconSize="M" />
      <CheckboxCheck
        height={200}
        width={200}
        style={{ width: 240, height: 240 }}
      />
      <Level5 iconSize="L" inverted role="img" title="Critical!" />
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  Icons.displayName = "Icons";
}
