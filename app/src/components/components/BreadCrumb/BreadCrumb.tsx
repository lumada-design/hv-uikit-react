import { HvBreadCrumb } from "@hitachivantara/uikit-core";

const data = [
  { label: "Label 1", path: "route1" },
  { label: "Label 2", path: "route2" },
  { label: "Label 3", path: "route3" },
  { label: "Label 4", path: "route4" },
  { label: "Label 5", path: "route5" },
  { label: "Label 6", path: "route6" },
  { label: "Label 7", path: "route7" },
  { label: "Label 8", path: "route8" },
  { label: "Label 9", path: "route9" },
];

export const BreadCrumb = () => {
  return <HvBreadCrumb listRoute={data} />;
};
