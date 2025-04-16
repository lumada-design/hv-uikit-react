import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  breakpoints,
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  sizes,
  space,
  zIndices,
} from "@hitachivantara/uikit-styles";

import { descriptions } from "./descriptions/tokenDescriptions";

const allTokens = {
  fontSizes,
  fontWeights,
  lineHeights,
  fontFamily,
  space,
  radii,
  zIndices,
  breakpoints: breakpoints.values,
  sizes,
};

const getPreview = (key: string, value: string | number) => {
  switch (key) {
    case "fontSizes":
      return (
        <span
          style={{ fontSize: value }}
          className="text-slate-800 font-medium"
        >
          Aa
        </span>
      );
    case "fontWeights":
      return (
        <span
          style={{ fontWeight: value }}
          className="text-base text-slate-800"
        >
          Aa
        </span>
      );
    case "lineHeights":
      return (
        <p
          style={{ lineHeight: value, maxWidth: 200 }}
          className="text-slate-700 text-sm"
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      );
    case "fontFamily":
      return (
        <p style={{ fontFamily: value as string }} className="text-base">
          Open Sans
        </p>
      );
    case "space":
      return (
        <div className="flex items-center h-2">
          <div
            className="bg-emerald-500 rounded"
            style={{
              width: typeof value === "string" ? value : `${value}px`,
              height: "6px",
            }}
          />
        </div>
      );
    case "radii":
      return (
        <div
          className="w-10 h-10 bg-slate-400"
          style={{ borderRadius: value as string }}
        />
      );
    case "breakpoints":
      return (
        <div className="text-xs text-slate-500">
          ≥ {value}
          {breakpoints.unit}
        </div>
      );
    case "sizes":
      return (
        <div
          className="rounded bg-slate-200"
          style={{ width: value as string, height: "14px" }}
        />
      );
    case "zIndices":
      return <div className="text-xs text-slate-500">Stack: {value}</div>;
    default:
      return undefined;
  }
};

export const DesignTokens = () => {
  return (
    <div className="space-y-10">
      {descriptions.map(({ label, key, description }) => {
        const tokens = allTokens[key as keyof typeof allTokens];
        if (!tokens) return null;

        const isVisualBlock = [
          "fontSizes",
          "fontWeights",
          "lineHeights",
          "fontFamily",
        ].includes(key);

        const isNumericVisual = ["space", "radii", "sizes"].includes(key);

        return (
          <section key={key}>
            <HvTypography
              variant="title4"
              className="text-slate-700 font-semibold"
            >
              {label}
            </HvTypography>
            {description && (
              <HvTypography variant="body" className="mb-4 text-slate-500">
                {description}
              </HvTypography>
            )}

            <div
              className={
                isVisualBlock
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  : isNumericVisual
                    ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
                    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              }
            >
              {Object.entries(tokens).map(([tokenKey, value]) => {
                const preview = getPreview(key, value);
                return (
                  <div key={tokenKey} className="border border-slate-200 p-4">
                    <div className="text-sm font-semibold text-slate-500 mb-2">
                      {tokenKey}
                    </div>
                    <div className="text-sm font-mono text-slate-700 mb-2">
                      {value}
                    </div>
                    {preview && <div className="pt-1">{preview}</div>}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
