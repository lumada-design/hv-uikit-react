import styled from "@emotion/styled";

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
  const StyledDropdown = styled.div({});

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
