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

export const Selectable = () => {
  const [selectedTags, setSelectedTags] = useState<any>([]);

  const handleSelect = (
    event: React.MouseEvent<HTMLElement>,
    selected?: boolean,
    label?: string
  ) => {
    if (selected) {
      setSelectedTags((prev) => [...prev, label]);
    } else {
      setSelectedTags((prev) => prev.filter((item: any) => item !== label));
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
