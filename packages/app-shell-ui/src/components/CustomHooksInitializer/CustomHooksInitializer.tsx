import useClearLocationState from "../../lib/hooks/useClearLocationState";
import useCustomEventListener from "../../lib/hooks/useCustomEventListener";

const CustomHooksInitializer = () => {
  useCustomEventListener();
  useClearLocationState();

  return null;
};

export default CustomHooksInitializer;
