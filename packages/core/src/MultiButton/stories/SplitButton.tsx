import { useMemo, useState } from "react";
import {
  HvButton,
  HvDropDownMenu,
  HvMultiButton,
  HvMultiButtonProps,
  HvSimpleGrid,
} from "@hitachivantara/uikit-react-core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";

interface Button
  extends Pick<HvMultiButtonProps, "variant" | "size" | "disabled"> {
  side: "left" | "right";
}

const buttons: Button[] = [
  { variant: "primary", side: "left" },
  { variant: "primarySubtle", side: "left" },
  { variant: "secondarySubtle", side: "left" },
  { variant: "primary", size: "sm", side: "right" },
  { variant: "primarySubtle", size: "sm", side: "right" },
  { variant: "secondarySubtle", size: "sm", side: "right" },
  { variant: "primary", size: "lg", side: "left" },
  { variant: "primarySubtle", size: "lg", side: "left" },
  { variant: "secondarySubtle", size: "lg", side: "left" },
  { variant: "primary", size: "sm", disabled: true, side: "left" },
  {
    variant: "primarySubtle",
    size: "md",
    disabled: true,
    side: "left",
  },
  {
    variant: "secondarySubtle",
    size: "lg",
    disabled: true,
    side: "left",
  },
];

export const SplitButton = () => {
  const options = useMemo(
    () => [
      { label: "Create merge commit" },
      { label: "Squash and merge" },
      { label: "Rebase and merge" },
    ],
    [],
  );
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <HvSimpleGrid cols={3} spacing="sm">
      {buttons.map(({ variant, size, disabled, side }, i) => (
        <div key={i}>
          <HvMultiButton
            variant={variant}
            size={size}
            disabled={disabled}
            split
          >
            {side === "left" && <HvButton>{selectedOption.label}</HvButton>}
            <HvDropDownMenu
              dataList={options}
              icon={<DropDownXS />}
              onClick={(e, item) =>
                setSelectedOption(
                  options.filter((option) => option.label === item.label)[0],
                )
              }
            />
            {side === "right" && <HvButton>{selectedOption.label}</HvButton>}
          </HvMultiButton>
        </div>
      ))}
    </HvSimpleGrid>
  );
};
