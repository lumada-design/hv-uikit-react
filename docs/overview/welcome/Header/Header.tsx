import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";

import { Wrapper, BackgroundWrapper, ContentWrapper } from "./styles";

const Header = () => {
  return (
    <BackgroundWrapper
      style={{
        backgroundImage: `url(welcome-dark.png)`,
      }}
    >
      <Wrapper>
        <ContentWrapper>
          <>
            <HvTypography variant="title1">NEXT UI Kit</HvTypography>
            <div />
            <HvTypography variant="title3">
              React UI library for the Next Design System
            </HvTypography>
          </>
          <div>
            <HvButton variant="primary" style={{ marginRight: 10 }}>
              <a href="https://lumada-design.github.io/uikit/master/?path=/docs/overview-get-started--page">
                Get Started
              </a>
            </HvButton>
            <HvButton variant="primarySubtle">
              <a
                href="https://github.com/lumada-design/hv-uikit-react"
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
              </a>
            </HvButton>
          </div>
        </ContentWrapper>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default Header;
