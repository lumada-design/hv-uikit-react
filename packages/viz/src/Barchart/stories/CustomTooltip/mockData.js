const mockData = {
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

export default mockData;
