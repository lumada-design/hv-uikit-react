import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";

const styles = {
  root: css({}),
  thumbnails: css({ marginBottom: theme.space.xs }),
  thumbnail: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
  }),
  slide: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  imageWrapper: css({
    position: "relative",
    width: "fit-content",
  }),
  image: css({
    maxWidth: "100%",
    maxHeight: 500,
  }),
  legendContainer: css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  }),
  legendCategory: css({
    display: "flex",
    alignItems: "center",
    gap: 5,
  }),
  legend: css({
    width: 14,
    height: 14,
  }),

  // Asset
  assets: css({}),
  asset: css({
    "&:hover > div:not(:first-child)": {
      backgroundColor: `rgba(255, 255, 255, 0.5)`,
      cursor: "pointer",
    },
    "&:hover > div:last-child": {
      outlineStyle: "solid",
      outlineWidth: 1,
    },
  }),
  assetRectangle: css({
    position: "absolute",
  }),
  assetIcon: css({
    position: "absolute",
    zIndex: 1,
  }),
  assetAnomaly: css({
    position: "absolute",
    borderRadius: theme.radii.round,
    padding: theme.space.xs,
    border: "none",
  }),
  assetMore: css({
    display: "inline-block",
    padding: "0px 8px",
  }),
};

export default styles;
