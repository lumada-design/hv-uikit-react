import { useContext } from "react";

import { HvFlowContext } from "../FlowContext";

export const useFlowContext = () => useContext(HvFlowContext);
