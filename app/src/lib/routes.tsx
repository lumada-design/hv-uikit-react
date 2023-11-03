import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Components = lazy(() => import("~/pages/Components"));
const Instructions = lazy(() => import("~/pages/Instructions"));
const Flow = lazy(() => import("~/pages/Flow"));
const DashboardPreview = lazy(() => import("~/pages/Flow/DashboardPreview"));
const NotFound = lazy(() => import("~/pages/NotFound"));

// Templates
/* eslint-disable import/no-relative-packages */
// @ts-nocheck
const AssetInventory = lazy(() => import("../../../templates/AssetInventory"));
const ListView = lazy(() => import("../../../templates/ListView"));
const Form = lazy(() => import("../../../templates/Form"));
const DetailsView = lazy(() => import("../../../templates/DetailsView"));
const Dashboard = lazy(() => import("../../../templates/Dashboard"));
const Welcome = lazy(() => import("../../../templates/Welcome"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/components" element={<Components />} />
    <Route path="/home" element={<Instructions />} />
    <Route path="/flow" element={<Flow />} />
    <Route path="/dashboard-preview" element={<DashboardPreview />} />
    <Route
      path="/templates"
      element={<Navigate to="/templates/welcome" replace />}
    />
    <Route path="/templates/welcome" element={<Welcome />} />
    <Route path="/templates/dashboard" element={<Dashboard />} />
    <Route path="/templates/asset-inventory" element={<AssetInventory />} />
    <Route path="/templates/list-view" element={<ListView />} />
    <Route path="/templates/form" element={<Form />} />
    <Route path="/templates/details-view" element={<DetailsView />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
