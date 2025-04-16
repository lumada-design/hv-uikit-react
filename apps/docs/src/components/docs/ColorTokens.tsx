import { HvTypography, useTheme } from "@hitachivantara/uikit-react-core";
import { colorTokensSpec } from "@hitachivantara/uikit-styles";

import { descriptions } from "./descriptions/colorDescriptions";
import { groupColorTokensByCategory } from "./utils/color";

export const ColorTokens = () => {
  const { selectedMode, activeTheme } = useTheme();
  const activeColors = activeTheme?.colors.modes[selectedMode];

  const colorTokens = Object.fromEntries(
    Object.entries(activeColors ?? {}).filter(
      ([key]) => key in colorTokensSpec,
    ),
  );

  const groupedTokens = groupColorTokensByCategory(colorTokens);

  return (
    <div className="space-y-10">
      {descriptions.map(({ key: categoryKey, label, description }) => {
        const tokens = groupedTokens[categoryKey];

        if (!tokens || tokens.length === 0) return null;

        return (
          <section key={categoryKey}>
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

            <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {tokens.map(({ token, value }) => {
                return (
                  <div
                    key={token}
                    className="flex flex-col items-center"
                    aria-label={`Color Token ${label} ${token}`}
                  >
                    {/* Swatch */}
                    <div
                      className="w-full h-20 rounded-base"
                      style={{ backgroundColor: value }}
                    ></div>

                    {/* Token name */}
                    <HvTypography className="mt-2 text-sm text-center">
                      {token}
                    </HvTypography>

                    {/* Color value */}
                    <HvTypography className="text-xs text-slate-500 text-center mt-1">
                      {value}
                    </HvTypography>
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
