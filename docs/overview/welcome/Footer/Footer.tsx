import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Wrapper, Separator } from "./styles";

const Header = () => (
  <Wrapper>
    <Separator />
    <HvTypography variant="body">
      © Hitachi Vantara Corporation 2023.
    </HvTypography>
  </Wrapper>
);

export default Header;
