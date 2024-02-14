import { Navigate, useSearchParams } from "react-router-dom";

export const Component = () => {
  const [searchParams] = useSearchParams();

  if (searchParams.get("dashboard") != null) {
    return (
      <Navigate
        to={`/dashboard-preview?id=${searchParams.get("dashboard")}`}
        replace
      />
    );
  }

  return <Navigate to="/home" replace />;
};
