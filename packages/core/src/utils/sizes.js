export const decreaseSize = (size) => {
  switch (size) {
    case "XL":
      return "L";

    case "L":
      return "M";

    case "M":
      return "S";

    case "S":
    default:
      return "XS";
  }
};

export const increaseSize = (size) => {
  switch (size) {
    case "XS":
      return "S";

    case "S":
      return "M";

    case "M":
      return "L";

    case "L":
    default:
      return "XL";
  }
};
