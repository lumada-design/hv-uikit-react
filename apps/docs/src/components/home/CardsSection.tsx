import clsx from "clsx";

import {
  ApiUsage,
  DataConfig,
  DataInsights,
  DataProcessing,
  DataSecurity,
  FinancialPerformance,
  StorageOverview,
  TeamOverview,
} from "../cards";

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
