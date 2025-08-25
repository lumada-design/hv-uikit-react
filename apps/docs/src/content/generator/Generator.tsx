"use client";

import { HvProvider } from "@hitachivantara/uikit-react-core";

import { ActiveUsers } from "../../components/home/cards/ActiveUsers";
import { ApiUsage } from "../../components/home/cards/ApiUsage";
import { DataConfig } from "../../components/home/cards/DataConfig";
import { DataInsights } from "../../components/home/cards/DataInsights";
import { DataProcessing } from "../../components/home/cards/DataProcessing";
import { DataSecurity } from "../../components/home/cards/DataSecurity";
import { FinancialPerformance } from "../../components/home/cards/FinancialPerformance";
import { Orders } from "../../components/home/cards/Orders";
import { StorageOverview } from "../../components/home/cards/StorageOverview";
import { TeamOverview } from "../../components/home/cards/TeamOverview";
import { GeneratorProvider, useGeneratorContext } from "./GeneratorContext";
import { Menu } from "./Menu";

const GeneratorInternal = () => {
  const { customTheme, colorMode } = useGeneratorContext();

  return (
    <div className="flex gap-sm w-full">
      <div className="w-25% p-sm h-full">
        <Menu />
      </div>
      <div
        id="generator-root"
        className="bg-transparent border-rounded-round overflow-hidden"
      >
        <HvProvider
          themes={[customTheme]}
          theme="customTheme"
          colorMode={colorMode}
          rootElementId="generator-root"
          cssTheme="scoped"
        >
          <div className="flex-1 bg-bgPage border-border border-rounded-round">
            <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[var(--uikit-space-md)] p-md mx-auto">
              <div className="flex flex-col gap-[var(--uikit-space-md)]">
                <DataInsights />
                <Orders />
                <DataProcessing />
              </div>
              <div className="flex flex-col gap-[var(--uikit-space-md)]">
                <FinancialPerformance />
                <StorageOverview />
                <DataConfig />
              </div>
              <div className="flex flex-col gap-[var(--uikit-space-md)]">
                <ApiUsage />
                <DataSecurity />
                <TeamOverview />
                <ActiveUsers />
              </div>
            </div>
          </div>
        </HvProvider>
      </div>
    </div>
  );
};

export const Generator = () => {
  return (
    <GeneratorProvider>
      <GeneratorInternal />
    </GeneratorProvider>
  );
};
