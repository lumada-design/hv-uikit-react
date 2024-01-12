import { HvFlowNodeParam } from "../../types";
import Text from "./Text";
import Select from "./Select";
import Slider from "./Slider";

export type ParamRendererProps = {
  params: HvFlowNodeParam[];
  data: any;
};

const renderers = {
  text: Text,
  select: Select,
  slider: Slider,
};

const ParamRenderer = ({ params, data }: ParamRendererProps) => {
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

export default ParamRenderer;
