export type Point = {
  x: number;
  y: number;
};

export type Status = "approved" | "rejected" | "pending" | "undefined";

export type Style = "solid" | "dashed";

export type Image = {
  name: string;
  url: string;
  assets?: Asset[];
  size: {
    width: number;
    height: number;
  };
};

export type Asset = {
  status?: Status;
  location: {
    top: Point;
    bottom: Point;
  };
  style?: Style;
  anomalies?: Anomaly[];
};

export type Anomaly = {
  name: string;
  value: string;
};
