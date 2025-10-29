/**
 * An input with a dropdown prefix.
 */
import { useState } from "react";
import { HvInput, HvOption, HvSelect } from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [selectedCountry, setSelectedCountry] = useState("Portugal");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

  return (
    <HvInput
      label="Dropdown prefix"
      className="w-300px"
      onChange={(_, value) => {
        setFormattedPhoneNumber(
          countries.find((c) => c.label === selectedCountry)?.format(value) ||
            "",
        );
      }}
      value={formattedPhoneNumber}
      startAdornment={
        <HvSelect
          value={selectedCountry}
          variant="secondaryGhost"
          classes={{
            root: "w-100px! border-r-1! border-r-border! rounded-none!",
            select: "font-normal  border-none! rounded-none!",
          }}
          onChange={(evt, val) => {
            setSelectedCountry(val || "");
          }}
          enablePortal
        >
          {countries.map((country) => (
            <HvOption key={country.label} value={country.label}>
              {country.flag} {country.code}
            </HvOption>
          ))}
        </HvSelect>
      }
    />
  );
}

function format(value: string) {
  // Apply formatting pattern: "XX XXX XX XX"
  return value
    .replace(/\D/g, "")
    .slice(0, 9)
    .replace(/(\d{2})(\d{3})?(\d{2})?(\d{2})?/, (match, p1, p2, p3, p4) => {
      return [p1, p2, p3, p4].filter(Boolean).join(" ");
    });
}

const countries = [
  { flag: "🇮🇳", format, code: "+91", label: "India" },
  { flag: "🇵🇹", format, code: "+351", label: "Portugal" },
  { flag: "🇬🇧", format, code: "+44", label: "United Kingdom" },
  { flag: "🇺🇸", format, code: "+1", label: "United States" },
];
