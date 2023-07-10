import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Components = lazy(() => import("pages/Components"));
const Instructions = lazy(() => import("pages/Instructions"));
const AssetInventory = lazy(() => import("pages/AssetInventory"));
const ListView = lazy(() => import("pages/ListView"));
const Form = lazy(() => import("pages/Form"));
const DetailsView = lazy(() => import("pages/DetailsView"));
const Icons = lazy(() => import("pages/Icons"));
const NotFound = lazy(() => import("pages/NotFound"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/preview" replace />} />
    <Route path="/components" element={<Components />} />
    <Route
      path="/preview"
      element={<Navigate to="/preview/instructions" replace />}
    />
    <Route path="/preview/instructions" element={<Instructions />} />
    <Route path="/preview/asset-inventory" element={<AssetInventory />} />
    <Route path="/preview/list-view" element={<ListView />} />
    <Route path="/preview/form" element={<Form />} />
    <Route path="/preview/details-view" element={<DetailsView />} />
    <Route path="/icons" element={<Icons />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
