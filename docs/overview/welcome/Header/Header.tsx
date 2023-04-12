import { useState, useEffect } from "react";
import {
  HvButton,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Wrapper, BackgroundWrapper, ContentWrapper } from "./styles";

const getIsDark = (mode) => mode.includes("wicked");

const Header = () => {
  const { selectedMode } = useTheme();
  const [isDark, setIsDark] = useState(getIsDark(selectedMode));

  useEffect(() => {
    setIsDark(getIsDark(selectedMode));
  }, [selectedMode]);

  return (
    <BackgroundWrapper
      style={{
        backgroundImage: `url(${
          isDark ? "welcome-dark.png" : "welcome-light.png"
        })`,
      }}
    >
      <Wrapper>
        <ContentWrapper>
          <>
            <HvTypography variant="title1">NEXT UI Kit</HvTypography>
            <div></div>
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
