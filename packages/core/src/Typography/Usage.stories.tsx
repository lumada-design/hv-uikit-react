import { PopUp } from "@hitachivantara/uikit-react-icons";
import { HvIconButton, HvTypography } from "@hitachivantara/uikit-react-core";

export default {
  title: "Foundation/Typography/Usage",
};

export const Usage = () => (
  <HvIconButton
    title={<HvTypography variant="caption1">Open in new window</HvTypography>}
    component="a"
    href="#"
  >
    <PopUp />
  </HvIconButton>
);

export const Semantic = () => (
  <>
    <HvTypography variant="display">
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
    <HvTypography variant="display" component="h3">
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
  </>
);

export const Properties = () => (
  <>
    <HvTypography variant="display" link>
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
    <HvTypography variant="body" link>
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
    <HvTypography variant="display" disabled>
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
    <HvTypography variant="body" disabled>
      The quick brown fox jumps over the lazy dog.
    </HvTypography>
  </>
);
