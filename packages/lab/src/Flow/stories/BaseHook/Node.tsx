/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, cx } from "@emotion/css";
import { Handle, NodeToolbar, Position } from "reactflow";
import { HvIconButton, HvTypography } from "@hitachivantara/uikit-react-core";
import { Level0Good, Level2Average } from "@hitachivantara/uikit-react-icons";
import { HvFlowNodeFC, HvFlowNodeProps } from "@hitachivantara/uikit-react-lab";
import { theme } from "@hitachivantara/uikit-styles";

import { useHvNode } from "../../hooks/useNode";
import { isConnected, renderedIcon } from "../../Node/utils";

const classes = {
  root: css({
    borderRadius: "25px",
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    borderWidth: "1px",
    minWidth: "200px",
    minHeight: "100px",
  }),
  content: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: "100px",
    padding: theme.spacing("sm"),
  }),
  title: css({
    color: theme.colors.base_dark,
  }),
  cornerIcon: css({
    position: "absolute",
    top: `calc(-30px + ${theme.space.sm})`,
    right: `calc(-22px + ${theme.space.sm})`,
  }),
  contentIcon: css({
    width: 48,
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radii.round,
    marginRight: theme.space.xs,
  }),
  nodeToolbar: css({
    backgroundColor: theme.colors.atmo1,
    borderRadius: theme.radii.full,
  }),
  handle: css({
    backgroundColor: theme.colors.secondary_80,
    height: 10,
    width: 10,
  }),
};

export const Node: HvFlowNodeFC<any> = ({
  id,
  title: titleProp,
  subtitle: subtitleProp,
  groupId = "teapot",
  color: colorProp,
  icon: iconProp,
  inputs: inputsProp,
  outputs: outputsProp,
}: HvFlowNodeProps<unknown>) => {
  const {
    toggleShowActions,
    getNodeToolbarProps,
    handleDefaultAction,
    nodeActions,
    title,
    icon,
    color,
    subtitle,
    showActions,
    outputEdges,
    inputs,
    outputs,
  } = useHvNode({
    id,
    title: titleProp,
    subtitle: subtitleProp,
    color: colorProp,
    inputs: inputsProp,
    outputs: outputsProp,
    icon: iconProp,
    groupId,
  });
  return (
    <div
      className={cx(
        "nowheel",
        classes.root,
        css({ borderColor: showActions ? theme.colors.neutral : color }),
      )}
      onMouseEnter={toggleShowActions}
      onMouseLeave={toggleShowActions}
    >
      <NodeToolbar className={classes.nodeToolbar} {...getNodeToolbarProps()}>
        {nodeActions?.map((action) => (
          <HvIconButton
            key={action.id}
            title={action.label}
            onClick={() => handleDefaultAction(action)}
          >
            {renderedIcon(action.icon)}
          </HvIconButton>
        ))}
      </NodeToolbar>
      <div className={classes.cornerIcon}>
        {isConnected(id, "source", "0", outputEdges) ? (
          <Level0Good color="positive" />
        ) : (
          <Level2Average color="warning" />
        )}
      </div>
      {inputs && inputs?.length > 0 && (
        <Handle
          className={classes.handle}
          type="target"
          position={Position.Left}
          id="0"
        />
      )}
      {outputs && outputs?.length > 0 && (
        <Handle
          className={classes.handle}
          type="source"
          position={Position.Right}
          id="0"
        />
      )}
      <div className={classes.content}>
        <div
          className={cx(classes.contentIcon, css({ backgroundColor: color }))}
        >
          {icon}
        </div>
        <div>
          <HvTypography variant="title4" component="h2">
            {title}
          </HvTypography>
          <HvTypography variant="caption1">{subtitle}</HvTypography>
        </div>
      </div>
    </div>
  );
};
