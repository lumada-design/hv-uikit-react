import { SvgBase } from "../icons";

export const EyeIcon = ({ selected }: { selected: boolean }) => (
  <SvgBase viewBox="0 0 16 16" style={{ margin: 8 }}>
    <path d="M11 8a3 3 0 1 1-3-3 3 3 0 0 1 3 3m5 0s-3.58 6-8 6-8-6-8-6 4-6 8-6 8 6 8 6m-1.2.03a22 22 0 0 0-2-2.32C11.01 3.94 9.35 3 8 3s-3 .93-4.77 2.68a22 22 0 0 0-2.02 2.35 18 18 0 0 0 1.85 2.28C4.25 11.53 6.08 13 8 13s3.73-1.45 4.91-2.67a18 18 0 0 0 1.88-2.3z" />
    <rect
      style={{ transition: "width 0.2s ease" }}
      width={selected ? 20 : 0}
      height={1}
      x={-2}
      y={8}
      transform="translate(-4 8) rotate(-45)"
    />
  </SvgBase>
);
