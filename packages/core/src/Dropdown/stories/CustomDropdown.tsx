import { forwardRef, SyntheticEvent, useState } from "react";
import { css } from "@emotion/css";
import {
  HvBaseDropdown,
  HvButton,
  HvIconButton,
  HvInput,
  HvOption,
  HvPanel,
  HvSelect,
  HvSimpleGrid,
  HvTreeItem,
  HvTreeItemProps,
  HvTreeView,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Doc,
  Folders,
  Plant,
  Settings,
} from "@hitachivantara/uikit-react-icons";

type TreeData = { id: string; label: string; children?: TreeData[] };

const treeDataObject = {
  id: "user",
  label: "User",
  children: [
    {
      id: "Applications",
      label: "Applications",
      children: [
        { id: "Code", label: "Code.app" },
        { id: "Chrome", label: "Chrome.app" },
        { id: "Firefox", label: "Firefox.app" },
      ],
    },
    {
      id: "Documents",
      label: "Documents",
      children: [{ id: "secret", label: "secret.txt" }],
    },
    {
      id: "git",
      label: "git",
      children: [
        {
          id: "uikit-react",
          label: "uikit-react",
          children: [{ id: "uikit-pkg", label: "package.json" }],
        },
        {
          id: "app-shell",
          label: "app-shell",
          children: [{ id: "as-pkg", label: "package.json" }],
        },
      ],
    },
  ],
} satisfies TreeData;

const SimpleTreeItem = forwardRef<HTMLLIElement, HvTreeItemProps>(
  (props, ref) => {
    const { children, nodeId, label, ...others } = props;
    const Icon = children ? Folders : Doc;

    return (
      <HvTreeItem
        ref={ref}
        nodeId={nodeId}
        label={
          <div className={css({ display: "flex", alignItems: "center" })}>
            <Icon />
            <span style={{ flex: 1 }}>{label}</span>
          </div>
        }
        {...others}
      >
        {children}
      </HvTreeItem>
    );
  },
);

/** Render tree view items */
const renderItem = ({ id, label, children }: TreeData) => (
  <SimpleTreeItem key={id} nodeId={id} label={label}>
    {children?.map(renderItem)}
  </SimpleTreeItem>
);

export const CustomDropdown = () => {
  const [results, setResults] = useState<TreeData | undefined>(treeDataObject);

  const [selected, setSelected] = useState("Check out this Tree view");

  const [expanded, setExpanded] = useState(false);

  const search = (data: TreeData, searchTerm: string): TreeData | undefined => {
    let newChildren: TreeData[] = [];
    if (data.label.toLowerCase().includes(searchTerm.toLowerCase())) {
      return data;
    }
    if (data.children) {
      data.children.forEach((item) => {
        const result = search(item, searchTerm);
        if (result !== undefined) newChildren = [...newChildren, result];
      });
      return newChildren.length > 0
        ? { ...data, children: [...newChildren] }
        : undefined;
    }
    return undefined;
  };

  const handleNodeSelect = (
    _event: SyntheticEvent,
    nodeId: string | string[],
  ) => {
    if (typeof nodeId === "string") setSelected(nodeId);
  };

  const options = [
    { label: "String", value: "string" },
    { label: "Integer", value: "int" },
    { label: "Float", value: "float" },
  ];

  return (
    <HvSimpleGrid cols={2} style={{ width: 500 }}>
      <HvBaseDropdown
        adornment={<Plant />}
        placeholder={selected}
        variableWidth
        aria-label="custom dropdown sample"
      >
        <HvPanel style={{ width: 300 }}>
          <HvInput
            aria-label="Search Folder"
            placeholder="Search"
            type="search"
            classes={{ root: css({ paddingBottom: theme.space.xs }) }}
            onChange={(_, value) => setResults(search(treeDataObject, value))}
          />
          <HvTreeView
            aria-label="file system navigator"
            onNodeSelect={handleNodeSelect}
          >
            {results && renderItem(results)}
          </HvTreeView>
        </HvPanel>
      </HvBaseDropdown>
      <HvBaseDropdown
        component={
          <HvIconButton title="Settings">
            <Settings />
          </HvIconButton>
        }
        variableWidth
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <HvPanel style={{ width: 300 }}>
          <HvSimpleGrid cols={1}>
            <HvTypography variant="title4">Column Types</HvTypography>
            <HvSelect label="User ID" placeholder="Select an option">
              {options.map((option) => (
                <HvOption key={option.value} value={option.value}>
                  {option.label}
                </HvOption>
              ))}
            </HvSelect>
            <HvSelect label="Name" placeholder="Select an option">
              {options.map((option) => (
                <HvOption key={option.value} value={option.value}>
                  {option.label}
                </HvOption>
              ))}
            </HvSelect>
            <HvSelect label="Email" placeholder="Select an option">
              {options.map((option) => (
                <HvOption key={option.value} value={option.value}>
                  {option.label}
                </HvOption>
              ))}
            </HvSelect>
            <HvSelect label="Telephone" placeholder="Select an option">
              {options.map((option) => (
                <HvOption key={option.value} value={option.value}>
                  {option.label}
                </HvOption>
              ))}
            </HvSelect>
            <HvSimpleGrid cols={2}>
              <HvButton>Apply</HvButton>
              <HvButton
                variant="primarySubtle"
                onClick={() => setExpanded(false)}
              >
                Cancel
              </HvButton>
            </HvSimpleGrid>
          </HvSimpleGrid>
        </HvPanel>
      </HvBaseDropdown>
    </HvSimpleGrid>
  );
};
