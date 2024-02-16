import { lazy } from "react";
import { Navigate, createBrowserRouter, RouteObject } from "react-router-dom";

/* eslint-disable import/no-relative-packages */
// Templates
const AssetInventory = lazy(
  () => import("../../../../templates/AssetInventory")
);
const ListView = lazy(() => import("../../../../templates/ListView"));
const Form = lazy(() => import("../../../../templates/Form"));
const DetailsView = lazy(() => import("../../../../templates/DetailsView"));
const Dashboard = lazy(() => import("../../../../templates/Dashboard"));
const Welcome = lazy(() => import("../../../../templates/Welcome"));

const routes: RouteObject[] = [
  {
    lazy: () => import("~/pages/layout/navigation"),
    children: [
      { path: "/", lazy: () => import("~/pages/Root") },
      { path: "/components", lazy: () => import("~/pages/Components") },
      { path: "/home", lazy: () => import("~/pages/Instructions") },
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

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
