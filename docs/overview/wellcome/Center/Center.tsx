import { HvTypography } from "@hitachivantara/uikit-react-core";
import { Wrapper, Separator } from "./styles";

const Header = () => (
  <Wrapper>
    <>
      <HvTypography variant="title2">
        The building blocks of awesome UI
      </HvTypography>
      <Separator />
      <HvTypography variant="body">
        Powerful components, flexible configurations, easy code, and great user
        experience - all working together to build your application.
      </HvTypography>
    </>
  </Wrapper>
);

export default Header;
