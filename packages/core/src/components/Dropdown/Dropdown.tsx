import { useState, useRef, CSSProperties } from "react";
import { theme } from "@hitachivantara/uikit-styles";

import { Typography } from "components";
import { useClickOutside } from "hooks";

import { DropdownHeader } from "./DropdownHeader";
import { DropdownList } from "./List";
import { DropdownListItem } from "./ListItem";
import { DropdownIcon } from "./DropdownIcon";

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

export const Dropdown = ({
  value,
  options,
  onChange,
  className,
}: DropdownProps) => {
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
    <div ref={ref} className={className} style={{ position: "relative" }}>
      <DropdownHeader isOpen={isOpen} onClick={onToggleHandler}>
        <Typography
          variant="label"
          css={{
            color: theme.colors.acce4,
          }}
        >
          {value}
        </Typography>
        <DropdownIcon />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownListItem
              onClick={() => onChangeHandler(option.value)}
              key={option.value}
              isSelected={option.value === value}
            >
              <Typography variant="label">{option.label}</Typography>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
