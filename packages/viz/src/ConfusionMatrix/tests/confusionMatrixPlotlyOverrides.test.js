import { applyDataDefaults, applyLayoutDefaults } from "../confusionMatrixPlotlyOverrides";

describe("applyDataDefaults", () => {
  it("should work with empty data", () => {
    const [result] = applyDataDefaults();
    expect(result).toHaveProperty("type", "heatmap");
  });

  it("should work with only data", () => {
    const [result] = applyDataDefaults([
      {
        x: ["Beaver", "Lion"],
        y: ["Beaver", "Lion"],
        z: [
          [95, 10],
          [15, 97],
        ],
      },
    ]);
    expect(result).toHaveProperty("type", "heatmap");
    expect(result).not.toHaveProperty("zmid", 0);
  });

  it("should work with data and deltaMatrix", () => {
    const [result] = applyDataDefaults(
      [
        {
          x: ["Beaver", "Lion"],
          y: ["Beaver", "Lion"],
          z: [
            [95, 10],
            [15, 97],
          ],
        },
      ],
      {},
      [
        [80, 20],
        [8, 91],
      ]
    );
    expect(result).toHaveProperty("type", "heatmap");
    expect(result).toHaveProperty("zmin", -10);
    expect(result).toHaveProperty("zmid", 0);
    expect(result).toHaveProperty("zmax", 15);
    expect(result.z).toEqual([
      [15, 10],
      [-7, 6],
    ]);
    expect(result.colorscale.length).toEqual(3);
  });
});

describe("applyLayoutDefaults", () => {
  it("should work with empty layout", () => {
    const result = applyLayoutDefaults();
    expect(result).toHaveProperty("height", 550);
    expect(result).toHaveProperty("width", 550);
    expect(result.yaxis).toHaveProperty("showgrid", false);
    expect(result).toHaveProperty("plot_bgcolor", "white");
    expect(result).toHaveProperty("annotations", []);
  });

  it("should work with layout overrides", () => {
    const expHeight = 1000;
    const expWidth = 1500;
    const expPlotBgColor = "pink";
    const result = applyLayoutDefaults({
      height: expHeight,
      width: expWidth,
      plot_bgcolor: expPlotBgColor,
    });
    expect(result).toHaveProperty("height", expHeight);
    expect(result).toHaveProperty("width", expWidth);
    expect(result.yaxis).toHaveProperty("showgrid", false);
    expect(result).toHaveProperty("plot_bgcolor", expPlotBgColor);
    expect(result).toHaveProperty("annotations", []);
  });

  it("should work with layout and data", () => {
    const expHeight = 1000;
    const result = applyLayoutDefaults(
      {
        height: expHeight,
      },
      {},
      [
        {
          x: ["Beaver", "Lion"],
          y: ["Beaver", "Lion"],
          z: [
            [95, 10],
            [15, 97],
          ],
        },
      ]
    );
    expect(result).toHaveProperty("height", expHeight);
    expect(result).toHaveProperty("width", 550);
    expect(result.annotations[0]).toHaveProperty("x", "Beaver");
    expect(result.annotations[0]).toHaveProperty("y", "Beaver");
    expect(result.annotations[0]).toHaveProperty("text", 95);
    expect(result.annotations[0].font).toHaveProperty("size", 12);

    expect(result.annotations[1]).toHaveProperty("x", "Lion");
    expect(result.annotations[1]).toHaveProperty("y", "Beaver");
    expect(result.annotations[1]).toHaveProperty("text", 10);
  });

  it("should work with layout, data and deltaMatrix", () => {
    const result = applyLayoutDefaults(
      {},
      {},
      [
        {
          x: ["Beaver", "Lion"],
          y: ["Beaver", "Lion"],
          z: [
            [15, 10], // Calculated deltaMatrix
            [-7, 6],
          ],
        },
      ],
      [
        [80, 20],
        [8, 91],
      ]
    );
    expect(result).toHaveProperty("height", 550);
    expect(result.annotations[0]).toHaveProperty("x", "Beaver");
    expect(result.annotations[0]).toHaveProperty("y", "Beaver");
    expect(result.annotations[0].font).toHaveProperty("size", 14);
    expect(result.annotations[0]).toHaveProperty(
      "text",
      '<span style="font-weight: 600;">15</span>'
    );

    expect(result.annotations[1]).toHaveProperty("x", "Lion");
    expect(result.annotations[1]).toHaveProperty("y", "Beaver");
    expect(result.annotations[1]).toHaveProperty("text", -10);
    expect(result.annotations[1].font).toHaveProperty("size", 12);
  });
});
