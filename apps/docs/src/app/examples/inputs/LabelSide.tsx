/**
 * An input with a label on the side.
 */
import {
  HvFormElement,
  HvInput,
  HvLabel,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  return (
    <HvFormElement required className="flex gap-xs">
      <HvLabel label="Name" htmlFor="username-input" className="h-fit mt-5px" />
      <HvInput id="username" className="w-300px" required />
    </HvFormElement>
  );
}
