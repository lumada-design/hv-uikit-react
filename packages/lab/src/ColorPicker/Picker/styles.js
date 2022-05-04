import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => ({
  pickers: {
    display: "flex",
  },
  saturation: {
    width: 180,
    height: 180,
    marginRight: 5,
    position: "relative",
    overflow: "visible",
  },
  saturationPointer: {
    width: "6px",
    height: "6px",
    boxShadow: `0 0 0 2px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
    borderRadius: "50%",
    transform: "translate(-3px, -3px)",
  },
  sliders: {
    padding: "4px 0",
    flex: "1",
  },
  hue: {
    width: 15,
    position: "relative",
    overflow: "visible",
  },
  hueSlider: {
    width: 12,
    height: 6,
    background: "#fff",
    boxShadow: "0 0 2px rgb(0 0 0 / 60%)",
    marginLeft: 1,
    borderRadius: "1px",
    transform: "translate(0, -2px)",
  },
  double: {
    flex: "2",
  },
}));

export default styles;
