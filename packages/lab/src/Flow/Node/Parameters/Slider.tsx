import { useState } from "react";

import { css } from "@emotion/css";

import { useNodeId, useReactFlow } from "reactflow";

import { HvSlider, HvSliderProps } from "@hitachivantara/uikit-react-core";

import { HvFlowNodeSliderParam } from "../../types";

interface SliderProps {
  param: Omit<HvFlowNodeSliderParam, "type">;
  data: any;
}

const classes = {
  labelContainer: css({
    marginRight: 0,
    marginLeft: 0,
  }),
  sliderBase: css({
    padding: 0,
  }),
};

const Slider = ({ param, data }: SliderProps) => {
  const { id } = param;
  const nodeId = useNodeId();

  const reactFlowInstance = useReactFlow();

  const [value, setValue] = useState(data[id]);

  const onSliderChange: HvSliderProps["onChange"] = (val) => {
    reactFlowInstance.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [id]: val };
        }
        return node;
      })
    );
    setValue(val);
  };

  return (
    <HvSlider
      className="nodrag" // Prevents dragging within the input field
      defaultValues={value}
      onChange={onSliderChange}
      classes={{
        labelContainer: classes.labelContainer,
        sliderBase: classes.sliderBase,
      }}
      {...param}
    />
  );
};

export default Slider;
