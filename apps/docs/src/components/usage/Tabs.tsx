"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HvContainer, HvTab, HvTabs } from "@hitachivantara/uikit-react-core";

import { ComponentMeta } from "../../utils/component";
import { Playground, PlaygroundProps } from "../code/Playground";
import { Classes } from "./Classes";
import { Props } from "./Props";

type TabId = "usage" | "props" | "classes";

export function Tabs({
  meta,
  playgroundProps,
}: {
  meta: ComponentMeta;
  playgroundProps: PlaygroundProps;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") as TabId) || "usage";

  return (
    <div className="pt-md">
      <HvTabs
        variant="fullWidth"
        value={tab}
        onChange={(_, value) => {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("tab", value);
          router.push(`${pathname}?${newParams}`);
        }}
        className="mt-sm mb-md w-360px"
      >
        <HvTab value="usage" label="Usage" />
        <HvTab value="props" label="Props" />
        <HvTab value="classes" label="Classes" />
      </HvTabs>
      <HvContainer disableGutters className="mb-lg">
        {tab === "usage" && playgroundProps && (
          <Playground {...playgroundProps} />
        )}
        {tab === "props" && <Props meta={meta} />}
        {tab === "classes" && <Classes meta={meta} />}
      </HvContainer>
    </div>
  );
}
