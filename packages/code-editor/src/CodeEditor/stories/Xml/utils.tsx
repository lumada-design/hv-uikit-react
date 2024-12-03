import { forwardRef } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvButtonProps,
  HvTooltip,
  HvTreeItem,
  HvTreeItemProps,
  HvTypography,
  theme,
  uniqueId,
} from "@hitachivantara/uikit-react-core";
import { Code, Info } from "@hitachivantara/uikit-react-icons";

export const buildTree = (xml: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "application/xml");

  const allKeys: string[] = [];
  const attributes: Attributes = {};

  const traverse = (node: HTMLElement | ChildNode) => {
    const structure: Tree = {};
    const { nodeName } = node;
    const nodeId = uniqueId();
    const nodeKey = `${nodeName}_${nodeId}`;

    allKeys.push(nodeKey);
    structure[nodeKey] = undefined;

    // Get attributes for node
    if ((node as any).attributes) {
      for (let i = 0; i < (node as any).attributes.length; i++) {
        const attr = (node as any).attributes[i];
        attributes[nodeKey] = {
          ...attributes[nodeKey],
          [attr.name]: attr.value,
        };
      }
    }

    // Get tree structure
    for (const child of node.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childStructure = traverse(child);

        const found = Object.keys(structure).find(
          (key) => key.split("_")[0] === nodeName,
        );

        if (found && structure[found]) {
          if (!Array.isArray(structure[found])) {
            structure[found] = [structure[found]];
          }
          if (Array.isArray(structure[found])) {
            (structure[found] as any[]).push(childStructure);
          }
        } else {
          structure[nodeKey] = childStructure;
        }
      } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) {
        structure[nodeKey] = child.nodeValue.trim();
      }
    }
    return structure;
  };

  return {
    tree: traverse(xmlDoc.documentElement),
    keys: allKeys,
    attributes,
  };
};

const classes = {
  headerRoot: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    background: theme.colors.atmo1,
    padding: theme.spacing("xs", "sm"),
    gap: theme.space.xs,
  }),
  label: css({ display: "flex", alignItems: "center" }),
};

export const Header = ({
  onClickSearch,
  onClickTree,
  onFormat,
}: {
  onClickSearch: HvButtonProps["onClick"];
  onClickTree: HvButtonProps["onClick"];
  onFormat: HvButtonProps["onClick"];
}) => (
  <div className={classes.headerRoot}>
    <HvTypography variant="label">XML</HvTypography>
    <Code />
    <div style={{ flex: 1 }} />
    <HvButton variant="primaryGhost" onClick={onClickSearch}>
      Search
    </HvButton>
    <HvButton variant="primaryGhost" onClick={onClickTree}>
      XML Tree
    </HvButton>
    <HvButton variant="primaryGhost" onClick={onFormat}>
      Format
    </HvButton>
  </div>
);

export type Tree = Record<string, object | object[] | string | undefined>;

export type Attributes = Record<string, Record<string, string>>;

interface SimpleTreeItemProps extends HvTreeItemProps {
  attributes: Attributes;
}

const SimpleTreeItem = forwardRef<HTMLLIElement, SimpleTreeItemProps>(
  function SimpleTreeItem(props, ref) {
    const { children, nodeId, label, attributes, ...others } = props;
    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        label={
          children ? (
            <div className={classes.label}>
              <HvTypography variant="label">{label}</HvTypography>
              {attributes[nodeId] && (
                <HvTooltip
                  title={Object.entries(attributes[nodeId])
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("; ")}
                >
                  <Info />
                </HvTooltip>
              )}
            </div>
          ) : (
            label
          )
        }
        {...others}
      >
        {children}
      </HvTreeItem>
    );
  },
);

export const renderItem = (
  key: string,
  value: object | object[] | string | undefined,
  attributes: Attributes,
) => {
  const label = key.split("_")[0];

  if (Array.isArray(value)) {
    return (
      <SimpleTreeItem
        key={key}
        nodeId={key}
        label={label}
        attributes={attributes}
      >
        {value.map((childValue) => {
          const childKey = Object.keys(childValue)[0];
          return renderItem(childKey, childValue[childKey], attributes);
        })}
      </SimpleTreeItem>
    );
  }

  if (typeof value === "object") {
    return (
      <SimpleTreeItem
        key={key}
        nodeId={key}
        label={label}
        attributes={attributes}
      >
        {Object.entries(value).map(([childKey, childValue]) =>
          renderItem(childKey, childValue, attributes),
        )}
      </SimpleTreeItem>
    );
  }

  return (
    <SimpleTreeItem
      key={key}
      nodeId={key}
      label={label}
      attributes={attributes}
    >
      {value}
    </SimpleTreeItem>
  );
};
