import { HvContainer } from "@hitachivantara/uikit-react-core";

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <HvContainer className="pt-sm">{children}</HvContainer>;
};
