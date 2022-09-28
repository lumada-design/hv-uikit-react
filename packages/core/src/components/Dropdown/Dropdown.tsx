import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value?: string;
  options: DropdownOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledDropdown = styled("select")({
  border: `1px solid ${themeVars.colors.atmo4}`,
  "&:hover": {
    border: `1px solid ${themeVars.colors.acce1}`,
  },
  height: themeVars.space.base,
  padding: `0 ${themeUtils.spacing(1)} 0 ${themeUtils.spacing(1)}`,
  "& select": {
    color: themeVars.colors.acce1,
  },
});

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange }) => {
  return (
    <StyledDropdown value={value} onChange={onChange}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledDropdown>
  );
};

export default Dropdown;

if (process.env.NODE_ENV !== "production") {
  Dropdown.displayName = "Dropdown";
}
