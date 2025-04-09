import { Code } from "@phosphor-icons/react";
import { HvIconButton } from "@hitachivantara/uikit-react-core";

type PopupControlsProps = {
  onToggle: () => void;
  isExpanded: boolean;
  code: string;
};

export const PopupControls = ({ onToggle }: PopupControlsProps) => {
  return (
    <div className="absolute right-0 flex items-center p-xs gap-xs">
      {/* Toggle Code Button */}
      <HvIconButton onClick={onToggle} title={"Show Code"}>
        <Code />
      </HvIconButton>
    </div>
  );
};
