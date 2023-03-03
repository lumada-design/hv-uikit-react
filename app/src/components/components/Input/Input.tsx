import { HvInput } from "@hitachivantara/uikit-react-core";
import { Map } from "@hitachivantara/uikit-react-icons";
import { useState } from "react";
import countryNamesArray from "./countries";

export const Input = () => {
  const [value, setValue] = useState("");

  const countries = countryNamesArray;

  const suggestionHandler = (val) => {
    if (typeof val !== "string" || val === "") return null;
    const foundCountries = countries.filter((country) =>
      country.toUpperCase().startsWith(val.toUpperCase())
    );

    if (foundCountries.length === 0) return null;

    return foundCountries.map((country, idx) => ({
      id: `c_${idx}`,
      label: country,
    }));
  };

  return (
    <div
      style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <HvInput placeholder="Insert text" />
      <HvInput placeholder="Search" type="search" />
      <HvInput
        id="input-disabled-sample"
        disabled
        label="First name"
        description="Please enter your first name"
        placeholder="Insert first name"
      />
      <HvInput
        readOnly
        label="First name"
        description="Please enter your first name"
        placeholder="Insert first name"
        defaultValue="You can't change this..."
      />
      <HvInput
        id="invalid-state-input"
        label="Last name"
        description="Please enter your last name"
        placeholder="Insert last name"
        status={"invalid"}
        statusMessage={"Oh no!"}
      />
      <HvInput
        id="suggestions"
        label="Select a country"
        placeholder="Country"
        value={value}
        onChange={(_e, val) => setValue(val)}
        validation={(val) => val.includes("a")}
        suggestionListCallback={suggestionHandler}
        endAdornment={<Map />}
      />
    </div>
  );
};
