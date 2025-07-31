import { HvIconButton } from "@hitachivantara/uikit-react-core";
import { Debug } from "@hitachivantara/uikit-react-icons";

export const Component = () => {
  return (
    <div className="flex gap-sm">
      <HvIconButton title="Tooltip">
        <Debug />
      </HvIconButton>
    </div>
  );
};
