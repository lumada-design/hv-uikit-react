import { ComponentType } from "react";
import { css } from "@emotion/css";
import { Caution, Level4Alt } from "@hitachivantara/uikit-react-icons";
import {
  theme,
  HvProgressBar,
  HvColor,
  HvTag,
  HvGridProps,
  HvTextArea,
  HvDropdown,
  HvTagsInput,
} from "@hitachivantara/uikit-react-core";

import { ModelDetails, useModelData } from "../data";
import { MetadataItem } from "../MetadataItem";

const ProgressBar = ({
  color = "secondary",
  value,
}: {
  color?: HvColor;
  value: number;
}) => {
  return (
    <HvProgressBar
      classes={{
        progressBarContainer: css({ height: 12 }),
        progressBar: css({ backgroundColor: theme.colors[color] || color }),
      }}
      value={value}
    />
  );
};

const entries = {
  description: {
    label: "Description",
    sm: 6,
    Component: ({ value }) => value,
    EditComponent: ({ value }) => (
      <HvTextArea name="description" rows={3} defaultValue={value} />
    ),
  },
  status: {
    label: "Status",
    Component: ({ value }) => (
      <div className={css({ display: "flex", alignItems: "center" })}>
        <Level4Alt color="negative" /> {value}
      </div>
    ),
    EditComponent: () => (
      <HvDropdown
        name="status"
        values={[
          { id: "critical", label: "Critical", selected: true },
          { id: "error", label: "Error" },
          { id: "warning", label: "Warning" },
        ]}
      />
    ),
  },
  tags: {
    label: "Tags",
    Component: ({ value }) => (
      <div className={css({ display: "flex", gap: theme.space.xs })}>
        {value.map((tag) => (
          <HvTag key={tag} label={tag} />
        ))}
      </div>
    ),
    EditComponent: ({ value }) => (
      <HvTagsInput name="tags" defaultValue={value} />
    ),
  },
  progress: {
    label: "Progress",
    Component: ({ value }) => <ProgressBar value={value * 100} />,
  },
  severity: {
    label: "Severity",
    Component: ({ value }) => (
      <div className={css({ display: "flex", alignItems: "center" })}>
        <Caution color="warning_120" /> {value}
      </div>
    ),
  },
  modifiedAt: {
    label: "Last Updated",
    Component: ({ value }) => value,
  },
  createdAt: {
    label: "Created",
    Component: ({ value }) => value,
  },
  risk: {
    label: "Risk",
    Component: ({ value }) => (
      <ProgressBar color="catastrophic" value={value * 100} />
    ),
  },
} satisfies Partial<
  Record<
    keyof ModelDetails,
    HvGridProps & {
      label: string;
      Component?: ComponentType<any>;
      EditComponent?: ComponentType<any>;
    }
  >
>;

export const Properties = ({ editMode }: { editMode?: boolean }) => {
  const { data } = useModelData();

  return Object.entries(entries).map(([key, entry]) => {
    const { label, Component, EditComponent, ...others } = entry;
    const value = data[key];
    const ContentComponent = (editMode && EditComponent) || Component;

    return (
      <MetadataItem
        key={key}
        xs={12}
        sm={3}
        title={editMode ? null : label}
        {...others}
      >
        {(ContentComponent && <ContentComponent value={value} />) || value}
      </MetadataItem>
    );
  });
};
