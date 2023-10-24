import { HvTypography } from "@hitachivantara/uikit-react-core";

import { Wrapper, Separator } from "./styles";

const Header = () => (
  <Wrapper>
    <HvTypography variant="title2">The building blocks of NEXT UI</HvTypography>
    <Separator />
    <HvTypography variant="body">
      Composable and accessible component library that gives you the foundation
      to build your NEXT application faster and consistently.
    </HvTypography>
  </Wrapper>
);

export default Header;
