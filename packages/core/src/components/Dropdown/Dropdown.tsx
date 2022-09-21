import styled from "@emotion/styled";
import { themeVars } from "theme";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value?: string;
  options: DropdownOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange }) => {
  const StyledDropdown = styled.div({
    border: `1px solid ${themeVars.colors.atmo4}`,
  });

  return (
    <StyledDropdown>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledDropdown>
  );
};

export default Dropdown;
