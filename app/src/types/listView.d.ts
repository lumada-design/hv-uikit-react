import { HvSemanticColorKeys } from "@hitachivantara/uikit-react-core";

declare global {
  interface ListViewModel extends Record<string, unknown> {
    id?: string;
    name?: string;
    eventType?: string;
    status?: number;
    severity?: string;
    priority?: string;
    time?: string;
    temperature?: string;
    statusColor?: HvSemanticColorKeys | "sema0";
  }
}
