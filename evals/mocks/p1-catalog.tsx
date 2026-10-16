/* Static design mock for p1-catalog, rendered to evals/scenarios/p1-catalog/mock.png. Never shown to agents as code. */
import {
  HvBulkActions,
  HvButton,
  HvCheckBox,
  HvGlobalActions,
  HvInput,
  HvOption,
  HvPagination,
  HvSelect,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableSection,
  HvTag,
} from "@pentaho/uikit-react-core";
import { Add, Delete, Preview } from "@pentaho/uikit-react-icons";

const rows = [
  [
    "customer_orders",
    "Ana Costa",
    "Sales",
    "Certified",
    "High",
    "14 Oct 2026, 08:00",
  ],
  [
    "web_sessions",
    "Rui Matos",
    "Marketing",
    "Draft",
    "Medium",
    "13 Oct 2026, 09:07",
  ],
  [
    "churn_features",
    "Marta Silva",
    "Operations",
    "Deprecated",
    "Low",
    "12 Oct 2026, 10:14",
  ],
  [
    "inventory_daily",
    "João Reis",
    "Finance",
    "Certified",
    "High",
    "11 Oct 2026, 11:21",
  ],
  [
    "support_tickets",
    "Ana Costa",
    "Sales",
    "Certified",
    "Medium",
    "10 Oct 2026, 12:28",
  ],
] as const;

const statusColor = {
  Certified: "positive",
  Draft: "warning",
  Deprecated: "negative",
} as const;
const qualityColor = {
  High: "positive",
  Medium: "warning",
  Low: "negative",
} as const;

export function Component() {
  return (
    <div className="flex flex-col gap-md p-md">
      <HvGlobalActions title="Datasets" backButton={false}>
        <HvButton variant="primary" startIcon={<Add />}>
          Register dataset
        </HvButton>
      </HvGlobalActions>
      <div className="flex gap-sm items-end">
        <HvInput
          type="search"
          placeholder="Search by name"
          aria-label="Search datasets"
          className="w-280px"
        />
        <HvSelect label="Status" placeholder="All statuses" className="w-200px">
          <HvOption value="Certified">Certified</HvOption>
          <HvOption value="Draft">Draft</HvOption>
          <HvOption value="Deprecated">Deprecated</HvOption>
        </HvSelect>
      </div>
      <HvTableSection>
        <HvBulkActions
          numTotal={37}
          numSelected={2}
          maxVisibleActions={1}
          actions={[{ id: "delete", label: "Delete", icon: <Delete /> }]}
        />
        <HvTable aria-label="Datasets">
          <HvTableHead>
            <HvTableRow>
              <HvTableHeader variant="checkbox" />
              <HvTableHeader>Name</HvTableHeader>
              <HvTableHeader>Owner</HvTableHeader>
              <HvTableHeader>Domain</HvTableHeader>
              <HvTableHeader>Status</HvTableHeader>
              <HvTableHeader>Quality</HvTableHeader>
              <HvTableHeader>Last updated</HvTableHeader>
              <HvTableHeader variant="actions">Actions</HvTableHeader>
            </HvTableRow>
          </HvTableHead>
          <HvTableBody>
            {rows.map(([name, owner, domain, status, quality, updated], i) => (
              <HvTableRow key={name}>
                <HvTableCell variant="checkbox">
                  <HvCheckBox checked={i < 2} aria-label={`Select ${name}`} />
                </HvTableCell>
                <HvTableCell>{name}</HvTableCell>
                <HvTableCell>{owner}</HvTableCell>
                <HvTableCell>{domain}</HvTableCell>
                <HvTableCell>
                  <HvTag
                    type="semantic"
                    color={statusColor[status]}
                    label={status}
                  />
                </HvTableCell>
                <HvTableCell>
                  <HvTag
                    type="semantic"
                    color={qualityColor[quality]}
                    label={quality}
                  />
                </HvTableCell>
                <HvTableCell>{updated}</HvTableCell>
                <HvTableCell variant="actions">
                  <HvButton
                    icon
                    variant="secondaryGhost"
                    aria-label={`Open ${name}`}
                  >
                    <Preview />
                  </HvButton>
                  <HvButton
                    icon
                    variant="negativeGhost"
                    aria-label={`Delete ${name}`}
                  >
                    <Delete />
                  </HvButton>
                </HvTableCell>
              </HvTableRow>
            ))}
          </HvTableBody>
        </HvTable>
        <HvPagination
          pages={4}
          page={0}
          pageSize={10}
          pageSizeOptions={[10]}
          canPrevious={false}
          canNext
        />
      </HvTableSection>
    </div>
  );
}
