import {
  Caution,
  Fail,
  IconBaseProps,
  Info,
  Success,
} from "@hitachivantara/uikit-react-icons";

export const iconVariant = (
  variant: "success" | "warning" | "error" | "info" | "default",
  color?: IconBaseProps["color"],
  semantic?: true,
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
