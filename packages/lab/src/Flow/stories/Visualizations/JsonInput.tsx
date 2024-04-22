import { HvFlowNode, HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

export const JsonInput: HvFlowNodeFC = (props) => {
  return (
    <HvFlowNode
      description="Population Datakky7"
      groupId="inputs"
      groupItem="json"
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
