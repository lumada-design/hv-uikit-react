import { Handle, NodeProps, Position } from "reactflow";

import {
  HvColorAny,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { getColor } from "@hitachivantara/uikit-styles";

import { useClasses } from "./FlowNode.styles";

export interface HvFlowNodeProps extends NodeProps {
  /** Node title. */
  title: string;
  /** Node description. */
  description: string;
  /** Node color. */
  color?: HvColorAny;
}

export const HvFlowNode = ({
  title,
  description,
  color: colorProp = theme.colors.cat3_40,
}: HvFlowNodeProps) => {
  const { classes, cx, css } = useClasses({});
  const color = getColor(colorProp);

  return (
    <div className={cx(css({ border: `1px solid ${color}` }), classes.root)}>
      <div
        className={cx(css({ backgroundColor: color }), classes.titleContainer)}
      >
        <HvTypography variant="title4" className={classes.title}>
          {title}
        </HvTypography>
      </div>
      <div className={classes.descriptionContainer}>
        <HvTypography>{description}</HvTypography>
      </div>
      <div className={classes.inputsTitleContainer}>
        <HvTypography>Inputs</HvTypography>
      </div>
      <div className={classes.inputsContainer}>
        <Handle
          type="target"
          position={Position.Left}
          style={{
            top: 155,
          }}
        />
        <HvTypography>Input 1</HvTypography>
      </div>
      <div className={classes.outputsTitleContainer}>
        <HvTypography>Outputs</HvTypography>
      </div>
      <div className={classes.outputsContainer}>
        <Handle
          type="source"
          position={Position.Right}
          style={{
            top: 245,
          }}
        />
        <HvTypography>Output 1</HvTypography>
      </div>
    </div>
  );
};
