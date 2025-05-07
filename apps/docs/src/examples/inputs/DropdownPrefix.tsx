import { useState } from "react";
import { HvInput, HvOption, HvSelect } from "@hitachivantara/uikit-react-core";

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  // Apply formatting pattern: "XX XXX XX XX"
  return digits
    .slice(0, 9)
    .replace(/(\d{2})(\d{3})?(\d{2})?(\d{2})?/, (match, p1, p2, p3, p4) => {
      return [p1, p2, p3, p4].filter(Boolean).join(" ");
    });
};

const countries = [
  {
    label: "India",
    code: "+91",
    flag: "🇮🇳",
    format: formatPhoneNumber,
  },
  {
    label: "Portugal",
    code: "+351",
    flag: "🇵🇹",
    format: formatPhoneNumber,
  },
  {
    label: "United Kingdom",
    code: "+44",
    flag: "🇬🇧",
    format: formatPhoneNumber,
  },
  {
    label: "United States",
    code: "+1",
    flag: "🇺🇸",
    format: formatPhoneNumber,
  },
];

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
          classes={{
            panel: "w-100px!",
            root: "w-100px! border-r-1! border-r-border! bg-bgContainer! rounded-none!",
            select: "bg-transparent! border-none!",
          }}
          onChange={(evt, val) => {
            setSelectedCountry(val || "");
          }}
          enablePortal
        >
          {countries.map((country) => (
            <HvOption
              key={country.label}
              value={country.label}
              selected={selectedCountry === country.label}
            >
              {country.flag} {country.code}
            </HvOption>
          ))}
        </HvSelect>
      }
    />
  );
}
