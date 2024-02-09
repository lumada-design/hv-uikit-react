import { PopUp } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default {
  title: "Foundation/Typography/Usage",
};

export const Usage = () => (
  <HvTooltip title="Open in new window">
    <HvButton icon component="a" href="#">
      <PopUp />
    </HvButton>
  </HvTooltip>
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
