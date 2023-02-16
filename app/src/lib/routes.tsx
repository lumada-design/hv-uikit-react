import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

/* INJECT_IMPORTS */
const Components = lazy(() => import("pages/Components"));
const Templates = lazy(() => import("pages/Templates")); 

const NotFound = lazy(() => import("pages/NotFound"));

const AppRoutes = () => (
  <Routes>
    {/* INJECT_ROUTES */}
    <Route path="/components" element={<Components />} />
    <Route path="/templates" element={<Templates />} />
    
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;