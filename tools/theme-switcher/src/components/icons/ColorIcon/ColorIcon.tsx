interface ColorIconProps {
  color: string;
}

const ColorIcon: React.FC<ColorIconProps> = ({ color }) => (
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
