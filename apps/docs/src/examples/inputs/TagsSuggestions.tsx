import { useEffect, useRef, useState } from "react";
import { Popper } from "@mui/material";
import {
  HvInput,
  HvLabel,
  HvPanel,
  HvTag,
  HvTagsInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Down, Up } from "@hitachivantara/uikit-react-icons";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [selectedColors]);

  useEffect(() => {
    setOpen(searchTerm !== "");
  }, [searchTerm]);

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
      <HvLabel>Tags with suggestions</HvLabel>
      <HvTagsInput
        ref={containerRef}
        onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
        onChange={(event, value) => {
          setSelectedColors(
            value.map((v) => (typeof v === "string" ? v : (v.label as string))),
          );
        }}
        onDelete={(event, value) => {
          handleRemoveColor(value as string);
        }}
        value={selectedColors}
        commitTagOn={["Comma"]}
        endAdornment={
          <Down
            rotate={open}
            onClick={() => setOpen((o) => !o)}
            className="cursor-pointer"
            size="xs"
          />
        }
        classes={{
          tagsList: "h-32px pr-0 overflow-hidden",
        }}
      />
      <Popper anchorEl={containerRef.current} open={open}>
        <HvPanel className="flex flex-wrap flex-col gap-xs w-300px bg-bgContainer border-rounded-16px border border-atmo3">
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
