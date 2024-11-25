import { useState } from "react";
import {
  ArrowCounterClockwise,
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
} from "@phosphor-icons/react";
import { HvButton, HvTooltip } from "@hitachivantara/uikit-react-core";

type ToolbarProps = {
  onToggle: () => void;
  isExpanded: boolean;
  code: string;
  onReset: () => void;
};

export const Toolbar = ({
  onToggle,
  isExpanded,
  code,
  onReset,
}: ToolbarProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset icon after 2 seconds
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="flex items-center p-1 border border-[var(--uikit-colors-atmo4)] bg-[var(--uikit-colors-atmo1)]">
      {/* Code Toggle Button */}
      <div className="flex flex-1 justify-center items-center">
        <HvButton size="xs" variant="secondaryGhost" onClick={onToggle}>
          {isExpanded ? (
            <>
              Show Code <ArrowDown />
            </>
          ) : (
            <>
              Hide Code <ArrowUp />
            </>
          )}
        </HvButton>
      </div>
      {/* Icon Buttons */}
      <div className="flex gap-xs">
        {/* Reset Button */}
        <HvTooltip title="Reset code">
          <HvButton icon size="xs" variant="secondaryGhost" onClick={onReset}>
            <ArrowCounterClockwise />
          </HvButton>
        </HvTooltip>
        {/* Copy Button */}
        <HvTooltip title="Copy code">
          <HvButton
            icon
            size="xs"
            variant="secondaryGhost"
            onClick={handleCopyToClipboard}
          >
            {copySuccess ? <Check /> : <Copy />}
          </HvButton>
        </HvTooltip>
      </div>
    </div>
  );
};
