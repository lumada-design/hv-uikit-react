import { lazy } from "react";
import {
  Route,
  Navigate,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

const Layout = lazy(() => import("~/pages/Layout"));
const Components = lazy(() => import("~/pages/Components"));
const Instructions = lazy(() => import("~/pages/Instructions"));
const Flow = lazy(() => import("~/pages/Flow"));
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const NotFound = lazy(() => import("~/pages/NotFound"));

/* eslint-disable import/no-relative-packages */
// @ts-nocheck
const AssetInventoryTmpl = lazy(
  () => import("../../../templates/AssetInventory")
);
const ListViewTmpl = lazy(() => import("../../../templates/ListView"));
const FormTmpl = lazy(() => import("../../../templates/Form"));
const DetailsViewTmpl = lazy(() => import("../../../templates/DetailsView"));
const DashboardTmpl = lazy(() => import("../../../templates/Dashboard"));
const WelcomeTmpl = lazy(() => import("../../../templates/Welcome"));
// @ts-check

const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<Instructions />} />
    <Route path="/components" element={<Components />} />
    <Route path="/flow" element={<Flow />} />
    <Route path="/dashboard/:id" element={<Dashboard />} />
    <Route
      path="/templates"
      element={<Navigate to="/templates/welcome" replace />}
    />
    <Route path="/templates/welcome" element={<WelcomeTmpl />} />
    <Route path="/templates/dashboard" element={<DashboardTmpl />} />
    <Route path="/templates/asset-inventory" element={<AssetInventoryTmpl />} />
    <Route path="/templates/list-view" element={<ListViewTmpl />} />
    <Route path="/templates/form" element={<FormTmpl />} />
    <Route path="/templates/details-view" element={<DetailsViewTmpl />} />
    <Route path="/*" element={<NotFound />} />
  </Route>
);

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
