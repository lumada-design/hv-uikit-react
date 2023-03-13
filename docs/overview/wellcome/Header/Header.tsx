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
            <HvTypography variant="title3">
              React UI library for the Next Design System
            </HvTypography>
          </>
          <div>
            <HvButton variant="secondarySubtle" style={{ marginRight: 10 }}>
              View on GitHub
            </HvButton>
            <HvButton variant="secondarySubtle">Install UI Kit</HvButton>
          </div>
        </ContentWrapper>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default Header;
