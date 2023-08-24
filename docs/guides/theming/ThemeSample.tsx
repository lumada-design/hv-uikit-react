import {
  HvPanel,
  HvCheckBox,
  HvRadio,
  HvSwitch,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";
import styled from "@emotion/styled";

export const ThemeSample = ({ title }: { title: string }) => {
  const StyledPanel = styled(HvPanel)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",
    flexWrap: "wrap",
    "& > *": {
      margin: "0px 10px",
    },
  });

  const StyledContainer = styled(HvPanel)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    maxWidth: "580px",
  });

  const StyledHvTypography = styled(HvTypography)({
    fontSize: "12px",
    letterSpacing: "0px",
  });

  return (
    <StyledContainer>
      <StyledPanel>
        <HvCheckBox label="Checkbox" />
        <HvRadio label="Radio" />
        <HvSwitch aria-label="Switch" />
        <Level0Good color="positive" />
        <Level1 color="neutral" />
        <Level1 color="negative" />
        <Level1 color="catastrophic" />
      </StyledPanel>
      <StyledHvTypography>{title}</StyledHvTypography>
    </StyledContainer>
  );
};
