import { Navigate, type RouteObject } from "react-router";

/* eslint-disable import/no-relative-packages */
const templates: RouteObject[] = [
  { index: true, element: <Navigate to="welcome" replace /> },
  { path: "assets", lazy: () => import("../../../templates/AssetInventory") },
  { path: "list-view", lazy: () => import("../../../templates/ListView") },
  { path: "form", lazy: () => import("../../../templates/Form") },
  { path: "details", lazy: () => import("../../../templates/DetailsView") },
  { path: "dashboard", lazy: () => import("../../../templates/Dashboard") },
  { path: "welcome", lazy: () => import("../../../templates/Welcome") },
  { path: "kanban", lazy: () => import("../../../templates/KanbanBoard") },
  { path: "canvas", lazy: () => import("../../../templates/Canvas") },
];

export const routes: RouteObject[] = [
  {
    lazy: () => import("~/pages/layout/navigation"),
    children: [
      { path: "/", lazy: () => import("~/pages/Instructions") },
      { path: "/debug", lazy: () => import("~/pages/Debug") },
      { path: "/components", lazy: () => import("~/pages/Components") },
      { path: "/flow", lazy: () => import("~/pages/Flow") },
      { path: "/templates", children: templates },
      { path: "*", lazy: () => import("~/pages/NotFound") },
    ],
  },
  {
    path: "/dashboard-preview",
    lazy: () => import("~/pages/Flow/DashboardPreview"),
  },
];
