import {
  HvButton,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";

import { BackgroundWrapper, ContentWrapper, Wrapper } from "./styles";

const Header = () => {
  const { selectedMode } = useTheme();
  const mode = selectedMode === "wicked" ? "dark" : "light";

  return (
    <BackgroundWrapper
      style={{
        backgroundImage: `url(https://lumada-design.github.io/assets/welcome-${mode}.png)`,
      }}
    >
      <Wrapper>
        <ContentWrapper>
          <HvTypography variant="title1">NEXT UI Kit</HvTypography>
          <div />
          <HvTypography variant="title3">
            React UI library for the Next Design System
          </HvTypography>
          <div>
            <HvButton
              component="a"
              variant="primary"
              style={{ marginRight: 10 }}
              href="https://lumada-design.github.io/uikit/master/?path=/docs/overview-get-started--docs"
            >
              Get Started
            </HvButton>
            <HvButton
              component="a"
              variant="primarySubtle"
              href="https://github.com/lumada-design/hv-uikit-react"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </HvButton>
          </div>
        </ContentWrapper>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default Header;
