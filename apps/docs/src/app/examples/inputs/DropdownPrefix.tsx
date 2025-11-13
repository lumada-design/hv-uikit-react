import { useState } from "react";
import {
  HvInput,
  HvOption,
  HvOverflowTooltip,
  HvSelect,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState<string | null>(null);

  return (
    <HvInput
      label="Dropdown prefix"
      className="w-300px"
      onChange={(_, value) => {
        setPhoneNumber(value);
      }}
      placeholder="Type phone number..."
      value={phoneNumber}
      startAdornment={
        <HvSelect
          enablePortal
          value={value}
          onChange={(_, val) => setValue(val)}
          classes={{
            root: "w-95px! border-r-1! border-r-border! rounded-none!",
            panel: "w-200px! max-h-260px!",
            select:
              "border-none bg-bgContainer hover:bg-primaryDimmed rounded-none!",
          }}
          placeholder="Select..."
          renderValue={(option) => option?.value ?? ""}
        >
          {countries.map((country) => (
            <HvOption
              key={country.code}
              value={`${country.flag} ${country.code}`}
            >
              <div className="flex justify-between items-center">
                <HvOverflowTooltip data={`${country.flag} ${country.label}`} />
                <HvTypography
                  variant="captionLabel"
                  className="color-text-subtle"
                >
                  {country.code}
                </HvTypography>
              </div>
            </HvOption>
          ))}
        </HvSelect>
      }
    />
  );
}

const countries = [
  { flag: "🇦🇺", code: "+61", label: "Australia" },
  { flag: "🇧🇷", code: "+55", label: "Brazil" },
  { flag: "🇨🇦", code: "+1", label: "Canada" },
  { flag: "🇨🇱", code: "+56", label: "Chile" },
  { flag: "🇪🇬", code: "+20", label: "Egypt" },
  { flag: "🇫🇷", code: "+33", label: "France" },
  { flag: "🇩🇪", code: "+49", label: "Germany" },
  { flag: "🇮🇳", code: "+91", label: "India" },
  { flag: "🇮🇹", code: "+39", label: "Italy" },
  { flag: "🇯🇵", code: "+81", label: "Japan" },
  { flag: "🇲🇽", code: "+52", label: "Mexico" },
  { flag: "🇳🇿", code: "+64", label: "New Zealand" },
  { flag: "🇳🇴", code: "+47", label: "Norway" },
  { flag: "🇵🇹", code: "+351", label: "Portugal" },
  { flag: "🇸🇬", code: "+65", label: "Singapore" },
  { flag: "🇿🇦", code: "+27", label: "South Africa" },
  { flag: "🇰🇷", code: "+82", label: "South Korea" },
  { flag: "🇪🇸", code: "+34", label: "Spain" },
  { flag: "🇸🇪", code: "+46", label: "Sweden" },
  { flag: "🇨🇭", code: "+41", label: "Switzerland" },
  { flag: "🇦🇪", code: "+971", label: "United Arab Emirates" },
  { flag: "🇬🇧", code: "+44", label: "United Kingdom" },
  { flag: "🇺🇸", code: "+1", label: "United States" },
];
