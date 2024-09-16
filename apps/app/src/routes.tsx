import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

/* eslint-disable import/no-relative-packages */
const AssetInventory = lazy(() => import("../../../templates/AssetInventory"));
const ListView = lazy(() => import("../../../templates/ListView"));
const Form = lazy(() => import("../../../templates/Form"));
const DetailsView = lazy(() => import("../../../templates/DetailsView"));
const Dashboard = lazy(() => import("../../../templates/Dashboard"));
const Welcome = lazy(() => import("../../../templates/Welcome"));
const KanbanBoard = lazy(() => import("../../../templates/KanbanBoard"));
const Canvas = lazy(() => import("../../../templates/Canvas"));

export const routes: RouteObject[] = [
  {
    lazy: () => import("~/pages/layout/navigation"),
    children: [
      { path: "/", lazy: () => import("~/pages/Instructions") },
      { path: "/test", lazy: () => import("~/pages/Test") },
      { path: "/components", lazy: () => import("~/pages/Components") },
      { path: "/flow", lazy: () => import("~/pages/Flow") },
      {
        path: "/templates",
        children: [
          { index: true, element: <Navigate to="welcome" replace /> },
          { path: "welcome", element: <Welcome /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "asset-inventory", element: <AssetInventory /> },
          { path: "list-view", element: <ListView /> },
          { path: "form", element: <Form /> },
          { path: "details-view", element: <DetailsView /> },
          { path: "kanban-board", element: <KanbanBoard /> },
          { path: "canvas", element: <Canvas /> },
        ],
      },
      { path: "/*", lazy: () => import("~/pages/NotFound") },
    ],
  },
  {
    path: "/dashboard-preview",
    lazy: () => import("~/pages/Flow/DashboardPreview"),
  },
];
