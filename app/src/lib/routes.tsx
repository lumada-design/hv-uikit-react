import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Components = lazy(() => import("pages/Components"));
const Instructions = lazy(() => import("pages/Instructions"));
const NotFound = lazy(() => import("pages/NotFound"));

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
    <Route path="/" element={<Navigate to="/preview" replace />} />
    <Route path="/components" element={<Components />} />
    <Route
      path="/preview"
      element={<Navigate to="/preview/instructions" replace />}
    />
    <Route path="/preview/instructions" element={<Instructions />} />
    <Route path="/preview/welcome" element={<Welcome />} />
    <Route path="/preview/dashboard" element={<Dashboard />} />
    <Route path="/preview/asset-inventory" element={<AssetInventory />} />
    <Route path="/preview/list-view" element={<ListView />} />
    <Route path="/preview/form" element={<Form />} />
    <Route path="/preview/details-view" element={<DetailsView />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
