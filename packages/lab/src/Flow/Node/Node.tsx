import React, { isValidElement, useState } from "react";
import {
  ExtractNames,
  HvActionGeneric,
  HvActionsGenericProps,
  HvButton,
  HvButtonProps,
  HvDropDownMenu,
  HvTooltip,
  HvTypography,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";

import { useFlowContext, useFlowNode } from "../hooks";
import { HvFlowNodeParam } from "../types";
import { staticClasses, useClasses } from "./Node.styles";
import ParamRenderer from "./Parameters/ParamRenderer";
import { HvFlowBaseNode, HvFlowBaseNodeProps } from "./BaseNode";

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
  /** Node description */
  description?: string;
  /** Node actions */
  actions?: HvActionGeneric[];
  /** Node action callback */
  actionCallback?: HvActionsGenericProps["actionsCallback"];
  /** Node maximum number of actions visible */
  maxVisibleActions?: number;
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
}

const renderedIcon = (actionIcon: HvActionGeneric["icon"]) =>
  isValidElement(actionIcon) ? actionIcon : (actionIcon as Function)?.();

export const HvFlowNode = ({
  id,
  type,
  headerItems,
  description,
  actions,
  actionCallback,
  maxVisibleActions = 1,
  expanded = false,
  params,
  nodeDefaults,
  classes: classesProp,
  labels: labelsProps,
  children,
  expandParamsButtonProps,
  ...props
}: HvFlowNodeProps<unknown>) => {
  const { classes } = useClasses(classesProp);

  const labels = useLabels(DEFAULT_LABELS, labelsProps);

  const [showParams, setShowParams] = useState(expanded);

  const node = useFlowNode(id);

  const { nodeGroups, nodeTypes, defaultActions } = useFlowContext();

  const subtitle = nodeTypes?.[type].meta?.label || nodeDefaults?.subTitle;
  const groupId = nodeTypes?.[type].meta?.groupId;

  const group = (groupId && nodeGroups && nodeGroups[groupId]) || undefined;
  const groupLabel = group?.label || nodeDefaults?.title;
  const icon = group?.icon || nodeDefaults?.icon;
  const color = group?.color || nodeDefaults?.color;

  const actsVisible = actions?.slice(0, maxVisibleActions);
  const actsDropdown = actions?.slice(maxVisibleActions);

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
              <div>
                <Info role="none" color="base_dark" />
              </div>
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
                <Up role="none" color="base_dark" />
              ) : (
                <Down role="none" color="base_dark" />
              )}
            </HvButton>
          )}
        </>
      }
      labels={labels}
      {...props}
    >
      {(subtitle || actsVisible?.length || actsDropdown?.length) && (
        <div className={classes.subtitleContainer}>
          {subtitle && (
            <div>
              <HvTypography>{subtitle}</HvTypography>
            </div>
          )}
          <div className={classes.actions}>
            {actions?.length && actions?.length > 0 && (
              <>
                {actsVisible?.map((action) => (
                  <HvTooltip key={action.id} title={action.label}>
                    <HvButton
                      icon
                      onClick={(event) => {
                        actionCallback?.(event, id, action);
                      }}
                      aria-label={action.label}
                    >
                      {renderedIcon(action.icon)}
                    </HvButton>
                  </HvTooltip>
                ))}
                {actsDropdown && actsDropdown.length > 0 && (
                  <HvDropDownMenu
                    keepOpened={false}
                    dataList={actsDropdown?.map((action) => ({
                      id: action.id,
                      label: action.label,
                    }))}
                    onClick={(event, action) => {
                      actionCallback?.(event, id, action as HvActionGeneric);
                    }}
                  />
                )}
              </>
            )}
          </div>
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
