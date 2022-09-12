import { useContext } from "react";
import { Context } from "Provider";

const useTheme = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useTheme must be used within Provider");
  }

  return context;
};

export default useTheme;
