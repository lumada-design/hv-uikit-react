import { HvTagsInput } from "@hitachivantara/uikit-core";
import { useState } from "react";
import countryNamesArray from "./countries";

export const TagsInput = () => {
  const [currValueStr, setCurrValueStr] = useState([]);
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
      <HvTagsInput placeholder="Insert text" />
      <HvTagsInput
        placeholder="Insert text"
        value={[
          {
            disabled: true,
            label: "tag 1",
          },
          {
            disabled: true,
            label: "tag 2",
          },
          {
            disabled: true,
            label: "tag 3",
          },
        ]}
        disabled
      />
      <HvTagsInput
        placeholder="Insert text"
        value={["tag 1", "tag 2", "tag  3"]}
        readOnly
      />
      <HvTagsInput
        placeholder="Insert text"
        status="invalid"
        statusMessage="Oh no!"
      />
      <HvTagsInput placeholder="Insert text" multiline style={{ width: 200 }} />
      <HvTagsInput
        id="tags-list-12"
        label="Suggestions"
        description="A list of suggestions is presented when text is entered."
        aria-label="Suggestions"
        placeholder="Enter value"
        onChange={(event, value) => {
          setCurrValueStr(value);
        }}
        value={currValueStr}
        suggestionListCallback={suggestionHandler}
      />
    </div>
  );
};
