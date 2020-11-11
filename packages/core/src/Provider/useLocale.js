import { useContext } from "react";
import ConfigContext from "./context";

const useLocale = () => {
  const context = useContext(ConfigContext);
  return context.locale;
};

export default useLocale;
