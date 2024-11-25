export const navigationData = [
  { id: "home", label: "Home", path: "/" },
  { id: "components", label: "Components", path: "/components" },
  {
    id: "templates",
    label: "Templates",
    path: "/templates",
    data: [
      {
        id: "welcome",
        label: "Welcome",
        path: "/templates/welcome",
      },
      {
        id: "asset-inventory",
        label: "Asset Inventory",
        path: "/templates/asset-inventory",
      },
      { id: "dashboard", label: "Dashboard", path: "/templates/dashboard" },
      { id: "list-view", label: "List View", path: "/templates/list-view" },
      { id: "form", label: "Form", path: "/templates/form" },
      {
        id: "details-view",
        label: "Details View",
        path: "/templates/details-view",
      },
      {
        id: "kanban-board",
        label: "Kanban Board",
        path: "/templates/kanban-board",
      },
      {
        id: "canvas",
        label: "Canvas",
        path: "/templates/canvas",
      },
    ],
  },
  { id: "flow", label: "Flow", path: "/flow" },
];
