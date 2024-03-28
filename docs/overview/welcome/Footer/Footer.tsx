import { HvTypography } from "@hitachivantara/uikit-react-core";

import { Separator, Wrapper } from "./styles";

const Header = () => (
  <Wrapper>
    <Separator />
    <HvTypography variant="body">
      © Hitachi Vantara Corporation 2024.
    </HvTypography>
  </Wrapper>
);

export default Header;
