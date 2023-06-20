export const customChartData = [
  {
    Category: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
    Uploads: [50, 350, 420, 310, 390, 420, 200, 430],
    Downloads: [370, 80, 60, 280, 310, 320, 110, 190],
  },
  {
    Category: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
    Uploads: [520, 50, 220, 110, 390, 320, 100, 420],
    Downloads: [300, 180, 160, 380, 350, 300, 140, 390],
  },
  {
    Category: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
    Uploads: [90, 350, 430, 320, 390, 420, 300, 430],
    Downloads: [370, 280, 460, 290, 240, 320, 110, 490],
  },
  {
    Category: ["ASR3", "HAL9", "DR21", "HY54", "KW65", "RE98", "ZX52", "UI56"],
    Uploads: [180, 150, 230, 310, 190, 340, 220, 430],
    Downloads: [370, 480, 360, 280, 310, 120, 210, 190],
  },
];

export const customTooltipData = {
  totalTimes: 852,
  metrics: [
    {
      metric: "precision",
      value: 0.48076922,
      threshold: [
        {
          name: "Good",
          value: 0.95,
        },
        {
          name: "Average",
          value: 0.9,
        },
        {
          name: "Poor",
          value: 0.85,
        },
        {
          name: "Bad",
          value: 0.75,
        },
      ],
    },
    {
      metric: "recall",
      value: 0.95076925,
      threshold: [
        {
          name: "Good",
          value: 0.9,
        },
        {
          name: "Average",
          value: 0.85,
        },
        {
          name: "Poor",
          value: 0.72,
        },
        {
          name: "Bad",
          value: 0.6,
        },
      ],
    },
    {
      metric: "f1-score",
      value: 0.6386145,
      threshold: [
        {
          name: "Good",
          value: 0.78,
        },
        {
          name: "Average",
          value: 0.6,
        },
        {
          name: "Poor",
          value: 0.45,
        },
        {
          name: "Bad",
          value: 0.25,
        },
      ],
    },
  ],
  confusionMatrix: {
    categories: ["defect", "nodefect"],
    cf_matrix: [
      [190, 3],
      [12, 195],
    ],
  },
};
