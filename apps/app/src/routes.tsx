// @ts-ignore fix tsconfig
import { index, layout, route } from "@react-router/dev/routes";

const getTemplatePath = (templateName: string) => {
  return `../../../packages/cli/src/templates/${templateName}/index.tsx`;
};

export const routes = [
  layout("./pages/layout/navigation.tsx", [
    index("./pages/Instructions.tsx"),
    route("test", "./pages/Test.tsx"),
    route("components", "./pages/Components.tsx"),
    route("flow", "./pages/Flow/Flow.tsx"),
    route("templates", "./pages/layout/templates.tsx", [
      route("welcome", getTemplatePath("Welcome")),
      // route("dashboard", getTemplatePath("Dashboard")),
      route("asset-inventory", getTemplatePath("AssetInventory")),
      route("list-view", getTemplatePath("ListView")),
      route("form", getTemplatePath("Form")),
      route("details-view", getTemplatePath("DetailsView")),
      route("kanban-board", getTemplatePath("KanbanBoard")),
      route("canvas", getTemplatePath("Canvas")),
    ]),
    route("*", "./pages/NotFound.tsx"),
  ]),
  route(
    "/dashboard-preview",
    "./pages/Flow/DashboardPreview/DashboardPreview.tsx",
  ),
];
