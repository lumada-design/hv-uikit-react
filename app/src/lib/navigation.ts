const navigation = [
  { id: "components", label: "Components", path: "/components" },
  {
    id: "templates",
    label: "Preview",
    path: "/preview",
    data: [
      {
        id: "instuctions",
        label: "Instructions",
        path: "/preview/instructions",
      },
      {
        id: "asset-inventory",
        label: "Asset Inventory",
        path: "/preview/asset-inventory",
      },
      { id: "dashboard", label: "Dashboard", path: "/preview/dashboard" },
      { id: "list-view", label: "List View", path: "/preview/list-view" },
      { id: "form", label: "Form", path: "/preview/form" },
      {
        id: "details-view",
        label: "Details View",
        path: "/preview/details-view",
      },
    ],
  },
];

export default navigation;
