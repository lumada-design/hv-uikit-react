import { CSSInterpolation } from "@emotion/serialize";

export const styles: { [key: string]: CSSInterpolation } = {
  buttonWidth: {
    width: 120,
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    "& > button:last-child": {
      marginLeft: 20,
    },
  },
  buttonSpacing: {
    paddingLeft: 28,
  },
};
