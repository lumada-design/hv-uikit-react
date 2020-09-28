import palette from "../palette";

const muiButton = {
  root: {
    color: palette.primary.main,
    cursor: "pointer",
    borderRadius: 0,
    height: 40,
    maxHeight: 44,
    minHeight: 30,
    minWidth: 70,
    margin: 10,
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "14px",
    "&:hover,&:focus": {},
    "&:active": {},
    "&$disabled": {},
  },
  sizeSmall: {
    fontSize: "14px",
    padding: "7px 12px",
  },
  containedPrimary: {
    "&$disabled": {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      opacity: "0.5",
    },
  },
};

export default muiButton;
