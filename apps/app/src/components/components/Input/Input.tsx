import { useState } from "react";
import { HvBox, HvInput } from "@hitachivantara/uikit-react-core";
import { Map } from "@hitachivantara/uikit-react-icons";

import countryNamesArray from "./countries";

export const Input = () => {
  const [value, setValue] = useState("");

  const countries = countryNamesArray;

  const suggestionHandler = (val: string) => {
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
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <HvBox sx={{ width: "31%" }}>
        <HvInput label="Default" placeholder="Insert text" />
      </HvBox>
      <HvBox sx={{ width: "31%" }}>
        <HvInput label="Search" placeholder="Search" type="search" />
      </HvBox>
      <HvBox sx={{ width: "31%" }}>
        <HvInput
          id="input-disabled-sample"
          disabled
          label="Disabled"
          description="Please enter your name"
          placeholder="Insert name"
        />
      </HvBox>
      <HvBox sx={{ width: "31%" }}>
        <HvInput
          readOnly
          label="Readonly"
          description="Please enter your name"
          placeholder="Insert name"
          defaultValue="You can't change this..."
        />
      </HvBox>
      <HvBox sx={{ width: "31%" }}>
        <HvInput
          id="invalid-state-input"
          label="Invalid"
          description="Please enter your last name"
          placeholder="Insert last name"
          status="invalid"
          statusMessage="Oh no!"
        />
      </HvBox>
      <HvBox sx={{ width: "31%" }}>
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
      </HvBox>
    </div>
  );
};
