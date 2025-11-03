import { useState } from "react";
import {
  HvBaseDropdown,
  HvInput,
  HvListItem,
  HvPanel,
  HvSearchInput,
  HvSelectionList,
  HvSelectionListProps,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect: HvSelectionListProps["onChange"] = (evt, val) => {
    setValue(val);
    setOpen(false);
  };

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
        <HvBaseDropdown
          expanded={open}
          onToggle={(_evt, s) => setOpen(s)}
          placeholder={value}
          classes={{
            root: "w-95px! border-r-1! border-r-border!",
            header:
              "border-none bg-bgContainer hover:bg-primaryDimmed rounded-none!",
            panel: "w-200px! max-h-260px!",
          }}
        >
          <HvPanel>
            <HvSearchInput
              placeholder="Search..."
              value={searchValue}
              onChange={(_, val) => setSearchValue(val)}
              classes={{
                root: "p-l-0 m-b-xxs",
              }}
            />
            <HvSelectionList
              value={value}
              onChange={handleSelect}
              className="w-full"
            >
              {countries
                .filter((country) =>
                  country.label
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
                )
                .map((country) => (
                  <HvListItem
                    key={country.code}
                    value={`${country.flag} ${country.code}`}
                    className=""
                  >
                    <div className="flex justify-between items-center">
                      <>
                        {country.flag} {country.label}
                      </>
                      <HvTypography
                        variant="captionLabel"
                        className="color-text-subtle"
                      >
                        {country.code}
                      </HvTypography>
                    </div>
                  </HvListItem>
                ))}
            </HvSelectionList>
          </HvPanel>
        </HvBaseDropdown>
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
