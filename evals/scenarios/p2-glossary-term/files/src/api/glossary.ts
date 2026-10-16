/** Business Glossary API (in-memory mock with fixed seed data). */
import useSWR from "swr";

import { delay } from "./mock";

export type TermStatus = "Approved" | "Draft" | "Deprecated";

export interface RelatedAsset {
  id: string;
  name: string;
  type: "Table" | "Dashboard" | "Report" | "Column";
}

export interface TermChange {
  id: string;
  change: string;
  author: string;
  /** ISO date-time */
  at: string;
}

export interface GlossaryTerm {
  id: string;
  name: string;
  definition: string;
  status: TermStatus;
  steward: string;
  domain: string;
  synonyms: string[];
  /** ISO date-time */
  createdAt: string;
  /** ISO date-time */
  updatedAt: string;
  relatedAssets: RelatedAsset[];
  history: TermChange[];
}

let terms: GlossaryTerm[] = [
  {
    id: "gt-1",
    name: "Customer Lifetime Value",
    definition:
      "The total net revenue a customer is expected to generate over the whole relationship, discounted to today.",
    status: "Approved",
    steward: "Marta Silva",
    domain: "Sales",
    synonyms: ["CLV", "LTV", "Customer value"],
    createdAt: "2025-11-03T09:30:00.000Z",
    updatedAt: "2026-10-09T16:12:00.000Z",
    relatedAssets: [
      { id: "a1", name: "customer_orders", type: "Table" },
      { id: "a2", name: "Revenue overview", type: "Dashboard" },
      { id: "a3", name: "clv_monthly", type: "Report" },
      { id: "a4", name: "customer_orders.net_amount", type: "Column" },
    ],
    history: [
      {
        id: "h3",
        change: "Definition updated",
        author: "Marta Silva",
        at: "2026-10-09T16:12:00.000Z",
      },
      {
        id: "h2",
        change: "Status changed from Draft to Approved",
        author: "Rui Matos",
        at: "2026-02-17T11:00:00.000Z",
      },
      {
        id: "h1",
        change: "Term created",
        author: "Marta Silva",
        at: "2025-11-03T09:30:00.000Z",
      },
    ],
  },
];

export async function getTerm(id: string): Promise<GlossaryTerm> {
  await delay();
  const term = terms.find((t) => t.id === id);
  if (!term) throw new Error(`Glossary term ${id} not found`);
  return term;
}

export async function deleteTerm(id: string): Promise<void> {
  await delay();
  terms = terms.filter((t) => t.id !== id);
}

export const useGetTerm = (id: string | undefined) =>
  useSWR(id ? ([`/glossary/${id}`] as const) : null, () => getTerm(id!));
