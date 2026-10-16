/* Static design mock for p3-connections, rendered to evals/scenarios/p3-connections/mock.png. Never shown to agents as code. */
import {
  HvActionBar,
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvGlobalActions,
  HvTag,
  HvTypography,
} from "@pentaho/uikit-react-core";
import { Add, Connect, Delete } from "@pentaho/uikit-react-icons";

const connections = [
  [
    "Sales warehouse",
    "Snowflake",
    "acme.eu-west-1.snowflakecomputing.com",
    "Connected",
    "16 Oct 2026, 08:45",
  ],
  [
    "Orders DB",
    "PostgreSQL",
    "orders-db.internal:5432",
    "Failed",
    "12 Oct 2026, 23:10",
  ],
  [
    "Clickstream",
    "Kafka",
    "kafka-1.internal:9092",
    "Syncing",
    "16 Oct 2026, 10:58",
  ],
  ["Raw landing zone", "Amazon S3", "s3://acme-landing", "Connected", "Never"],
] as const;

const statusColor = {
  Connected: "positive",
  Failed: "negative",
  Syncing: "warning",
} as const;

export function Component() {
  return (
    <div className="flex flex-col gap-md p-md">
      <HvGlobalActions title="Connections" backButton={false}>
        <HvButton variant="primary" startIcon={<Add />}>
          Add connection
        </HvButton>
      </HvGlobalActions>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
        {connections.map(([name, type, host, status, synced]) => (
          <HvCard key={name} bgcolor="bgContainer">
            <HvCardHeader title={name} subheader={type} />
            <HvCardContent>
              <div className="flex flex-col gap-xs">
                <HvTypography>{host}</HvTypography>
                <HvTag
                  type="semantic"
                  color={statusColor[status]}
                  label={status}
                />
                <HvTypography variant="caption1">
                  Last successful sync: {synced}
                </HvTypography>
              </div>
            </HvCardContent>
            <HvActionBar>
              <HvButton variant="secondaryGhost" startIcon={<Connect />}>
                Test connection
              </HvButton>
              <HvButton variant="negativeGhost" startIcon={<Delete />}>
                Remove
              </HvButton>
            </HvActionBar>
          </HvCard>
        ))}
      </div>
    </div>
  );
}
