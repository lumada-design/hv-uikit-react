import { ComponentType } from "react";
import { css } from "@emotion/css";
import {
  HvColor,
  HvDropdown,
  HvGridProps,
  HvProgressBar,
  HvTag,
  HvTagsInput,
  HvTextArea,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Caution, Level4Alt } from "@hitachivantara/uikit-react-icons";

import { ModelDetails, useModelData } from "./data";
import { MetadataItem } from "./MetadataItem";

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

const entries: Partial<
  Record<
    keyof ModelDetails,
    HvGridProps & {
      label: string;
      Component?: ComponentType<any>;
      EditComponent?: ComponentType<any>;
    }
  >
> = {
  description: {
    label: "Description",
    sm: 6,
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
        {value.map((tag: string) => (
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
        <Caution color="warningStrong" /> {value}
      </div>
    ),
  },
  modifiedAt: {
    label: "Last Updated",
  },
  createdAt: {
    label: "Created",
  },
  risk: {
    label: "Risk",
    Component: ({ value }) => (
      <ProgressBar color="catastrophic" value={value * 100} />
    ),
  },
};

export const Properties = ({ editMode }: { editMode?: boolean }) => {
  const { data } = useModelData();

  const elements = Object.entries(entries).map(([key, entry]) => {
    const { label, Component, EditComponent, ...others } = entry;
    const value = data[key as keyof ModelDetails];
    const ContentComponent = (editMode && EditComponent) || Component;

    return (
      <MetadataItem key={key} xs={12} sm={3} title={label} {...others}>
        {(ContentComponent && <ContentComponent value={value} />) ||
          (value as any)}
      </MetadataItem>
    );
  });

  return <>{elements}</>;
};
