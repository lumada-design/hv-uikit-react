import { useEffect, useRef, useState } from "react";
import {
  HvBaseDropdown,
  HvLabel,
  HvPanel,
  HvTag,
} from "@hitachivantara/uikit-react-core";

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
  const focusTarget = useRef<HTMLDivElement>(null);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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

  const focusOnContainer = () => {
    focusTarget.current?.focus();
  };

  return (
    <div className="w-300px">
      <HvLabel>Tags dropdown input</HvLabel>
      <HvBaseDropdown
        placeholder={
          selectedColors.length ? (
            <div
              className="flex gap-xs overflow-scroll px-1px h-full items-center"
              ref={containerRef}
            >
              {selectedColors.map((color) => (
                <HvTag
                  key={color}
                  label={color}
                  onDelete={() => handleRemoveColor(color)}
                />
              ))}
            </div>
          ) : (
            "Select colors"
          )
        }
        onContainerCreation={focusOnContainer}
      >
        <HvPanel className="flex gap-xs flex-wrap">
          {colors
            .filter((color) => !selectedColors.includes(color))
            .map((color, idx) => {
              return (
                <HvTag
                  autoFocus={idx === 0}
                  key={color}
                  label={color}
                  onClick={() => handleAddColor(color)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleAddColor(color);
                    }
                  }}
                />
              );
            })}
        </HvPanel>
      </HvBaseDropdown>
    </div>
  );
}
