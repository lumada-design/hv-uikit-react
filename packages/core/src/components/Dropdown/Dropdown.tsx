import styled from "@emotion/styled";
import styles from "./styles";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value?: string;
  options: DropdownOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StyledDropdown = styled("div")(styles);

const Dropdown: React.FC<DropdownProps> = ({ value, options, onChange }) => {
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
