import clsx from "clsx";

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
    <div
      className={clsx(["grid grid-cols-[10rem_10rem_10rem] gap-4 p-3 mx-auto"])}
    >
      <div className="space-y-4">
        <DataInsights />
        <DataConfig />
      </div>
      <div className="space-y-4">
        <FinancialPerformance />
        <StorageOverview />
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
