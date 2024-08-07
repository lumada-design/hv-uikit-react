import { useMemo } from "react";
import { css, cx } from "@emotion/css";
import { NodeProps as ReactFlowNodeProps } from "reactflow";
import { theme } from "@hitachivantara/uikit-react-core";
import { useHvNode } from "@hitachivantara/uikit-react-lab";

import { FactTable } from "./FactTable";
import { HierarchyData, Level } from "./Level";

const classes = {
  root: css({
    width: 250,
    maxHeight: 300,
    overflow: "auto",
    borderRadius: "16px",
    boxShadow: theme.colors.shadow,
  }),
  levelRoot: css({
    boxShadow: theme.colors.shadow,
    borderWidth: 0,
  }),
  levelHeader: css({
    padding: theme.spacing("4px", "xs", "4px", "xs"),
    boxShadow: theme.colors.shadow,
    borderWidth: 0,
  }),
};

const renderItem = ({ label, children, type, ...others }: HierarchyData) => {
  if (type === "level") {
    return (
      <Level title={label} {...others}>
        {children?.map(renderItem)}
      </Level>
    );
  }

  return (
    <FactTable title={label} {...others}>
      {children?.map(renderItem)}
    </FactTable>
  );
};

interface NodeProps extends ReactFlowNodeProps {
  groupId: string;
  hierarchyData: HierarchyData[];
}

export const Node = ({ id: idProp, groupId, hierarchyData }: NodeProps) => {
  const { title, icon, id } = useHvNode({
    id: idProp,
    groupId,
  });

  const sublevels = useMemo(
    () => hierarchyData.map((level) => renderItem(level)),
    [hierarchyData],
  );

  return (
    <div className={cx("nowheel", classes.root)}>
      <Level
        id={id}
        title={title}
        icon={icon}
        actions={[]}
        classes={{
          root: classes.levelRoot,
          header: classes.levelHeader,
        }}
        collapsible
      >
        {sublevels}
      </Level>
    </div>
  );
};
