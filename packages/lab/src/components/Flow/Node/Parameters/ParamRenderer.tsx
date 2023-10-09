import { HvFlowNodeParam } from "../../types";
import Text from "./Text";
import Select from "./Select";

export type ParamRendererProps = {
  nodeId: string;
  params: HvFlowNodeParam[];
  data: any;
};

const renderers = {
  text: Text,
  select: Select,
};

const ParamRenderer = ({ nodeId, params, data }: ParamRendererProps) => {
  return (
    <>
      {params.map((param, idx) => {
        const Renderer = renderers[param.type];
        if (Renderer) {
          return (
            <div key={idx}>
              <Renderer nodeId={nodeId} param={param} data={data} />
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default ParamRenderer;
