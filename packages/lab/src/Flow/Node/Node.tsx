import React, { useState } from "react";
import { css } from "@emotion/css";
import {
  ExtractNames,
  HvActionsGeneric,
  HvActionsGenericProps,
  HvButton,
  HvButtonProps,
  HvInlineEditor,
  HvTooltip,
  HvTypography,
  theme,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";

import { useFlowContext, useFlowNode, useFlowNodeUtils } from "../hooks";
import { HvFlowNodeParam } from "../types";
import { HvFlowBaseNode, HvFlowBaseNodeProps } from "./BaseNode";
import { staticClasses, useClasses } from "./Node.styles";
import { ParamRenderer } from "./Parameters";

export { staticClasses as flowNodeClasses };

export type HvFlowNodeClasses = ExtractNames<typeof useClasses>;

export type HvFlowNodeDefaults = {
  title?: string;
  subTitle?: string;
  color?: string;
  icon?: React.ReactNode;
};

const DEFAULT_LABELS = {
  collapseLabel: "Collapse",
  expandLabel: "Expand",
};

export interface HvFlowNodeProps<T = any> extends HvFlowBaseNodeProps<T> {
  /** Node description. */
  description?: string;
  /** Node actions. */
  actions?: HvActionsGenericProps["actions"];
  /**
   * Node action callback.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionCallback?: HvActionsGenericProps["actionsCallback"]; // TODO - remove in v6
  /** Node action callback. */
  onAction?: HvActionsGenericProps["onAction"];
  /** Whether the actions should be all icon buttons when visible. @default true */
  actionsIconOnly?: HvActionsGenericProps["iconOnly"];
  /** Node maximum number of actions visible. */
  maxVisibleActions?: HvActionsGenericProps["maxVisibleActions"];
  /** Node expanded */
  expanded?: boolean;
  /** Node parameters */
  params?: HvFlowNodeParam[];
  /** A set of node default values for when there are no groups to fetch this data from. */
  nodeDefaults?: HvFlowNodeDefaults;
  /** Props to be passed to the expand parameters button. */
  expandParamsButtonProps?: HvButtonProps;
  /** Labels used on the node. */
  labels?: HvFlowBaseNodeProps["labels"] & Partial<typeof DEFAULT_LABELS>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowNodeClasses;
  /** Remove the ability to customize the label of the Node */
  disableInlineEdit?: boolean;
}

export const HvFlowNode = ({
  id,
  type,
  headerItems,
  description,
  actions,
  actionCallback, // TODO - remove in v6
  onAction,
  maxVisibleActions = 1,
  expanded = false,
  actionsIconOnly = true,
  params,
  nodeDefaults,
  classes: classesProp,
  labels: labelsProps,
  children,
  expandParamsButtonProps,
  disableInlineEdit,
  ...props
}: HvFlowNodeProps<unknown>) => {
  const { classes } = useClasses(classesProp);

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

  const [showParams, setShowParams] = useState(expanded);

  const node = useFlowNode();

  const { setNodeData } = useFlowNodeUtils();

  const { nodeGroups, nodeTypes, defaultActions } = useFlowContext();

  const subtitle =
    node?.data.label || nodeTypes?.[type].meta?.label || nodeDefaults?.subTitle;
  const groupId = nodeTypes?.[type].meta?.groupId;

  const inlineEditorWidth =
    actions === undefined ||
    (Array.isArray(actions) && actions.length === 0) ||
    maxVisibleActions === 0
      ? "100%"
      : `calc(200px - calc(${maxVisibleActions} * 32px + ${theme.spacing(2)}))`;

  const group = (groupId && nodeGroups && nodeGroups[groupId]) || undefined;
  const groupLabel = group?.label || nodeDefaults?.title;
  const icon = group?.icon || nodeDefaults?.icon;
  const color = group?.color || nodeDefaults?.color;

  const hasParams = !!(params && params.length > 0);

  return (
    <HvFlowBaseNode
      id={id}
      type={type}
      title={groupLabel}
      icon={icon}
      color={color}
      nodeActions={defaultActions}
      classes={classes}
      headerItems={
        <>
          {headerItems}
          {description && (
            <HvTooltip title={description}>
              <Info color="base_dark" />
            </HvTooltip>
          )}
          {hasParams && (
            <HvButton
              icon
              overrideIconColors={false}
              onClick={() => setShowParams((p) => !p)}
              aria-label={
                showParams ? labels?.collapseLabel : labels?.expandLabel
              }
              {...expandParamsButtonProps}
            >
              {showParams ? (
                <Up color="base_dark" />
              ) : (
                <Down color="base_dark" />
              )}
            </HvButton>
          )}
        </>
      }
      labels={labels as HvFlowNodeProps["labels"]}
      {...props}
    >
      {(subtitle || actions) && (
        <div className={classes.subtitleContainer}>
          {subtitle &&
            (disableInlineEdit ? (
              <div>
                <HvTypography>{subtitle}</HvTypography>
              </div>
            ) : (
              <div>
                <HvInlineEditor
                  defaultValue={subtitle}
                  showIcon
                  classes={{
                    root: css({
                      display: "inline-flex",
                      flexGrow: 1,
                    }),
                    button: css({ justifyContent: "space-between" }),
                    inputRoot: css({
                      width: inlineEditorWidth,
                    }),
                  }}
                  onBlur={(evt, value) =>
                    setNodeData((prev) => ({ ...prev, label: value }))
                  }
                />
              </div>
            ))}
          {actions && (
            <HvActionsGeneric
              className={classes.actions}
              classes={{ button: classes.actionsButton }}
              actions={actions}
              actionsCallback={actionCallback}
              onAction={onAction}
              maxVisibleActions={maxVisibleActions}
              iconOnly={actionsIconOnly}
            />
          )}
        </div>
      )}
      {children}
      {showParams && params && (
        <div className={classes.paramsContainer}>
          <ParamRenderer params={params} data={node?.data} />
        </div>
      )}
    </HvFlowBaseNode>
  );
};
