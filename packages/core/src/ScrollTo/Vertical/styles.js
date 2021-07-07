import { makeStyles } from "@material-ui/core";
import fade from "../../utils/hexToRgbA";

const styles = (theme) => ({
  root: {
    display: "flex",
    width: "32px",
    padding: "0",
    backgroundColor: fade(theme.palette.atmo2, 0.8),
    margin: 0,
    listStyleType: "none",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  positionAbsolute: {
    width: "32px",
    position: "absolute",
    zIndex: theme.zIndex.appBar - 2,
    right: "0",
    top: "50%",
  },
  positionFixed: {
    width: "32px",
    position: "fixed",
    zIndex: theme.zIndex.appBar - 2,
    right: "0",
    top: "50%",
  },
});

const calculateOffset = (quantityOfOptions) => {
  const iconSize = 32;
  const halfOptions = Math.round(quantityOfOptions * 0.5);
  return halfOptions * iconSize;
};

export const generateDynamicStyles = (quantityOfOptions) => {
  const positionOffset = calculateOffset(quantityOfOptions);
  const generatedStyles = makeStyles((theme) => ({
    positionAbsolute: {
      width: "32px",
      position: "absolute",
      zIndex: theme.zIndex.appBar - 2,
      right: "0",
      top: `calc(50% - ${positionOffset}px)`,
    },
    positionFixed: {
      width: "32px",
      position: "fixed",
      zIndex: theme.zIndex.appBar - 2,
      right: "0",
      top: `calc(50% - ${positionOffset}px)`,
    },
  }));
  return generatedStyles();
};

export default styles;
