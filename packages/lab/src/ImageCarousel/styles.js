const styles = (theme) => ({
  root: {
    "&:not(.xs)": {
      background: theme.hv.palette.atmosphere.atmo1,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "0px",
      paddingTop: "15px",
      paddingBottom: "15px",
    },
    "&:not(.nxs)": {
      width: "100%",
      maxWidth: "500px",
      height: "200px",
      padding: "0px",
    },
  },
  fullscreenStyle: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    padding: "10px 150px 10px 150px",
    top: 0,
    left: 0,
    zIndex: 1300,
  },
  closeButton: {
    position: "absolute",
    right: "25px",
  },
  selectedImage: {
    "&:not(.contain)": {
      objectFit: "cover",
    },
    "&:not(.cover)": {
      objectFit: "contain",
    },
    "&:not(.xs)": {
      width: "100%",
      textAlign: "center",
      "&:not(.fullscreen)": {
        [theme.breakpoints.up("xs")]: {
          height: "150px",
          minHeight: "150px",
        },
        [theme.breakpoints.up("sm")]: {
          height: "300px",
          minHeight: "300px",
        },
        [theme.breakpoints.up("lg")]: {
          height: "450px",
          minHeight: "450px",
        },
      },
      "&:not(.notFullscreen)": {
        height: "100%",
      },
    },
    "&:not(.nxs)": {
      width: "100%",
      textAlign: "center",
    },
  },
  xsMode: {
    width: "min-content",
    height: "min-content",
    margin: "0px",
    textAlign: "center",
  },
  circles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  xsCircles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transform: "translateY(-63px)",
  },
  hidden: {
    visibility: "hidden",
  },
  title: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between",
  },
  divCounter: {
    width: "100%",
    paddingTop: "10px",
    paddingRight: "15px",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    bottom: "102%",
    "&:not(.nxs)": {
      right: "5%",
      bottom: "262px",
      padding: "0px",
    },
  },
  counter: {
    width: "45px",
    backgroundColor: theme.hv.palette.base.base2,
  },
  img: {
    width: "100%",
    height: "70px",
    [theme.breakpoints.up("lg")]: {
      height: "75px",
    },
    textAlign: "center",
    objectFit: "cover",
  },
  thumbnailSelected: {
    width: "100%",
    height: "70px",
    [theme.breakpoints.up("lg")]: {
      height: "75px",
    },
    textAlign: "center",
    objectFit: "cover",
    borderStyle: "solid",
    borderColor: theme.hv.palette.base.base2,
    opacity: "50%",
  },
  thumbnailButton: {
    width: "110px",
    height: "70px",
    padding: "0px 0px",
    [theme.breakpoints.up("lg")]: {
      width: "120px",
      height: "75px",
    },
  },
  miniCircle: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: theme.hv.palette.atmosphere.atmo4,
    display: "inline-block",
    margin: "10px",
  },
  selectedCircle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: theme.hv.palette.atmosphere.atmo5,
    display: "inline-block",
    margin: "10px",
  },
  xsSelectedCircle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
    display: "inline-block",
    margin: "10px",
  },
  lowButtons: {
    width: "95%",
    display: "inline-flex",
    justifyContent: "space-between",
    position: "relative",
    top: "-50%",
    transform: "translateY(-16px)",
    "&:not(.nxs)": {
      width: "90%",
      top: "-99px",
    },
  },
  imageContainer: {
    width: "100%",
    marginTop: "20px",
    margin: "0px",
    textAlign: "center",
    padding: "0px",
    [theme.breakpoints.up("xs")]: {
      height: "150px",
      minHeight: "150px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "300px",
      minHeight: "300px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "450px",
      minHeight: "450px",
    },
    "&:not(.notFullscreen)": {
      height: "85%",
      alignItems: "center",
    },
  },
  button: {
    backgroundColor: theme.hv.palette.atmosphere.atmo3,
  },
  inputImage: {
    width: "110px",
    height: "70px",
    padding: "0px 0px",
    [theme.breakpoints.up("lg")]: {
      width: "120px",
      height: "75px",
    },
  },
  stack: {
    "&:not(.xs)": {
      width: "100%",
      display: "flex",
      alignSelf: "center",
      height: "100%",
      padding: "0px",
    },
    "&:not(.flag)": {
      overflowX: "hidden",
    },
    "&:not(.nxs)": {
      height: "200px",
      display: "flex",
      padding: "0px",
    },
  },
  normalButtons: {
    padding: "5px 0px",
  },
  panel: {
    display: "flex",
    width: "100%",
    overflow: "hidden",
    padding: "3px",
    height: "75px",
  },
});

export default styles;
