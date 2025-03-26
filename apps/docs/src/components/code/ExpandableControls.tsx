import { useState } from "react";
import { ArrowCounterClockwise, Check, Copy } from "@phosphor-icons/react";
import { HvButton, HvTooltip } from "@hitachivantara/uikit-react-core";

type ExpandableControlsProps = {
  onToggle: () => void;
  isExpanded: boolean;
  code: string;
  onReset: () => void;
};

export const ExpandableControls = ({
  onToggle,
  isExpanded,
  code,
  onReset,
}: ExpandableControlsProps) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="absolute right-0 flex items-center p-xs gap-xs">
      {/* Toggle Code Button */}
      <HvButton
        size="xs"
        variant="secondaryGhost"
        onClick={onToggle}
        aria-label={isExpanded ? "Hide Code" : "Show Code"}
      >
        {isExpanded ? <>Hide Code</> : <>Show Code</>}
      </HvButton>

      {/* Reset Button */}
      <HvTooltip title="Reset Code">
        <HvButton
          icon
          size="xs"
          variant="secondaryGhost"
          onClick={onReset}
          aria-label="Reset Code"
        >
          <ArrowCounterClockwise />
        </HvButton>
      </HvTooltip>

      {/* Copy Button */}
      <HvTooltip title={copySuccess ? "Copied!" : "Copy Code"}>
        <HvButton
          icon
          size="xs"
          variant="secondaryGhost"
          onClick={handleCopyToClipboard}
          aria-label="Copy Code"
        >
          {copySuccess ? <Check /> : <Copy />}
        </HvButton>
      </HvTooltip>
    </div>
  );
};
