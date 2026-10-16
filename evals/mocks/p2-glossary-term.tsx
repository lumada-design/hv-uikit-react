/*
 * Static design mock for p2-glossary-term, rendered to mock.png and, with
 * ?dialog=1, mock-delete.png. SEEDED OFF-SYSTEM VALUES, on purpose:
 *  - the status is a pill in a raw hex green (#2E7D32) instead of a semantic tag;
 *  - the page uses off-scale spacing (30px padding, 13px gaps);
 *  - the delete confirmation is a warning-status dialog.
 * Never shown to agents as code; the seeding is disclosed in the report.
 */
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvGlobalActions,
  HvTab,
  HvTabs,
  HvTypography,
} from "@pentaho/uikit-react-core";
import { Delete, Edit } from "@pentaho/uikit-react-icons";

const dialogOpen = new URLSearchParams(window.location.search).has("dialog");

export function Component() {
  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "13px",
      }}
    >
      <HvGlobalActions
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
            <HvTypography variant="title3">
              Customer Lifetime Value
            </HvTypography>
            <span
              style={{
                background: "#2E7D32",
                color: "#fff",
                borderRadius: 12,
                padding: "2px 10px",
                fontSize: 12,
              }}
            >
              Approved
            </span>
          </div>
        }
        backButton={false}
      >
        <HvButton variant="secondaryGhost" startIcon={<Edit />}>
          Edit
        </HvButton>
        <HvButton variant="negativeGhost" startIcon={<Delete />}>
          Delete term
        </HvButton>
      </HvGlobalActions>
      <HvTabs value={0}>
        <HvTab label="Overview" />
        <HvTab label="Related assets" />
        <HvTab label="History" />
      </HvTabs>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px 1fr",
          gap: "13px",
        }}
      >
        <HvTypography variant="label">Definition</HvTypography>
        <HvTypography>
          The total net revenue a customer is expected to generate over the
          whole relationship, discounted to today.
        </HvTypography>
        <HvTypography variant="label">Steward</HvTypography>
        <HvTypography>Marta Silva</HvTypography>
        <HvTypography variant="label">Domain</HvTypography>
        <HvTypography>Sales</HvTypography>
        <HvTypography variant="label">Synonyms</HvTypography>
        <HvTypography>CLV, LTV, Customer value</HvTypography>
        <HvTypography variant="label">Created</HvTypography>
        <HvTypography>3 Nov 2025</HvTypography>
        <HvTypography variant="label">Last updated</HvTypography>
        <HvTypography>9 Oct 2026, 17:12</HvTypography>
      </div>
      <HvDialog open={dialogOpen} variant="warning" onClose={() => {}}>
        <HvDialogTitle variant="warning">
          Delete "Customer Lifetime Value"?
        </HvDialogTitle>
        <HvDialogContent>
          The term and its links to 4 assets will be removed. This cannot be
          undone.
        </HvDialogContent>
        <HvDialogActions>
          <HvButton variant="primary">Delete</HvButton>
          <HvButton variant="secondaryGhost">Cancel</HvButton>
        </HvDialogActions>
      </HvDialog>
    </div>
  );
}
