import { HvSemanticColorKeys } from "@hitachivantara/uikit-react-core";

declare global {
  interface AssetInventoryModel extends Record<string, unknown> {
    id?: string;
    name?: string;
    eventType?: string;
    status?: string;
    severity?: string;
    priority?: string;
    time?: string;
    temperature?: string;
    statusColor?: HvSemanticColorKeys | "sema0";
  }
}
