import AppShellRoutes from "../AppShellRoutes";
import withGlobalProvider from "../hoc/withGlobalProvider";

const AppShell = () => {
  return <AppShellRoutes />;
};

export default withGlobalProvider(AppShell);
