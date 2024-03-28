import styled from "@emotion/styled";
import {
  HvCheckBox,
  HvPanel,
  HvRadio,
  HvSwitch,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Level0Good, Level1 } from "@hitachivantara/uikit-react-icons";

const StyledPanel = styled(HvPanel)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: theme.space.xs,
});

const StyledContainer = styled(HvPanel)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  maxWidth: "580px",
});

export const ThemeSample = ({ title }: { title: string }) => {
  return (
    <StyledContainer>
      <HvTypography>{title}</HvTypography>

      <StyledPanel>
        <HvCheckBox label="Checkbox" />
        <HvRadio label="Radio" />
        <HvSwitch aria-label="Switch" />
        <Level0Good color="positive" />
        <Level1 color="neutral" />
        <Level1 color="negative" />
        <Level1 color="catastrophic" />
      </StyledPanel>
    </StyledContainer>
  );
};
