import useClearLocationState from "../../hooks/useClearLocationState";
import useCustomEventListener from "../../hooks/useCustomEventListener";

const CustomHooksInitializer = () => {
  useCustomEventListener();
  useClearLocationState();

  return null;
};

export default CustomHooksInitializer;
