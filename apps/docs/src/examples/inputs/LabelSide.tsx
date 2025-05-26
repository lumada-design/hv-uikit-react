import {
  HvFormElement,
  HvInput,
  HvLabel,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  return (
    <HvFormElement required className="flex gap-xs">
      <HvLabel label="Name" htmlFor="username-input" />
      <HvInput id="username" className="w-300px" required />
    </HvFormElement>
  );
}
