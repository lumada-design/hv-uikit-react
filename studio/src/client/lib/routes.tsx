import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Editor = lazy(() => import("pages/Editor"));
const NotFound = lazy(() => import("pages/NotFound"));

const routes = () => (
  <Routes>
    <Route path="/" element={<Editor />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default routes;
