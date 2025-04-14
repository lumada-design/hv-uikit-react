import { HvIconButton } from "@hitachivantara/uikit-react-core";
import { Great } from "@hitachivantara/uikit-react-icons";

export default function HelloDefaultApp() {
  return (
    <HvIconButton
      variant="secondaryGhost"
      title="Hello from the Default App"
      onClick={() => alert("Hello from the Default App")}
    >
      <Great />
    </HvIconButton>
  );
}
