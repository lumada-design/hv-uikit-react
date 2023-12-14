import { useMemo } from "react";
import { css } from "@emotion/css";
import {
  HvDropdown,
  HvQueryBuilder,
  HvQueryBuilderRendererProps,
  useQueryBuilderContext,
  theme,
  hvQueryBuilderDefaultOperators,
  HvSlider,
  HvQueryBuilderProps,
  HvTagsInput,
} from "@hitachivantara/uikit-react-core";

const attributes: HvQueryBuilderProps["attributes"] = {
  month: {
    label: "Month",
    type: "select",
  },
  weekday: {
    label: "Weekday",
    type: "select",
  },
  name: {
    label: "Name",
    type: "text",
  },
  age: {
    label: "Age",
    type: "slider",
  },
};

const operators: HvQueryBuilderProps["operators"] = {
  text: [...hvQueryBuilderDefaultOperators.text],
  select: [
    {
      operator: "equalsTo",
      label: "Equal to (=)",
      combinators: ["and", "or"],
    },
    {
      operator: "notEqual",
      label: "Not equal to (!=)",
      combinators: ["and"],
    },
    {
      operator: "range",
      label: "Range",
      combinators: ["and", "or"],
    },
    {
      operator: "Empty",
      label: "Empty",
      combinators: ["and", "or"],
    },
  ],
  slider: [
    {
      operator: "equalsTo",
      label: "Equal to (=)",
      combinators: ["and", "or"],
    },
    {
      operator: "notEqual",
      label: "Not equal to (!=)",
      combinators: ["and"],
    },
    {
      operator: "Empty",
      label: "Empty",
      combinators: ["and", "or"],
    },
  ],
};

const selectRenderers = {
  month: {
    values: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    label: "Month",
    labelStart: "Start month",
    labelEnd: "End month",
    placeholder: "Select a month",
  },
  weekday: {
    values: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    label: "Weekday",
    labelStart: "Start weekday",
    labelEnd: "End weekday",
    placeholder: "Select a weekday",
  },
};

type SelectValue = string | { start?: string; end?: string };

const SelectRenderer = ({
  id,
  operator,
  value,
  attribute,
}: HvQueryBuilderRendererProps<SelectValue>) => {
  const { dispatchAction } = useQueryBuilderContext();

  const values = useMemo(
    () =>
      selectRenderers[attribute].values.map((val) => ({
        id: val,
        label: val,
      })),
    [attribute]
  );

  const handleUpdateRange = (type: "start" | "end", val?: string) => {
    if (typeof value !== "string") {
      const newValue = {
        start: value?.start,
        end: value?.end,
      };
      newValue[type] = val;

      dispatchAction({
        type: "set-value",
        id,
        value: newValue,
      });
    }
  };

  if (operator === "range") {
    return (
      <div
        className={css({
          display: "flex",
          gap: theme.space.xs,
        })}
      >
        <HvDropdown
          required
          label={selectRenderers[attribute].labelStart}
          placeholder={selectRenderers[attribute].placeholder}
          values={values}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected) && selected.id) {
              handleUpdateRange("start", selected.id as string);
            } else {
              handleUpdateRange("start");
            }
          }}
          maxHeight={200}
        />
        <HvDropdown
          required
          label={selectRenderers[attribute].labelEnd}
          placeholder={selectRenderers[attribute].placeholder}
          values={values}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected) && selected.id) {
              handleUpdateRange("end", selected.id as string);
            } else {
              handleUpdateRange("end");
            }
          }}
          maxHeight={200}
        />
      </div>
    );
  }

  return (
    <HvDropdown
      required
      label={selectRenderers[attribute].label}
      placeholder={selectRenderers[attribute].placeholder}
      values={values}
      onChange={(selected) => {
        if (selected && !Array.isArray(selected) && selected.id) {
          dispatchAction({
            type: "set-value",
            id,
            value: selected.id,
          });
        } else {
          dispatchAction({ type: "set-value", id, value: null });
        }
      }}
      maxHeight={200}
    />
  );
};

const sliderRenderers = {
  age: {
    label: "Age (years)",
  },
};

const SliderRenderer = ({
  id,
  attribute,
}: HvQueryBuilderRendererProps<SelectValue>) => {
  const { dispatchAction } = useQueryBuilderContext();

  return (
    <HvSlider
      required
      label={sliderRenderers[attribute].label}
      onChange={(value) => {
        dispatchAction({
          type: "set-value",
          id,
          value: value ? value[0] : null,
        });
      }}
    />
  );
};

const textContainsRenderers = {
  name: {
    label: "Value",
  },
};

const TextContainsRenderer = ({
  id,
  attribute,
}: HvQueryBuilderRendererProps<SelectValue>) => {
  const { dispatchAction } = useQueryBuilderContext();

  return (
    <HvTagsInput
      label={textContainsRenderers[attribute].label}
      onChange={(event, value) => {
        dispatchAction({
          type: "set-value",
          id,
          value: value.length > 0 ? value : null,
        });
      }}
    />
  );
};

const renderers = {
  // Renderers for the custom attribute types "select" and "slider"
  select: SelectRenderer,
  slider: SliderRenderer,

  // Renderer to customize the "Contains" operator of the "text" attribute type
  text: {
    Contains: TextContainsRenderer,
  },
};

export const CustomRenderers = () => (
  <HvQueryBuilder
    attributes={attributes}
    operators={operators}
    renderers={renderers}
    maxDepth={0}
  />
);
