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

  const scrollToEnd = () => {
    setTimeout(
      () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
      },

      0,
    );
  };

  const handleAddColor = (color: string) => {
    setSelectedColors((prev) => {
      const newColors = prev.filter((c) => c !== color);
      return newColors.length ? [...newColors, color] : [color];
    });
    scrollToEnd();
  };

  const handleRemoveColor = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
    scrollToEnd();
  };

  const focusOnContainer = () => {
    focusTarget.current?.focus();
  };

  return (
    <div className="w-300px">
      <HvLabel
        label="Tags dropdown input"
        id="tags-dropdown-input"
        showGutter
      />
      <HvBaseDropdown
        aria-labelledby="tags-dropdown-input"
        onContainerCreation={focusOnContainer}
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
      >
        <div ref={focusTarget} tabIndex={-1} />
        <HvPanel className="flex gap-xs flex-wrap">
          {colors
            .filter((color) => !selectedColors.includes(color))
            .map((color, idx) => {
              return (
                <HvTag
                  // autoFocus={idx === 0}
                  key={color}
                  label={color}
                  onClick={() => handleAddColor(color)}
                />
              );
            })}
        </HvPanel>
      </HvBaseDropdown>
    </div>
  );
}
