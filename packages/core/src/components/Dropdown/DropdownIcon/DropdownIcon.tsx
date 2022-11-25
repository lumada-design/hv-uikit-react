import { theme } from "@hitachivantara/uikit-styles";
import { HvBox } from "../..";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
};

export const DropdownIcon = () => (
  <HvBox sx={styles}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      height="12"
      width="12"
      focusable="false"
    >
      <path
        fill={theme.colors.acce4}
        d="M10.6 7.95l-.7.7L6 4.75l-3.9 3.9-.7-.7L6 3.35z"
      ></path>
    </svg>
  </HvBox>
);

DropdownIcon.displayName = "DropdownIcon";
