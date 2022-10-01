import { useState, useRef, CSSProperties } from "react";
import styled from "@emotion/styled";
import { Typography } from "components";
import { useClickOutside } from "hooks";
import { themeVars, themeUtils } from "theme";

const DropDownIcon = () => (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        fill={themeVars.colors.acce4}
        d="M8 12L.5 4.79 1.205 4 8 10.617 14.795 4l.705.79z"
        className="color0"
      ></path>
    </svg>
  </div>
);

const DropDownWrapper = styled("div")`
  position: relative;
`;

interface DropDownHeaderProps {
  isOpen: boolean;
}

const DropDownHeader = styled("div")<DropDownHeaderProps>`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 6px ${themeUtils.space(2)} 6px ${themeUtils.space(2)};
  border: 1px solid ${themeVars.colors.acce4};
  background-color: ${themeVars.colors.atmo1};
  & div:last-child {
    margin-left: auto;
    transform: ${(props) => (props.isOpen ? "rotateX(180deg)" : null)};
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropDownList = styled("ul")`
  position: absolute;
  width: 100%;
  padding: ${themeUtils.space(2)};
  border: 1px solid ${themeVars.colors.acce4};
  border-top: none;
  background-color: ${themeVars.colors.atmo1};
  z-index: ${themeVars.zIndices.dropdown};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ListItemProps {
  isSelected: boolean;
}

const ListItem = styled("li")<ListItemProps>`
  padding: 6px 40px 6px ${themeUtils.space(2)};
  list-style: none;
  &:hover {
    background-color: ${themeVars.colors.acce2s};
  }
  background-color: ${(props) =>
    props.isSelected ? themeVars.colors.acce2s : null};
`;

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  css?: CSSProperties;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const onToggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const onChangeHandler = (nextValue: string) => {
    setIsOpen(false);
    onChange?.(nextValue);
  };

  return (
    <DropDownWrapper ref={ref} className={className}>
      <DropDownHeader isOpen={isOpen} onClick={onToggleHandler}>
        <Typography variant="label">{value}</Typography>
        <DropDownIcon />
      </DropDownHeader>
      {isOpen && (
        <DropDownList>
          {options.map((option) => (
            <ListItem
              onClick={() => onChangeHandler(option.value)}
              key={option.value}
              isSelected={option.value === value}
            >
              <Typography variant="label">{option.label}</Typography>
            </ListItem>
          ))}
        </DropDownList>
      )}
    </DropDownWrapper>
  );
};

if (process.env.NODE_ENV !== "production") {
  Dropdown.displayName = "Dropdown";
}
