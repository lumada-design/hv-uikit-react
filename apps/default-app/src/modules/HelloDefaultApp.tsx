import { HvButton } from "@hitachivantara/uikit-react-core";
import { Great } from "@hitachivantara/uikit-react-icons";

export default function HelloDefaultApp() {
  return (
    <HvButton
      icon
      variant="secondaryGhost"
      aria-label="Hello from the Default App"
      onClick={() => alert("Hello from the Default App")}
    >
      <Great />
    </HvButton>
  );
}
