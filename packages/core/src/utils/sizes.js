export const decreaseSize = (size) => {
  switch (size) {
    case "XL":
      return "L";

    case "L":
    case "LG":
      return "M";

    case "M":
    case "MD":
      return "S";

    case "S":
    case "SM":
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
