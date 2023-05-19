import {
  Fail,
  Success,
  Caution,
  Info,
  IconBaseProps,
} from "@hitachivantara/uikit-react-icons";
import { HvDialogTitleVariant } from "..";

const iconVariant = (
  variant: HvDialogTitleVariant,
  color?: IconBaseProps["color"],
  semantic?: true
) => {
  switch (variant) {
    case "success":
      return <Success color={color} semantic={semantic && "positive"} />;
    case "warning":
      return <Caution color={color} semantic={semantic && "warning"} />;
    case "error":
      return <Fail color={color} semantic={semantic && "negative"} />;
    case "info":
      return <Info color={color} />;
    default:
      return null;
  }
};

export default iconVariant;
