import { useContext } from "react";

import { BannerContext } from "../BannerProvider";

const useBannerContext = () => {
  const context = useContext(BannerContext);

  if (context === undefined) {
    console.error("BannerContext was used outside of its Provider");
  }

  return context;
};

export default useBannerContext;
