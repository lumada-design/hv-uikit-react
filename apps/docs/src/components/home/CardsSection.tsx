import { ActiveUsers } from "./cards/ActiveUsers";
import { ApiUsage } from "./cards/ApiUsage";
import { DataConfig } from "./cards/DataConfig";
import { DataInsights } from "./cards/DataInsights";
import { DataProcessing } from "./cards/DataProcessing";
import { DataSecurity } from "./cards/DataSecurity";
import { FinancialPerformance } from "./cards/FinancialPerformance";
import { StorageOverview } from "./cards/StorageOverview";
import { TeamOverview } from "./cards/TeamOverview";

export const CardsSection = () => {
  return (
    <div className="grid grid-cols-[320px_320px_320px] gap-md p-md mx-auto">
      <div className="space-y-4">
        <DataInsights />
        <DataConfig />
      </div>
      <div className="space-y-4">
        <FinancialPerformance />
        <StorageOverview />
        <ActiveUsers />
        <DataProcessing />
      </div>
      <div className="space-y-4">
        <ApiUsage />
        <DataSecurity />
        <TeamOverview />
      </div>
    </div>
  );
};
