import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCheckBox,
  HvActionBar,
  HvTypography,
  HvTableInstance,
  HvCardMedia,
  HvButton,
} from "@hitachivantara/uikit-react-core";

import { AssetInventoryEntry, getStatusIcon } from "../data";

interface CardViewProps {
  id?: string;
  instance: HvTableInstance<AssetInventoryEntry, string>;
}

export const CardView = ({ id, instance }: CardViewProps) => {
  const selectedCardsIds = instance.selectedFlatRows.map((r) => r.id);
  return (
    <HvSimpleGrid
      id={id}
      breakpoints={[
        { minWidth: 1919, cols: 4, spacing: "md" },
        { minWidth: 960, cols: 3, spacing: "md" },
        { minWidth: 600, cols: 2, spacing: "sm" },
        { minWidth: 0, cols: 1, spacing: "sm" },
      ]}
    >
      {instance.page.map((row) => {
        const values = row.original;
        return (
          <HvCard
            selectable
            selected={selectedCardsIds.includes(row.id)}
            bgcolor="atmo1"
            key={`${values.name}-row`}
            style={{ width: "100%" }}
            statusColor={values.statusColor}
            icon={getStatusIcon(values.statusColor)}
          >
            <HvCardHeader title={values.name} />
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
                  <HvTypography noWrap>{values.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Severity</HvTypography>
                  <HvTypography noWrap>{values.severity}</HvTypography>
                </HvCardContent>
              </div>
              <div>
                <HvCardContent>
                  <HvTypography variant="label">Status</HvTypography>
                  <HvTypography noWrap>{values.status}</HvTypography>
                </HvCardContent>
                <HvCardContent>
                  <HvTypography variant="label">Priority</HvTypography>
                  <HvTypography noWrap>{values.priority}</HvTypography>
                </HvCardContent>
              </div>
            </div>
            <HvCardMedia
              component="img"
              alt={values.name}
              height={140}
              image={values.image}
            />
            <HvActionBar>
              <HvCheckBox
                onChange={() => instance.toggleRowSelected?.(row.id)}
                checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
                value="value"
                inputProps={{ "aria-label": "Tick to select the card" }}
              />
              <div aria-hidden style={{ flex: 1 }} />
              <HvButton variant="secondaryGhost">View</HvButton>
            </HvActionBar>
          </HvCard>
        );
      })}
    </HvSimpleGrid>
  );
};
