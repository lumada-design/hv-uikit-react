import { useState } from "react";
import { css } from "@emotion/css";
import { HvTag, HvTypography, theme } from "@hitachivantara/uikit-react-core";

const tags = [
  {
    label: "Asset 1",
    color: undefined,
    bgColor: "cat1",
  },
  {
    label: "Asset 2",
    color: theme.colors.negativeDimmed,
    bgColor: "negative",
  },
  {
    label: "Asset 3",
    color: undefined,
    bgColor: "warning",
  },
  {
    label: "Asset 4",
    color: theme.colors.textDimmed,
    bgColor: "positive",
  },
];

export const Selectable = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: theme.space.sm,
      })}
    >
      <div className={css({ display: "flex", gap: theme.space.sm })}>
        {tags.map((tag, i) => (
          <HvTag
            key={`${tag.label}-${i}`}
            label={tag.label}
            color={tag.bgColor}
            selectable
            onDelete={() => {
              alert("On Delete Action");
            }}
            onClick={(event, selected) => {
              setSelectedTags((prev) =>
                selected
                  ? prev.concat(tag.label)
                  : prev.filter((item) => item !== tag.label),
              );
            }}
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
