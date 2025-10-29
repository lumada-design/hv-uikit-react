/**
 * An input that allows typing or opening a popper for suggestions.
 */
import { useRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/base";
import {
  HvAdornment,
  HvInput,
  HvPanel,
  HvTag,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Down } from "@hitachivantara/uikit-react-icons";

export default function Demo() {
  const anchorEl = useRef<HTMLInputElement | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleAddColor = (color: string) => {
    setSelectedColors((prev) => [...new Set([...prev, color])]);
    setValue("");
  };

  const handleRemoveColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="flex flex-col gap-sm items-center">
      <div className="w-300px">
        <HvInput
          label="Enter tags"
          onChange={(_, val) => setValue(val)}
          onEnter={(event, value) => {
            handleAddColor(value);
          }}
          ref={anchorEl}
          endAdornment={
            <HvAdornment
              tabIndex={0}
              icon={<Down rotate={open} size="xs" />}
              onClick={() => setOpen((prev) => !prev)}
            />
          }
          className="mb-sm"
          value={value}
        />

        <Popper
          anchorEl={anchorEl.current}
          open={open}
          placement="bottom-start"
        >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <HvPanel className="grid gap-xs w-300px my-2px border rounded-large">
              <HvTypography variant="caption1">More colors:</HvTypography>
              <div className="flex flex-wrap gap-xs">
                {colors
                  .filter((color) => !selectedColors.includes(color))
                  .map((color) => (
                    <HvTag
                      key={color}
                      label={color}
                      onClick={() => handleAddColor(color)}
                    />
                  ))}
              </div>
            </HvPanel>
          </ClickAwayListener>
        </Popper>
      </div>
      <div className="flex flex-wrap gap-xs">
        {selectedColors.map((color) => (
          <HvTag
            key={color}
            label={color}
            onDelete={() => handleRemoveColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

const colors = [
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Purple",
  "White",
  "Black",
  "Orange",
  "Pink",
  "Brown",
  "Gray",
  "Cyan",
  "Magenta",
  "Lime",
  "Teal",
  "Lavender",
];
