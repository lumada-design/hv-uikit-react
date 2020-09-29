const styles = (props) => {
  const { hoverColor, dragging } = props;
  let borderValue = "0px solid transparent";
  if (!dragging && hoverColor) {
    borderValue = `9px solid ${hoverColor}`;
  }

  return {
    knobRing: {
      position: "relative",
      borderColor: "transparent",
      borderRadius: "50%",
      boxShadow: "none",
      backgroundColor: "transparent",
      width: "32px",
      height: "32px",
      top: "-82%",
      left: "-82%",
      "&:hover": {
        border: borderValue,
      },
      "&:active": {
        border: borderValue,
      },
    },
  };
};

export default styles;
