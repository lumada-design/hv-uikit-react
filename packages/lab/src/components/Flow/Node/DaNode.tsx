import { SyntheticEvent, isValidElement } from "react";

import {
  ExtractNames,
  HvActionGeneric,
  HvActionsGenericProps,
  HvButton,
  HvDropDownMenu,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { getColor } from "@hitachivantara/uikit-styles";
import { Info } from "@hitachivantara/uikit-react-icons";

import { useFlowContext } from "../hooks";
import { staticClasses, useClasses } from "./DaNode.styles";
import { HvFlowParamsNode, HvFlowParamsNodeProps } from "./ParamsNode";

export { staticClasses as flowDaNodeClasses };
// TODO How to include here the types from the parent component?
export type HvFlowDaNodeClasses = ExtractNames<typeof useClasses>;

export interface HvFlowDaNodeProps<T>
  extends Omit<HvFlowParamsNodeProps<T>, "classes"> {
  /** Node description */
  description?: string;
  /** Node actions */
  actions?: HvActionGeneric[]; // HvFlowNodeActions[];
  /** Node action callback */
  actionCallback?: HvActionsGenericProps["actionsCallback"];
  /** Node maximum number of actions visible */
  maxVisibleActions?: number;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFlowDaNodeClasses | HvFlowParamsNodeProps<T>["classes"];
}

const renderedIcon = (actionIcon: HvActionGeneric["icon"]) =>
  isValidElement(actionIcon) ? actionIcon : (actionIcon as Function)?.();

export const HvDaFlowNode = ({
  id,
  type,
  headerItems,
  description,
  actions,
  actionCallback,
  maxVisibleActions = 1,
  classes: classesProp,
  children,
  ...props
}: HvFlowDaNodeProps<unknown>) => {
  const { classes } = useClasses(classesProp as HvFlowDaNodeClasses);

  const { nodeGroups, nodeTypes, defaultActions } = useFlowContext();
  const groupId = nodeTypes?.[type].meta?.groupId;
  const subtitle = nodeTypes?.[type].meta?.label;
  const groupLabel = groupId && nodeGroups && nodeGroups[groupId].label;

  const inputs = nodeTypes?.[type]?.meta?.inputs;
  const outputs = nodeTypes?.[type]?.meta?.outputs;
  const icon = groupId && nodeGroups && nodeGroups[groupId].icon;
  const colorProp = groupId && nodeGroups && nodeGroups[groupId].color;
  const color = getColor(colorProp);

  const actsVisible = actions?.slice(0, maxVisibleActions);
  const actsDropdown = actions?.slice(maxVisibleActions);

  return (
    <HvFlowParamsNode
      id={id}
      type={type}
      title={groupLabel}
      icon={icon}
      color={color}
      inputs={inputs}
      outputs={outputs}
      nodeActions={defaultActions}
      classes={classesProp as HvFlowParamsNodeProps<unknown>["classes"]}
      headerItems={
        <>
          {headerItems}
          {description && (
            <HvTooltip title={<HvTypography>{description}</HvTypography>}>
              <div>
                <Info />
              </div>
            </HvTooltip>
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
                  <HvTooltip
                    key={action.id}
                    title={<HvTypography>{action.label}</HvTypography>}
                  >
                    <div>
                      <HvButton
                        icon
                        onClick={(event: SyntheticEvent<Element, Event>) => {
                          actionCallback?.(event, id, action);
                        }}
                        aria-label={action.label}
                      >
                        {renderedIcon(action.icon)}
                      </HvButton>
                    </div>
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
    </HvFlowParamsNode>
  );
};
