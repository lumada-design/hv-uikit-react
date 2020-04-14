import IconArrowUp from "../../../../components/kpi/assets/arrow-green-up.svg";

const styles = {
  kpi: {
    position: "relative",
    top: "1px"
  },
  kpiInner: {
    position: "absolute",
    width: "32px",
    height: "32px",
    top: "4px",
    left: "-3px",
    background: `url(${IconArrowUp}) no-repeat`
  },
  kpiTypography: {
    position: "relative",
    paddingLeft: "16px"
  },
  title: {
    marginBottom: "20px"
  }
};

export default styles;
