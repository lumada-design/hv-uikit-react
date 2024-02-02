import { useState } from "react";
import { HvButton, HvOption, HvSelect } from "@hitachivantara/uikit-react-core";

const options = [
  { value: "ar", label: "Argentina", flag: "🇦🇷" },
  { value: "bg", label: "Belgium", flag: "🇧🇪" },
  { value: "pt", label: "Portugal", flag: "🇵🇹" },
  { value: "pl", label: "Poland", flag: "🇵🇱" },
  { value: "sp", label: "Spain", flag: "🇪🇸" },
  { value: "us", label: "United States", flag: "🇺🇸" },
];

export default () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const anySelected = selection.length > 0;

  return (
    <>
      <HvSelect
        multiple
        required
        open={open}
        name="countries"
        aria-label="Country"
        placeholder="Select countries"
        value={selection}
        style={{ width: 300 }}
        onChange={(evt, val) => setSelection(val)}
        onOpenChange={setOpen}
      >
        {options.map(({ value, label, flag }) => (
          <HvOption key={value} value={value} label={label}>
            {`${flag} ${label}`}
          </HvOption>
        ))}
      </HvSelect>
      <HvButton
        style={{ width: 120 }}
        variant="secondarySubtle"
        onClick={() => {
          setSelection(anySelected ? [] : options.map((o) => o.value));
        }}
      >
        {anySelected ? "Deselect all" : "Select all"}
      </HvButton>
    </>
  );
};
