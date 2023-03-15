import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Components = lazy(() => import("pages/Components"));
const AssetInventory = lazy(() => import("pages/AssetInventory"));
const ListView = lazy(() => import("pages/ListView"));
const Form = lazy(() => import("pages/Form"));
const DetailsView = lazy(() => import("pages/DetailsView"));
const NotFound = lazy(() => import("pages/NotFound"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/templates/list-view" replace />} />
    <Route path="/components" element={<Components />} />
    <Route
      path="/templates"
      element={<Navigate to="/templates/asset-inventory" replace />}
    />
    <Route path="/templates/asset-inventory" element={<AssetInventory />} />
    <Route path="/templates/list-view" element={<ListView />} />
    <Route path="/templates/form" element={<Form />} />
    <Route path="/templates/details-view" element={<DetailsView />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
