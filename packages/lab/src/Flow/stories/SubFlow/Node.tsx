import { useMemo } from "react";
import { css, cx } from "@emotion/css";
import { NodeProps as ReactFlowNodeProps } from "reactflow";
import { theme } from "@hitachivantara/uikit-styles";

import { useHvNode } from "../../hooks";
import { FactTable } from "./FactTable";
import { HierarchyData, Level } from "./Level";

const classes = {
  root: css({
    minHeight: 40,
    maxWidth: 250,
    maxHeight: 300,
    overflow: "auto",
    borderRadius: "16px",
  }),
  levelRoot: css({
    boxShadow: theme.colors.shadow,
    borderWidth: 0,
  }),
  levelHeader: css({
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
      >
        {sublevels}
      </Level>
    </div>
  );
};
