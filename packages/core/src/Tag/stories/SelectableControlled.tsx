import { useState } from "react";

import { HvTag, HvTypography, theme } from "@hitachivantara/uikit-react-core";

import { css } from "@emotion/css";

const tags = [
  {
    label: "Asset 1",
    color: undefined,
    bgColor: "cat1",
  },
  {
    label: "Asset 2",
    color: theme.colors.negative_20,
    bgColor: "negative",
  },
  {
    label: "Asset 3",
    color: undefined,
    bgColor: "warning",
  },
  {
    label: "Asset 4",
    color: theme.colors.atmo1,
    bgColor: "positive",
  },
];

export const SelectableControlled = () => {
  const [selectedTags, setSelectedTags] = useState<any>(["Asset 1", "Asset 3"]);

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    selected?: boolean,
    tag?: React.ReactNode
  ) => {
    if (selected) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      setSelectedTags((prev) => prev.filter((item: any) => item !== tag));
    }
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: theme.space.sm,
      })}
    >
      <div className={css({ display: "flex", gap: theme.space.sm })}>
        {tags.map((tag) => (
          <HvTag
            label={tag.label}
            color={tag.bgColor}
            selectable
            selected={selectedTags.includes(tag.label)}
            onDelete={() => {
              alert("On Delete Action");
            }}
            onClick={(event, selected) =>
              handleSelect(event, selected, tag.label)
            }
            classes={{ root: css({ color: tag.color || "unset" }) }}
          />
        ))}
      </div>
      <div className={css({ display: "flex" })}>
        <HvTypography variant="label">Selected tags:</HvTypography>&nbsp;
        <HvTypography>{selectedTags.join(", ")}</HvTypography>
      </div>
    </div>
  );
};
