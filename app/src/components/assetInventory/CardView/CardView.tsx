import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCheckBox,
  HvActionBar,
  HvActionsGeneric,
  HvTypography,
  Breakpoint,
  HvTableInstance,
} from "@hitachivantara/uikit-react-core";

import { getStatusIcon } from "lib/utils/assetInventory";

interface CarViewProps {
  instance: HvTableInstance<AssetInventoryModel, string>;
}

/**
 * The card view of the Asset Inventory.
 *
 * @param {Object} instance - the instance returned by the `useHvData` data.
 */
export const CardView = ({ instance }: CarViewProps) => {
  return (
    <HvSimpleGrid
      breakpoints={
        [
          { minWidth: 1270, cols: 4, spacing: "md" },
          { minWidth: 960, cols: 3, spacing: "md" },
          { minWidth: 600, cols: 2, spacing: "sm" },
          { minWidth: 0, cols: 1, spacing: "sm" },
        ] as Breakpoint[]
      }
    >
      {instance.page.map((row) => {
        return (
          <HvCard
            bgcolor="atmo1"
            key={`${row?.original?.name}-row`}
            style={{ width: "100%" }}
            statusColor={row?.original?.statusColor}
            icon={getStatusIcon(row?.original?.statusColor || "")}
            selected={instance.selectedFlatRows.some((r) => r.id === row.id)}
            selectable
          >
            <HvCardHeader
              title={
                <HvTypography variant="label">
                  {row?.original?.name}
                </HvTypography>
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Event</HvTypography>
                  <HvTypography noWrap>{row?.original?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Severity</HvTypography>
                  <HvTypography noWrap>{row?.original?.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Status</HvTypography>
                  <HvTypography noWrap>{row?.original?.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Priority</HvTypography>
                  <HvTypography noWrap>{row?.original?.priority}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvActionBar>
              <HvCheckBox
                onChange={() => instance.toggleRowSelected?.(row.id)}
                checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
                value="value"
                inputProps={{ "aria-label": "leaf input" }}
              />
              <div style={{ flex: 1 }} />
              <HvActionsGeneric
                actions={[{ id: "view1", label: "View" }]}
                category="secondarySubtle"
              />
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};
