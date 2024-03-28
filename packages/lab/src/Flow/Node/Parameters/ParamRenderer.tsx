import { HvFlowNodeParam } from "../../types";
import Select from "./Select";
import Slider from "./Slider";
import Text from "./Text";

export type ParamRendererProps = {
  params: HvFlowNodeParam[];
  data: any;
};

const renderers = {
  text: Text,
  select: Select,
  slider: Slider,
};

export const ParamRenderer = ({ params, data }: ParamRendererProps) => {
  return (
    <>
      {params.map((param, idx) => {
        const Renderer = renderers[param.type];
        if (!Renderer) return null;

        return <Renderer key={idx} param={param} data={data} />;
      })}
    </>
  );
};
