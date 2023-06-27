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
            <div />
            <HvTypography variant="title3">
              React UI library for the Next Design System
            </HvTypography>
          </>
          <div style={{ display: "flex", gap: 10 }}>
            <HvButton
              variant="primary"
              component="a"
              href="https://lumada-design.github.io/uikit/master/?path=/docs/overview-get-started--page"
            >
              Get Started
            </HvButton>
            <HvButton
              variant="primarySubtle"
              component="a"
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
