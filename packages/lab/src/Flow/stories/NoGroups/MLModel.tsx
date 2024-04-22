import { HvFlowNodeFC } from "@hitachivantara/uikit-react-lab";

// The code for these components are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/NoGroups
import { MLModelPrediction } from "./MLModelPrediction";
import { MLModelDetection } from "./MLModelDetection";

interface MLModelData {
  type: "prediction" | "detection";
}

export const MLModel: HvFlowNodeFC<MLModelData> = (props) => {
  const {
    data: { type },
  } = props;

  switch (type) {
    case "detection":
      return <MLModelDetection {...props} />;
    case "prediction":
      return <MLModelPrediction {...props} />;
    default:
      break;
  }
  return null;
};
