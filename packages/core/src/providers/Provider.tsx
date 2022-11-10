import { HvThemeProvider } from "@hitachivantara/uikit-styles";

interface ProviderProps {
  children?: React.ReactNode;
  enableCssBaseline?: boolean;
}

const Provider = ({ enableCssBaseline = true, children }: ProviderProps) => {
  return (
    <HvThemeProvider enableCssBaseline={enableCssBaseline}>
      {children}
    </HvThemeProvider>
  );
};

export default Provider;

if (process.env.NODE_ENV !== "production") {
  Provider.displayName = "Provider";
}
