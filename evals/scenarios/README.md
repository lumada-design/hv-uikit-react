# Scenarios

Each scenario is a ticket (`scenario.json` → `prompt`) given to the agent as is,
optionally with design mocks (PNGs in the scenario folder, copied into the app
root) and extra files (`files/`, copied over the template, e.g. a mock API).
Tickets never name components, so runs test component choice as well as usage.

| Id                 | Source                                | Ticket                                                                        | Mock                  | Rules it exercises                                                                                                                  |
| ------------------ | ------------------------------------- | ----------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `s1-crud`          | HVUIKIT-7482 scenario 1, verbatim     | CRUD page for AssetEvents: paginated table, edit/remove, create, dialog forms | —                     | `layout/page`, `destructive/confirm`, `date/format`, `components/prefer`, `data/states`, `HvTable/section`                          |
| `s2-cardview`      | HVUIKIT-7482 scenario 2, verbatim     | AssetEvents as cards, each with a View link to a detail view                  | —                     | `layout/page`, `components/prefer`, `date/format`, `status/semantic-color`, `tokens/space`                                          |
| `s3-landing`       | HVUIKIT-7482 scenario 3, verbatim     | "Beautiful" landing page with links to the other pages                        | —                     | `layout/page`, `tokens/color`, `tokens/space`, `components/prefer`                                                                  |
| `p1-catalog`       | Pentaho-like: Data Catalog list       | Datasets with search, status filter, pagination, row and bulk delete          | on-system             | `layout/page`, `destructive/confirm`, `date/format`, `status/semantic-color`, `data/states`, `components/prefer`, `HvTable/section` |
| `p2-glossary-term` | Pentaho-like: Business Glossary term  | Term header with status and actions, three tabs, delete term                  | **seeded off-system** | `layout/page`, `destructive/confirm`, `date/format`, `status/semantic-color`, `tokens/color`, `tokens/space`, `components/prefer`   |
| `p3-connections`   | Pentaho-like: data source connections | Connection cards with status, last sync, test and remove                      | on-system             | `layout/page`, `destructive/confirm`, `date/format`, `components/prefer`, `status/semantic-color`, `data/states`                    |

**Seeded off-system values in `p2-glossary-term`** (disclosed here, never to
the agent): the status is a pill in a raw hex green, the page uses off-scale
spacing (30px padding, 13px gaps), and the delete confirmation is a
warning-status dialog with a primary confirm button. They measure whether
context and checks stop an agent from copying off-system details from a design.

Mocks are React pages under `evals/mocks/`, built with this UI Kit and rendered
to PNG by `node evals/run.ts mocks`. Agents only ever see the PNGs.

**Differences from Bruno's setup:** his runs used a live AssetEvent API through
an Orval client; that server is not reachable from the runner, so the template
ships an Orval-style client (`src/api/events.ts`, functions plus SWR hooks)
over fixed in-memory data. His template had the App Shell margin and missing
icon set as noise; this template uses the CLI's plain Vite app with the icon
set installed, and passes every check before a run starts.
