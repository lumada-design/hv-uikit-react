export const decreaseSize = (size: string) => {
  switch (size) {
    case "xl":
      return "L";

    case "l":
    case "lg":
      return "M";

    case "m":
    case "md":
      return "S";

    case "s":
    case "sm":
    default:
      return "XS";
  }
};

export const increaseSize = (size: string) => {
  switch (size) {
    case "xs":
      return "S";

    case "s":
      return "M";

    case "m":
      return "L";

    case "l":
    default:
      return "XL";
  }
};
