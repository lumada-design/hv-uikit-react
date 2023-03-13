import {
  HvPanel,
  HvCheckBox,
  HvRadio,
  HvSwitch,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";
import styled from "@emotion/styled";

export const Sample = ({ title }: { title: string }) => {
  const StyledPanel = styled(HvPanel)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px",

    "& > *": {
      margin: "0px 10px",
    },
  });

  const StyledContainer = styled(HvPanel)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "580px",
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
        <Level0Good semantic="sema1" />
        <Level1 semantic="sema2" />
        <Level1 semantic="cviz4" />
        <Level1 semantic="sema5" />
      </StyledPanel>
      <StyledHvTypography>{title}</StyledHvTypography>
    </StyledContainer>
  );
};
