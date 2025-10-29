"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  HvBadge,
  HvTab,
  HvTabs,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { ComponentMeta } from "../../utils/component";
import { Playground, PlaygroundProps } from "../code/Playground";
import { Classes } from "./Classes";
import { Examples } from "./Examples";
import { examplesContexts, examplesMap } from "./examplesContext";
import { Props } from "./Props";

type TabId = "usage" | "examples" | "props" | "classes";

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
  const [examples, setExamples] = useState<Record<string, string>>({});

  const tab = (searchParams.get("tab") as TabId) || "usage";

  useEffect(() => {
    const loadExamples = async () => {
      const context =
        examplesContexts[
          examplesMap[
            meta.component as keyof typeof examplesMap
          ] as keyof typeof examplesContexts
        ];

      if (!context) {
        console.warn(`No examples folder found for ${meta.component}`);
        setExamples({});
        return;
      }

      const loaded: Record<string, string> = {};

      for (const key of context.keys()) {
        const name = key.replace("./", "").replace(".tsx", "");
        const mod = context(key);
        loaded[name] = mod.default;
      }

      setExamples(loaded);
    };

    loadExamples();
  }, [meta.component]);

  return (
    <>
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
        <HvTab
          value="examples"
          label={
            <HvBadge
              label={
                Object.keys(examples).length === 0
                  ? "0"
                  : Object.keys(examples).length.toString()
              }
              color="primary"
              className="m-r-xs"
            >
              <HvTypography>Examples</HvTypography>
            </HvBadge>
          }
        />
      </HvTabs>
      <div className="mb-lg" data-tab={tab}>
        {tab === "usage" && playgroundProps && (
          <Playground {...playgroundProps} />
        )}
        {tab === "props" && <Props meta={meta} />}
        {tab === "classes" && <Classes meta={meta} />}
        {tab === "examples" && (
          <Examples component={meta.component} examples={examples} />
        )}
      </div>
    </>
  );
}
