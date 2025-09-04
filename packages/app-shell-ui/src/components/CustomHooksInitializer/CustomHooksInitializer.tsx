import { useServiceManagerInitializer } from "@hitachivantara/app-shell-services";

import useClearLocationState from "../../hooks/useClearLocationState";
import useCustomEventListener from "../../hooks/useCustomEventListener";

const CustomHooksInitializer = () => {
  useCustomEventListener();
  useClearLocationState();
  useServiceManagerInitializer();

  return null;
};

export default CustomHooksInitializer;
