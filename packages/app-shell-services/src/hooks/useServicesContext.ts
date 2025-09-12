import { useContext } from "react";

import { ServicesContext } from "../providers/ServiceManagerProvider";

export const useServicesContext = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error(
      "useServicesContext must be used within an ServiceManagerProvider",
    );
  }

  return context;
};
