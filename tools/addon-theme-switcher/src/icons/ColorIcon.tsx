interface ColorIconProps {
  color: string;
}

const ColorIcon = ({ color }: ColorIconProps) => (
  <span
    style={{
      borderRadius: "1rem",
      display: "block",
      height: "1rem",
      width: "1rem",
      background: color,
    }}
  />
);

export default ColorIcon;
