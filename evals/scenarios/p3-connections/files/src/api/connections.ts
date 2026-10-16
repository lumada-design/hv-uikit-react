/** Data source connections API (in-memory mock with fixed seed data). */
import useSWR from "swr";

import { delay } from "./mock";

export type ConnectionType = "PostgreSQL" | "Snowflake" | "Amazon S3" | "Kafka";
export type ConnectionStatus = "Connected" | "Failed" | "Syncing";

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  host: string;
  status: ConnectionStatus;
  /** ISO date-time of the last successful sync; null if it never synced. */
  lastSyncAt: string | null;
}

let connections: Connection[] = [
  {
    id: "c1",
    name: "Sales warehouse",
    type: "Snowflake",
    host: "acme.eu-west-1.snowflakecomputing.com",
    status: "Connected",
    lastSyncAt: "2026-10-16T07:45:00.000Z",
  },
  {
    id: "c2",
    name: "Orders DB",
    type: "PostgreSQL",
    host: "orders-db.internal:5432",
    status: "Failed",
    lastSyncAt: "2026-10-12T22:10:00.000Z",
  },
  {
    id: "c3",
    name: "Clickstream",
    type: "Kafka",
    host: "kafka-1.internal:9092",
    status: "Syncing",
    lastSyncAt: "2026-10-16T09:58:00.000Z",
  },
  {
    id: "c4",
    name: "Raw landing zone",
    type: "Amazon S3",
    host: "s3://acme-landing",
    status: "Connected",
    lastSyncAt: null,
  },
  {
    id: "c5",
    name: "Finance archive",
    type: "PostgreSQL",
    host: "finance-archive.internal:5432",
    status: "Connected",
    lastSyncAt: "2026-09-30T04:00:00.000Z",
  },
];

export async function getConnections(): Promise<Connection[]> {
  await delay();
  return connections;
}

/** Tests a connection; resolves to whether it succeeded. */
export async function testConnection(id: string): Promise<boolean> {
  await delay(600);
  return connections.find((c) => c.id === id)?.status !== "Failed";
}

export async function removeConnection(id: string): Promise<void> {
  await delay();
  connections = connections.filter((c) => c.id !== id);
}

export const useGetConnections = () => useSWR("/connections", getConnections);
