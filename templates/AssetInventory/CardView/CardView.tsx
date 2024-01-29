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
  HvCardMedia,
} from "@hitachivantara/uikit-react-core";

import { AssetInventoryEntry, getStatusIcon } from "../data";

interface CarViewProps {
  id?: string;
  instance: HvTableInstance<AssetInventoryEntry, string>;
}

export const CardView = ({ id, instance }: CarViewProps) => {
  const selectedCardsIds = instance.selectedFlatRows.map((r) => r.id);
  return (
    <HvSimpleGrid
      id={id}
      breakpoints={
        [
          { minWidth: 1919, cols: 4, spacing: "md" },
          { minWidth: 960, cols: 3, spacing: "md" },
          { minWidth: 600, cols: 2, spacing: "sm" },
          { minWidth: 0, cols: 1, spacing: "sm" },
        ] as Breakpoint[]
      }
    >
      {instance.page.map((row) => {
        return (
          <HvCard
            selectable
            selected={selectedCardsIds.includes(row.id)}
            bgcolor="atmo1"
            key={`${row?.values?.name}-row`}
            style={{ width: "100%" }}
            statusColor={row?.original?.statusColor}
            icon={getStatusIcon(row?.original?.statusColor)}
          >
            <HvCardHeader title={row?.values?.name} />
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
                  <HvTypography noWrap>{row?.values?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Severity</HvTypography>
                  <HvTypography noWrap>{row?.values?.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Status</HvTypography>
                  <HvTypography noWrap>{row?.values?.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Priority</HvTypography>
                  <HvTypography noWrap>{row?.values?.priority}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvCardMedia
              component="img"
              alt={row.original.name}
              height={140}
              image={row.original.image}
            />
            <HvActionBar>
              <HvCheckBox
                onChange={() => instance.toggleRowSelected?.(row.id)}
                checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
                value="value"
                inputProps={{ "aria-label": "Tick to select the card" }}
              />
              <div style={{ flex: 1 }} />
              <HvActionsGeneric actions={[{ id: "view1", label: "View" }]} />
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};
