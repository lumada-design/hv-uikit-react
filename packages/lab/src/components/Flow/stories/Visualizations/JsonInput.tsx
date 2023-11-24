import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const JsonInput: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Population Datakky7"
      outputs={[
        {
          label: "Json Data",
          isMandatory: true,
          provides: "jsonData",
        },
      ]}
      {...props}
    />
  );
};

JsonInput.meta = {
  label: "Json Input",
  groupId: "inputs",
};
