import { useEffect, useRef, useState } from "react";
import { Popper } from "@mui/material";
import {
  HvAdornment,
  HvPanel,
  HvTag,
  HvTagsInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { DropDownXS } from "@hitachivantara/uikit-react-icons";

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

const lastUsed = ["Blue", "Red", "Green"];

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [selectedColors]);

  const handleAddColor = (color: string) => {
    setSelectedColors((prev) => {
      const newColors = prev.filter((c) => c !== color);
      return newColors.length ? [...newColors, color] : [color];
    });
  };

  const handleRemoveColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="w-300px">
      <HvTagsInput
        label="Tags with suggestions"
        ref={containerRef}
        onChange={(event, value) => {
          setSelectedColors(
            value.map((v) => (typeof v === "string" ? v : (v.label as string))),
          );
        }}
        onDelete={(_, value) => {
          handleRemoveColor(value as string);
        }}
        value={selectedColors}
        commitTagOn={["Comma"]}
        endAdornment={
          <HvAdornment
            tabIndex={0}
            icon={<DropDownXS rotate={open} size="xs" />}
            onClick={() => setOpen((o) => !o)}
          />
        }
        classes={{
          tagsList: "h-32px pr-0 overflow-hidden",
        }}
      />
      <Popper anchorEl={containerRef.current} open={open}>
        <HvPanel className="flex flex-wrap flex-col gap-xs w-300px border rounded-round">
          <HvTypography variant="caption1">Last Used:</HvTypography>
          <div className="flex gap-xs">
            {lastUsed.map((color, idx) => (
              <HvTag
                autoFocus={idx === 0}
                key={color}
                label={color}
                onClick={() => handleAddColor(color)}
              />
            ))}
          </div>
          <HvTypography variant="caption1">More colors:</HvTypography>
          <div className="flex flex-wrap gap-xs">
            {colors
              .filter(
                (color) =>
                  !selectedColors.includes(color) && !lastUsed.includes(color),
              )
              .map((color) => (
                <HvTag
                  key={color}
                  label={color}
                  onClick={() => handleAddColor(color)}
                />
              ))}
          </div>
        </HvPanel>
      </Popper>
    </div>
  );
}
