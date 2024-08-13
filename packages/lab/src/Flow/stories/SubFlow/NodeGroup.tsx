import { css, cx } from "@emotion/css";
import {
  NodeResizeControl,
  NodeResizer,
  NodeProps as ReactFlowNodeProps,
} from "reactflow";
import {
  HvDropDownMenu,
  HvListValue,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Fullscreen } from "@hitachivantara/uikit-react-icons";
import { useHvNode } from "@hitachivantara/uikit-react-lab";

const classes = {
  root: css({
    display: "flex",
    minWidth: 200,
    minHeight: 200,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.atmo1,
    borderRadius: "0 16px 16px 16px",
  }),
  content: css({
    borderRadius: "0 16px 16px 16px",
    backgroundColor: theme.colors.primary_20,
    width: "100%",
  }),
  header: css({
    display: "flex",
    width: "100%",
    height: "100%",
    padding: theme.spacing("2px", "xs", "2px", "xs"),
    borderRadius: "16px 16px 0 0",
    border: `1px dashed ${theme.colors.primary_80}`,
    borderBottom: "none",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary_20,
  }),
  headerBackground: css({
    display: "flex",
    position: "absolute",
    top: "-35px",
    backgroundColor: theme.colors.atmo1,
    borderRadius: "16px 16px 0 0",
    borderBottom: "none",
  }),
  title: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  actions: css({
    marginLeft: "auto",
  }),
};

interface NodeProps extends ReactFlowNodeProps {
  groupId: string;
  actions?: HvListValue[];
}

export const NodeGroup = ({ id: idProp, groupId, actions = [] }: NodeProps) => {
  const { title, icon, id } = useHvNode({
    id: idProp,
    groupId,
  });

  return (
    <div id={id} className={cx("nowheel", classes.root)}>
      <NodeResizer
        lineStyle={{
          borderStyle: "dashed",
          borderRadius: "0 16px 16px 16px",
        }}
      />
      <NodeResizeControl position="top-right">
        <Fullscreen style={{ position: "relative", left: -40 }} />
      </NodeResizeControl>
      <div className={cx(classes.headerBackground, css({ zIndex: 0 }))}>
        <div className={cx(classes.header, css({ zIndex: 0 }))}>
          {icon}
          <HvTypography
            variant="title4"
            component="p"
            className={classes.title}
          >
            {title}
          </HvTypography>
          {actions && (
            <HvDropDownMenu
              dataList={actions}
              classes={{ root: classes.actions }}
            />
          )}
        </div>
      </div>
      <div className={classes.content} />
      <div />
    </div>
  );
};
