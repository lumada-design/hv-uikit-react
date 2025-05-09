import { useRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/material";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen((o) => !o)}
              ref={containerRef}
            />
          }
          className="mb-sm"
        />

        <Popper
          anchorEl={containerRef.current}
          open={open}
          placement="bottom-start"
          className="top-1px!"
        >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <HvPanel className="grid gap-xs w-300px border rounded-large!">
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
