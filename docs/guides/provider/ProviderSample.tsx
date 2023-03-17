import { HvContainer, HvInput, theme } from "@hitachivantara/uikit-react-core";

export const ProviderSample = ({ label }: { label: string }) => (
  <HvContainer
    style={{
      padding: theme.space.sm,
    }}
  >
    <HvInput style={{ maxWidth: "120px" }} label={label} />
  </HvContainer>
);
