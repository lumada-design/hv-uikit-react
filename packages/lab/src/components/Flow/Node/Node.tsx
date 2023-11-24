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
} from "@hitachivantara/uikit-react-core";
import { getColor } from "@hitachivantara/uikit-styles";
import { Down, Info, Up } from "@hitachivantara/uikit-react-icons";

import { useFlowContext, useFlowNode } from "../hooks";
import { HvFlowNodeInput, HvFlowNodeOutput, HvFlowNodeParam } from "../types";
import { staticClasses, useClasses } from "./Node.styles";
import ParamRenderer from "./Parameters/ParamRenderer";
import { HvFlowBaseNode, HvFlowBaseNodeProps } from "./BaseNode";

export { staticClasses as flowNodeClasses };

// TODO How to include here the types from the parent component?
export type HvFlowNodeClasses = ExtractNames<typeof useClasses>;

export type HvFlowNodeDefaults = {
  title?: string;
  subTitle?: string;
  color?: string;
  icon?: React.ReactNode;
};

export interface HvFlowNodeProps<T = any>
  extends Omit<HvFlowBaseNodeProps<T>, "classes"> {
  /** Node description */
  description?: string;
  /** Node actions */
  actions?: HvActionGeneric[]; // HvFlowNodeActions[];
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
  /** Node outputs. */
  outputs?: HvFlowNodeOutput[];
  /** Node inputs. */
  inputs?: HvFlowNodeInput[];
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowNodeClasses | HvFlowBaseNodeProps<T>["classes"];
}

const renderedIcon = (actionIcon: HvActionGeneric["icon"]) =>
  isValidElement(actionIcon) ? actionIcon : (actionIcon as Function)?.();

export const HvFlowNode = ({
  id,
  type,
  headerItems,
  description,
  actions,
  outputs,
  inputs,
  actionCallback,
  maxVisibleActions = 1,
  expanded = false,
  params,
  nodeDefaults,
  classes: classesProp,
  children,
  expandParamsButtonProps,
  ...props
}: HvFlowNodeProps<unknown>) => {
  const { classes } = useClasses(classesProp as HvFlowNodeClasses);

  const [showParams, setShowParams] = useState(expanded);

  const node = useFlowNode(id);

  const { nodeGroups, nodeTypes, defaultActions } = useFlowContext();

  const subtitle = nodeTypes?.[type].meta?.label || nodeDefaults?.subTitle;
  const groupId = nodeTypes?.[type].meta?.groupId;

  const groupLabel =
    (groupId && nodeGroups && nodeGroups[groupId].label) || nodeDefaults?.title;
  const icon =
    (groupId && nodeGroups && nodeGroups[groupId].icon) || nodeDefaults?.icon;
  const colorProp =
    (groupId && nodeGroups && nodeGroups[groupId].color) || nodeDefaults?.color;
  const color = getColor(colorProp);

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
      inputs={inputs}
      outputs={outputs}
      nodeActions={defaultActions}
      classes={classesProp as HvFlowBaseNodeProps<unknown>["classes"]}
      headerItems={
        <>
          {headerItems}
          {description && (
            <HvTooltip title={<HvTypography>{description}</HvTypography>}>
              <div>
                <Info color="base_dark" />
              </div>
            </HvTooltip>
          )}
          {hasParams && (
            <HvButton
              icon
              overrideIconColors={false}
              onClick={() => setShowParams((p) => !p)}
              aria-label={showParams ? "Collapse" : "Expand"}
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
          <ParamRenderer nodeId={id} params={params} data={node?.data} />
        </div>
      )}
    </HvFlowBaseNode>
  );
};
