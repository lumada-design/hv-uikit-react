import styled from "@emotion/styled";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  value?: string;
  options: DropdownOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const StyledDropdown = styled.div({});

  return (
    <StyledDropdown>
      <label>
        {label && label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </StyledDropdown>
  );
};

export default Dropdown;
