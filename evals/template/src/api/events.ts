/**
 * AssetEvent API client, in the shape Orval generates for the AssetEvent
 * OpenAPI spec (plain functions plus SWR hooks). Backed by an in-memory mock
 * with fixed seed data and a small delay, so every run sees the same data.
 */
import useSWR from "swr";

import { delay, paginate, type Page, type PageParams } from "./mock";

export type AssetEventStatus = "Open" | "Closed";
export type AssetEventSeverity = "Critical" | "Major" | "Average" | "Minor";
export type AssetEventPriority = "High" | "Medium" | "Low";

export interface AssetEvent {
  id: string;
  name: string;
  description: string;
  /** ISO date, e.g. "2026-03-14" */
  createdDate: string;
  eventType: string;
  status: AssetEventStatus;
  riskScore: number;
  severity: AssetEventSeverity;
  priority: AssetEventPriority;
}

export type AssetEventInput = Omit<AssetEvent, "id">;

const pick = <T>(options: readonly T[], i: number) =>
  options[i % options.length];
const TYPES = [
  "Anomaly detection",
  "Threshold breach",
  "Maintenance",
  "Sensor fault",
];

let events: AssetEvent[] = Array.from({ length: 42 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Event ${String(i + 1).padStart(3, "0")}`,
  description: `Description for event ${i + 1}`,
  createdDate: new Date(Date.UTC(2026, 2, 1 + i)).toISOString().slice(0, 10),
  eventType: pick(TYPES, i),
  status: pick(["Open", "Closed"] as const, i),
  riskScore: ((i * 37) % 100) + 1,
  severity: pick(["Critical", "Major", "Average", "Minor"] as const, i),
  priority: pick(["High", "Medium", "Low"] as const, i),
}));
let nextId = events.length + 1;

export interface GetAssetEventsParams extends PageParams {
  search?: string;
}

/** GET /events */
export async function getAssetEvents(
  params: GetAssetEventsParams = {},
): Promise<Page<AssetEvent>> {
  await delay();
  const q = params.search?.toLowerCase() ?? "";
  return paginate(
    events.filter(
      (e) =>
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q),
    ),
    params,
  );
}

/** GET /events/{id} */
export async function getAssetEvent(id: string): Promise<AssetEvent> {
  await delay();
  const event = events.find((e) => e.id === id);
  if (!event) throw new Error(`AssetEvent ${id} not found`);
  return event;
}

/** POST /events */
export async function createAssetEvent(
  body: AssetEventInput,
): Promise<AssetEvent> {
  await delay();
  const event = { ...body, id: `${nextId++}` };
  events = [event, ...events];
  return event;
}

/** PUT /events/{id} */
export async function updateAssetEvent(
  id: string,
  body: AssetEventInput,
): Promise<AssetEvent> {
  await delay();
  const event = { ...body, id };
  events = events.map((e) => (e.id === id ? event : e));
  return event;
}

/** DELETE /events/{id} */
export async function deleteAssetEvent(id: string): Promise<void> {
  await delay();
  events = events.filter((e) => e.id !== id);
}

export const getAssetEventsKey = (params: GetAssetEventsParams = {}) =>
  ["/events", params] as const;
export const getAssetEventKey = (id: string) => [`/events/${id}`] as const;

export const useGetAssetEvents = (params: GetAssetEventsParams = {}) =>
  useSWR(getAssetEventsKey(params), () => getAssetEvents(params));

export const useGetAssetEvent = (id: string | undefined) =>
  useSWR(id ? getAssetEventKey(id) : null, () => getAssetEvent(id!));
