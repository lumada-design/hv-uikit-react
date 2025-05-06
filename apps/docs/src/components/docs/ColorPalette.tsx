import { HvTypography, theme } from "@hitachivantara/uikit-react-core";

export const ColorPalette = () => {
  const { palette } = theme;

  return (
    <div className="space-y-10">
      {Object.entries(palette).map(([colorName, shades]) => (
        <section key={colorName}>
          <HvTypography className="font-semibold mb-2">
            {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
          </HvTypography>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-1">
            {Object.entries(shades).map(([shade, value]) => {
              return (
                <div
                  key={`${colorName}-${shade}`}
                  className="flex flex-col items-center"
                >
                  <div
                    className="h-15 w-full rounded-base"
                    style={{ backgroundColor: value }}
                    aria-label={`Color ${colorName} ${shade}`}
                  />

                  <HvTypography className="mt-2 text-sm">{shade}</HvTypography>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
