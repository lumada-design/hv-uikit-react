import { Navigate, Outlet, useLocation } from "react-router";

import { useIsMounted } from "~/hooks/isMounted";

export default function Component() {
  const isMounted = useIsMounted();
  const { pathname } = useLocation();

  // run templates only on client side
  if (!isMounted) return null;

  if (pathname === "/templates") {
    return <Navigate to="welcome" />;
  }

  return <Outlet />;
}
