import { useState } from "react";
import { ClickAwayListener, Popper } from "@mui/base";
import {
  HvAdornment,
  HvInput,
  HvPanel,
  HvTag,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Add } from "@hitachivantara/uikit-react-icons";

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

export default function Demo() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const open = Boolean(anchorEl);

  const handleAddColor = (color: string) => {
    setSelectedColors((prev) => [...new Set([...prev, color])]);
  };

  const handleRemoveColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <>
      <div className="w-300px">
        <HvInput
          label="Tags with suggestions and empty input"
          onEnter={(event, value) => {
            handleAddColor(value);
          }}
          startAdornment={
            <HvAdornment
              tabIndex={0}
              icon={<Add rotate={open} size="xs" />}
              onClick={(evt) => setAnchorEl(evt.currentTarget)}
            />
          }
          className="mb-sm"
        />

        <Popper anchorEl={anchorEl} open={open} placement="bottom-start">
          <ClickAwayListener onClickAway={() => setAnchorEl(undefined)}>
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
    </>
  );
}
