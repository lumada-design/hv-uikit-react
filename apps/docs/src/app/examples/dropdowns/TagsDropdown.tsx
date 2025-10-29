/**
 * A dropdown that opens a popper with custom content.
 */
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  HvBaseDropdown,
  HvLabel,
  HvPanel,
  HvTag,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusTarget = useRef<HTMLDivElement>(null);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const scrollToEnd = () => {
    containerRef.current?.scrollTo({
      left: containerRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  const handleAddColor = (color: string) => {
    flushSync(() => {
      setSelectedColors((prev) => [...prev.filter((c) => c !== color), color]);
    });
    scrollToEnd();
  };

  const handleRemoveColor = (color: string) => {
    flushSync(() => {
      setSelectedColors((prev) => prev.filter((c) => c !== color));
    });
    scrollToEnd();
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
        onContainerCreation={() => focusTarget.current?.focus()}
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
            .map((color) => (
              <HvTag
                key={color}
                label={color}
                onClick={() => handleAddColor(color)}
              />
            ))}
        </HvPanel>
      </HvBaseDropdown>
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
