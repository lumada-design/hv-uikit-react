import { useRef, useState } from "react";
import { set } from "zod";
import {
  HvInput,
  HvOption,
  HvSelect,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

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
  const [formatttedPhoneNumber, setFormattedPhoneNumber] = useState("");

  return (
    <div className="w-300px">
      <HvInput
        classes={{
          inputRoot: "overflow-visible",
        }}
        onChange={(_, value) => {
          setFormattedPhoneNumber(
            countries.find((c) => c.label === selectedCountry)?.format(value) ||
              "",
          );
        }}
        value={formatttedPhoneNumber}
        startAdornment={
          <HvSelect
            value={selectedCountry}
            classes={{
              panel: "w-100px!",
              root: "w-100px! border-r-1! border-r-atmo3! bg-bgContainer! rounded-l-[4px]",
              select: "bg-transparent! border-none!",
            }}
            onChange={(evt, val) => {
              setSelectedCountry(val || "");
            }}
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
    </div>
  );
}
