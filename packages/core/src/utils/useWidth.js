import { theme } from "@hitachivantara/uikit-styles";
import { useMediaQuery } from "@mui/material";

const useWidth = () => {
  const keys = Object.keys(theme.breakpoints.values).reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
};

export default useWidth;
