import { useState } from "react";

import { css } from "@emotion/css";

import { useReactFlow } from "reactflow";

import { HvSlider, HvSliderProps } from "@hitachivantara/uikit-react-core";

import { HvFlowNodeSliderParam } from "../../types";

interface SliderProps {
  nodeId: string;
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

const Slider = ({ nodeId, param, data }: SliderProps) => {
  const { id } = param;

  const reactFlowInstance = useReactFlow();

  const [value, setValue] = useState(data[id]);

  const onSliderChange: HvSliderProps["onChange"] = (val) => {
    const nodes = reactFlowInstance.getNodes();
    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, [id]: val };
      }
      return node;
    });
    reactFlowInstance.setNodes(newNodes);
    setValue(val);
  };

  return (
    <HvSlider
      className="nodrag"
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
