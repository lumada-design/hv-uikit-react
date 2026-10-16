/** Data Catalog datasets API (in-memory mock with fixed seed data). */
import useSWR from "swr";

import { delay, paginate, type Page, type PageParams } from "./mock";

export type CertificationStatus = "Certified" | "Draft" | "Deprecated";
export type QualityLevel = "High" | "Medium" | "Low";

export interface Dataset {
  id: string;
  name: string;
  owner: string;
  domain: string;
  status: CertificationStatus;
  quality: QualityLevel;
  /** ISO date-time of the last update, e.g. "2026-10-02T14:05:00.000Z" */
  updatedAt: string;
  rowCount: number;
}

const pick = <T>(options: readonly T[], i: number) =>
  options[i % options.length];
const NAMES = [
  "customer_orders",
  "web_sessions",
  "churn_features",
  "inventory_daily",
  "support_tickets",
  "supplier_master",
  "finance_ledger",
];

let datasets: Dataset[] = Array.from({ length: 37 }, (_, i) => ({
  id: `ds-${i + 1}`,
  name: `${pick(NAMES, i)}${i >= NAMES.length ? `_${Math.floor(i / NAMES.length) + 1}` : ""}`,
  owner: pick(["Ana Costa", "Rui Matos", "Marta Silva", "João Reis"], i),
  domain: pick(["Sales", "Marketing", "Operations", "Finance"], i),
  status: pick(["Certified", "Draft", "Deprecated", "Certified"] as const, i),
  quality: pick(["High", "Medium", "Low", "High", "Medium"] as const, i),
  updatedAt: new Date(
    Date.UTC(2026, 9, 14 - (i % 20), 8 + (i % 9), (i * 7) % 60),
  ).toISOString(),
  rowCount: 1000 + ((i * 7919) % 900000),
}));

export interface GetDatasetsParams extends PageParams {
  search?: string;
  status?: CertificationStatus;
}

export async function getDatasets(
  params: GetDatasetsParams = {},
): Promise<Page<Dataset>> {
  await delay();
  const q = params.search?.toLowerCase() ?? "";
  return paginate(
    datasets.filter(
      (d) =>
        (!q || d.name.includes(q)) &&
        (!params.status || d.status === params.status),
    ),
    params,
  );
}

export async function deleteDataset(id: string): Promise<void> {
  await delay();
  datasets = datasets.filter((d) => d.id !== id);
}

export async function deleteDatasets(ids: string[]): Promise<void> {
  await delay();
  datasets = datasets.filter((d) => !ids.includes(d.id));
}

export const useGetDatasets = (params: GetDatasetsParams = {}) =>
  useSWR(["/datasets", params] as const, () => getDatasets(params));
