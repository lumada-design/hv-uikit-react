import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvAccordion,
  HvButton,
  HvCheckBox,
  HvCheckBoxGroup,
  HvInput,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

// used to fill option with mock data
const optionFiller = (size: number) => {
  return Array(size).fill(`Option`);
};

const data = {
  Fridge: {
    "Dairy Products": optionFiller(5),
    Fish: optionFiller(3),
    Vegetables: optionFiller(4),
    Meat: optionFiller(3),
    Fruits: optionFiller(6),
    Drinks: optionFiller(3),
  },
  Closet: {
    Shirts: optionFiller(10),
    Coats: optionFiller(3),
    Sweatshirts: optionFiller(4),
  },
};

export const FacetSearch = () => {
  const [showMore, setShowMore] = useState(false);
  const showLimit = 3;

  const [searchStr, setSearchStr] = useState("");

  return (
    <div style={{ maxWidth: 228 }}>
      <HvAccordion label={Object.keys(data)[0]}>
        <HvCheckBoxGroup id={Object.keys(data)[0]} name={Object.keys(data)[0]}>
          {Object.entries(data.Fridge)
            .slice(0, showMore ? undefined : showLimit)
            .map(([word, options], index) => {
              return (
                <HvCheckBox
                  label={`${word} (${options.length})`}
                  value={options}
                  key={index}
                />
              );
            })}
          {!showMore ? (
            <HvButton variant="primaryGhost" onClick={() => setShowMore(true)}>
              <HvTypography link variant="label">
                {`See ${Object.entries(data.Fridge).length - showLimit} more`}
              </HvTypography>
            </HvButton>
          ) : (
            <div />
          )}
        </HvCheckBoxGroup>
      </HvAccordion>
      <HvAccordion label={Object.keys(data)[1]}>
        <HvInput
          id="search"
          type="search"
          placeholder="search"
          value={searchStr}
          onChange={(_, str) => setSearchStr(str)}
          classes={{ root: css({ marginBottom: theme.spacing(1) }) }}
        />
        <HvCheckBoxGroup
          id={Object.keys(data)[1]}
          name={Object.keys(data)[0]}
          showSelectAll
          selectAllLabel="Select All"
        >
          {Object.entries(data.Closet).map(([word, options], index) => (
            <HvCheckBox
              label={`${word} (${options.length})`}
              value={options}
              key={index}
              className={css({
                display: word.toLowerCase().includes(searchStr.toLowerCase())
                  ? "flex"
                  : "none",
              })}
            />
          ))}
        </HvCheckBoxGroup>
      </HvAccordion>
    </div>
  );
};
