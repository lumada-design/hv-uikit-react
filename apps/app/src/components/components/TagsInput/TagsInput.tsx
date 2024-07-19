import { useState } from "react";
import { css } from "@emotion/css";
import { HvTagProps, HvTagsInput } from "@hitachivantara/uikit-react-core";

import countryNamesArray from "./countries";

export const TagsInput = () => {
  const [currValueStr, setCurrValueStr] = useState<HvTagProps[]>([]);
  const countries = countryNamesArray;

  const suggestionHandler = (val: string) => {
    if (typeof val !== "string" || val === "") return null;
    const foundCountries = countries.filter((country) =>
      country.toUpperCase().startsWith(val.toUpperCase()),
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
      <div style={{ width: "31%" }}>
        <HvTagsInput label="Default" placeholder="Insert text" />
      </div>
      <div style={{ width: "31%" }}>
        <HvTagsInput
          label="Disabled"
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
      </div>
      <div style={{ width: "31%" }}>
        <HvTagsInput
          label="Readonly"
          placeholder="Insert text"
          value={["tag 1", "tag 2", "tag  3"]}
          readOnly
        />
      </div>
      <div style={{ width: "31%" }}>
        <HvTagsInput
          label="Invalid"
          placeholder="Insert text"
          status="invalid"
          statusMessage="Oh no!"
        />
      </div>
      <div style={{ width: "31%" }}>
        <HvTagsInput
          label="Multiline"
          placeholder="Insert text"
          multiline
          classes={{ tagsList: css({ width: "100%", height: 100 }) }}
        />
      </div>
      <div style={{ width: "31%" }}>
        <HvTagsInput
          id="tags-list-12"
          label="Suggestions"
          description="With suggestions on enter."
          aria-label="Suggestions"
          placeholder="Enter value"
          onChange={(event, value) => {
            setCurrValueStr(value);
          }}
          value={currValueStr}
          suggestionListCallback={suggestionHandler}
        />
      </div>
    </div>
  );
};
